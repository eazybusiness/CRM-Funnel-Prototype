import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { query } from './db.js'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log('Auth attempt for:', credentials?.email)
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Auth: Missing credentials')
            throw new Error('Missing email or password')
          }

          const result = await query('SELECT * FROM users WHERE email = $1', [credentials.email])
          const user = result.rows[0]

          if (!user || !user.password_hash) {
            console.log('Auth: User not found or no password')
            throw new Error('Invalid email or password')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          )

          if (!isPasswordValid) {
            console.log('Auth: Invalid password')
            throw new Error('Invalid email or password')
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
    strategy: 'jwt'
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
  secret: process.env.NEXTAUTH_SECRET
}
