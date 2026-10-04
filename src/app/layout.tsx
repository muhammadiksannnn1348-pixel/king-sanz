import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import ServiceWorkerCleanup from '../components/ServiceWorkerCleanup'
import AnimatedBackground from '../components/Background'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Sanz | Full-Stack Web Developer',
    template: '%s | Sanz',
  },

  description:
    'Website resmi M. IKSANUDDIN, Full-Stack Web Developer yang berfokus pada pembangunan produk digital modern dengan performa tinggi, desain yang intuitif, dan pengalaman pengguna yang optimal. Mengubah ide menjadi solusi web yang inovatif, fungsional, dan berdampak.',

  keywords: [
    'M.IKSANUDDIN',
    'Sanz',
    'Full-Stack Web Developer',
    'king-sanz',
    'Portofolio Iksan',
    'xy.sanz.kce',
    'ikhsanuddin',
  ],

  authors: [
    {
      name: 'M.IKSANUDDIN',
    },
  ],

  metadataBase: new URL('https://king-sanz.vercel.app'),

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/logo%20SZ.jpg',
  },

  openGraph: {
    type: 'website',
    url: 'https://king-sanz.vercel.app/',
    title: 'Sanz | Full-Stack Web Developer',
    description:
      'Website resmi dan portofolio M.IKSANUDDIN, Full-Stack Web Developer.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#030014" />

        <meta
          name="mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>

      <body className={poppins.className}>
        <ServiceWorkerCleanup />

        <div className="site-background pointer-events-none fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        {children}
      </body>
    </html>
  )
}