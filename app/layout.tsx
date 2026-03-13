import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './global.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pager',
  description: 'Push Notifications app created by Mikołaj Pęcak',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}
