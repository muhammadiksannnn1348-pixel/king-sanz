// Root layout: global metadata and app shell.

import type { Metadata } from 'next'
import './globals.css'
import ServiceWorkerCleanup from '../components/ServiceWorkerCleanup'
import AnimatedBackground from '../components/Background'

export const metadata: Metadata = {
  title: 'Sanz | Full-Stack Web Developer',
  description:
    'Website resmi M.IKSANUDDIN, Full-Stack Web Developer. Saya berfokus pada penciptaan pengalaman digital yang menarik dan selalu berupaya memberikan solusi terbaik dalam setiap proyek yang saya kerjakan.',
  keywords: ['M.IKSANUDDIN', 'Sanz', 'Full-Stack Web Developer', 'king-sanz', 'Portofolio Iksan', 'xy.sanz.kce'],
  authors: [{ name: 'M.IKSANUDDIN' }],
  metadataBase: new URL('https://king-sanz.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo SZ.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://king-sanz.vercel.app/',
    title: 'Sanz | Full-Stack Web Developer',
    description: 'Website resmi dan portofolio M.IKSANUDDIN, Full-Stack Web Developer.',
    images: ['/Meta.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanz | Full-Stack Web Developer',
    description: 'Website resmi dan portofolio M.IKSANUDDIN, Full-Stack Web Developer.',
    images: ['/Meta.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        />
        <meta name="theme-color" content="#030014" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <ServiceWorkerCleanup />
        <div className="site-background pointer-events-none fixed inset-0 z-0">
          <AnimatedBackground />
        </div>
        {children}
      </body>
    </html>
  )
}