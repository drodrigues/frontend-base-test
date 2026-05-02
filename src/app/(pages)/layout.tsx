import type { Metadata, Viewport } from 'next';
import Loading from '@/components/loading';
import '@/stylesheets/App.scss';

import { Inter, Poppins } from 'next/font/google';
import { Suspense } from 'react';

const poppinsSans = Poppins({
  variable: '--font-poppins',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  adjustFontFallback: true,
});

const interSans = Inter({
  variable: '--font-inter',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Teste - Desenvolvedor Front-end',
  description: '',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  minimumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppinsSans.variable} ${interSans.variable}`}>
        <Suspense fallback={<Loading visible overlay />}>{children}</Suspense>
      </body>
    </html>
  );
}
