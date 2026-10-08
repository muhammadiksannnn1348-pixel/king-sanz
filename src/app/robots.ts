import type { MetadataRoute } from 'next'

// memberi tahu mesin pencari untuk mengindeks halaman web dan mengikuti tautan di dalamnya,
// kecuali untuk halaman admin yang dilarang.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/'],
    },
    sitemap: 'https://www.ryujin-sanz.my.id/sitemap.xml',
  }
}