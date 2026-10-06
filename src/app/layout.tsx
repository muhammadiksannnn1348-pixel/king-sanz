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
  metadataBase: new URL('https://www.ryujin-sanz.my.id'),

  title: {
    default: 'Ryujin Sanz | Full-Stack Web Developer',
    template: '%s | Sanz',
  },

  description:
    'Website resmi M. IKSANUDDIN, Full-Stack Web Developer yang berfokus pada pembangunan produk digital modern dengan performa tinggi, desain yang intuitif, dan pengalaman pengguna yang optimal. Mengubah ide menjadi solusi web yang inovatif, fungsional, dan berdampak.',

  keywords: [
    'M.IKSANUDDIN',
    'Sanz',
    'Full-Stack Web Developer',
    'Ryujin-sanz',
    'Portofolio Iksan',
    'xy.sanz.kce',
    'ikhsanuddin',
    'web udin',
    'iksan',
    'Ryujin portofolio',
    'Ryujin web',
  ],

  authors: [{ name: 'M.IKSANUDDIN' }],

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/logo%20SZ.jpg',
  },

  openGraph: {
    title: 'Ryujin Sanz | Full-Stack Web Developer',
    description:
      'Portofolio M. Iksanuddin, Full-Stack Web Developer yang membangun aplikasi web modern dengan performa cepat, desain intuitif, dan pengalaman pengguna yang nyaman. Lihat proyek-proyek terbaik saya dan mari berkolaborasi.',
    url: '/',
    siteName: 'Ryujin Sanz',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'M. Iksanuddin - Full-Stack Web Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ryujin Sanz | Full-Stack Web Developer',
    description:
      'Portofolio M. Iksanuddin, Full-Stack Web Developer yang berfokus pada produk digital modern dengan performa tinggi dan desain yang intuitif.',
    images: ['/opengraph-image'],
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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