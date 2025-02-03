import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Add routes that should be accessible without authentication
const publicRoutes = ['/', '/api/auth', '/auth/error'];

export async function middleware(request: NextRequest) {
  return NextResponse.next();
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  // Allow public routes and API routes (they have their own auth)
  if (isPublicRoute || request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Redirect to signin if not authenticated
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Add role-based protection here if needed
  /*   if (request.nextUrl.pathname.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/mentor') && 
      !['ADMIN', 'MENTOR'].includes(token.role as string)) {
    return NextResponse.redirect(new URL('/', request.url));
  } */

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
