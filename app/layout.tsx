import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

// Define Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FF385C',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: 'Airbnb: Vacation Homes & Experiences - Find Your Next Stay',
  description: 'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.',
  keywords: 'airbnb, vacation rentals, homes, experiences, travel, lodging, accommodations',
  openGraph: {
    title: 'Airbnb: Vacation Homes & Experiences - Find Your Next Stay',
    description: 'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.',
    images: [
      {
        url: '/images/5037ecff-e315-4464-9c85-64503ae5b6ea.webp',
        width: 1200,
        height: 630,
        alt: 'Airbnb',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb: Vacation Homes & Experiences',
    description: 'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world.',
    images: ['/images/5037ecff-e315-4464-9c85-64503ae5b6ea.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}