import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { NextIntlClientProvider } from 'next-intl';

import { auth } from '@/auth';
import { ReactQueryProvider } from '@/lib/react-query';
import { StyledComponentsRegistry } from '@/lib/styled-components';
import { theme } from '@/lib/mui';
import { Navbar } from '@/components';

import './global.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pager',
  description: 'Push Notifications app created by Mikołaj Pęcak',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={geist.className}>
        <NextIntlClientProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <StyledComponentsRegistry>
                <ReactQueryProvider>
                  <Navbar session={session} />
                  {children}
                </ReactQueryProvider>
              </StyledComponentsRegistry>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
