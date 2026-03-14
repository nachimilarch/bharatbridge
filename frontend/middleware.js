import { NextResponse } from 'next/server';

const VENDOR_ROUTES = ['/dashboard'];
const ADMIN_ROUTES  = ['/admin'];
const AUTH_ROUTES   = ['/login', '/vendors/register'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Read token from cookie (set by login page)
  const token    = request.cookies.get('bb_token')?.value;
  const userRole = request.cookies.get('bb_role')?.value;

  const isVendorRoute = VENDOR_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminRoute  = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute   = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && token) {
    const dest = userRole === 'admin' ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // Protect dashboard routes
  if (isVendorRoute && !token) {
    return NextResponse.redirect(new URL('/login?redirect=/dashboard', request.url));
  }

  // Protect admin routes
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
  }

  // Role check for admin
  if (isAdminRoute && token && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/vendors/register'],
};
