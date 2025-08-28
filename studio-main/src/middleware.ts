import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/login' || pathname === '/register';

  // If user is not authenticated and is trying to access a protected page (not an auth page), redirect to login
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and is trying to access login or register, redirect to home
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for static files, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
