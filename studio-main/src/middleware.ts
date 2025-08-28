import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// Middleware désactivé : ne fait rien, laisse passer toutes les requêtes
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Match all routes except for static files, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
