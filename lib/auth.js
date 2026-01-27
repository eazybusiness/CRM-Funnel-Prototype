import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { query } from './db.js'
import { checkRateLimit, getClientIP } from './rateLimit.js'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const ip = getClientIP(req)
          const rateLimitResult = checkRateLimit(ip)
          
          if (!rateLimitResult.allowed) {
            console.log('Rate limit exceeded for IP:', ip)
            throw new Error(rateLimitResult.error)
          }
          
          console.log('Auth attempt for:', credentials?.email)
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Auth: Missing credentials')
            throw new Error('Missing email or password')
          }

          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(credentials.email)) {
            throw new Error('Invalid email format')
          }

          const result = await query('SELECT * FROM users WHERE email = $1', [credentials.email])
          const user = result.rows[0]

          if (!user || !user.password_hash) {
            console.log('Auth: User not found or no password')
            throw new Error('Invalid email or password')
          }

          // Check if account is locked
          if (user.locked_until && new Date(user.locked_until) > new Date()) {
            const unlockIn = Math.ceil((new Date(user.locked_until) - new Date()) / 60000)
            throw new Error(`Account gesperrt. Bitte versuchen Sie es in ${unlockIn} Minuten erneut.`)
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          )

          if (!isPasswordValid) {
            // Increment failed attempts
            await query(
              'UPDATE users SET failed_attempts = failed_attempts + 1 WHERE id = $1',
              [user.id]
            )
            
            // Lock account after 5 failed attempts
            if (user.failed_attempts >= 4) { // 4 previous + 1 current = 5
              const lockedUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
              await query(
                'UPDATE users SET locked_until = $1, failed_attempts = 0 WHERE id = $2',
                [lockedUntil, user.id]
              )
              throw new Error('Zu viele fehlgeschlagene Versuche. Account für 15 Minuten gesperrt.')
            }
            
            console.log('Auth: Invalid password')
            throw new Error('Invalid email or password')
          }

          // Reset failed attempts on successful login
          if (user.failed_attempts > 0) {
            await query(
              'UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE id = $1',
              [user.id]
            )
          }

          console.log('Auth: Success for user:', user.email)
          
          return {
            id: user.id.toString(),
            email: user.email,
            name: `${user.first_name} ${user.last_name}`.trim(),
            firstName: user.first_name,
            lastName: user.last_name
          }
        } catch (error) {
          console.error('Auth error:', error)
          // Don't throw the error here, return null to show generic error
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  }
}
