import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedPaths = ['/member', '/admin']

export async function middleware(req) {
  const { pathname } = req.nextUrl

  if (!protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/member/:path*', '/admin/:path*'],
}
