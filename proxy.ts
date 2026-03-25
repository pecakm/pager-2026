export { auth as proxy } from '@/auth';

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/sign-in/:path*',
    '/sign-up/:path*',
    // ^ Must be literals (Next.js limitation). Keep in sync with Path in @/enums.
  ],
};
