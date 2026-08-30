import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'AI News Brief — Current Signals, Clear Context',
  description: 'A concise daily briefing on major AI products, policy, research, and education—with links to every original source.',
  openGraph: {
    title: 'AI News Brief',
    description: 'Current signals. Clear context.',
    type: 'website',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'AI News Brief — Current signals. Clear context.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI News Brief',
    description: 'Current signals. Clear context.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
