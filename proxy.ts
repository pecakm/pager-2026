import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { Path } from '@/enums';

const publicRoutes: string[] = [Path.Home, Path.SignIn, Path.SignUp];

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (!session?.user) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL(Path.SignIn, request.url));
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(Path.Dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/sign-in/:path*',
    '/sign-up/:path*',
    // ^ Must be literals (Next.js limitation). Keep in sync with Path in @/enums.
  ],
};
