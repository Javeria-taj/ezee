import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /observatory routes
  if (pathname === '/observatory' || pathname.startsWith('/observatory/')) {
    const hasAdminSession = request.cookies.has('ezee_admin_session');
    
    // Redirect to login if no session and not already on the login page
    if (!hasAdminSession && pathname !== '/observatory/login') {
      return NextResponse.redirect(new URL('/observatory/login', request.url));
    }
  }

  // Protect /workshop routes
  if (pathname === '/workshop' || pathname.startsWith('/workshop/')) {
    const hasVendorSession = request.cookies.has('ezee_vendor_session');

    // Redirect to login if no session and not already on the login page
    if (!hasVendorSession && pathname !== '/workshop/login') {
      return NextResponse.redirect(new URL('/workshop/login', request.url));
    }
  }

  // Protect /student routes
  if (pathname === '/student' || pathname.startsWith('/student/')) {
    const hasStudentSession = request.cookies.has('ezee_student_session');

    // Redirect to login if no session and not already on student auth page
    if (!hasStudentSession && pathname !== '/student/auth' && pathname !== '/auth') {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  // Redirect to /student if already logged in and visiting auth page
  if (pathname === '/auth' || pathname === '/student/auth') {
    const hasStudentSession = request.cookies.has('ezee_student_session');
    if (hasStudentSession) {
      return NextResponse.redirect(new URL('/student', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/observatory/:path*', '/workshop/:path*', '/student/:path*', '/auth', '/student/auth'],
};
