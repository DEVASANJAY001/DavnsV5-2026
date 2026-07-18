import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
    ],
    sitemap: 'https://davns.com/sitemap.xml',
    host: 'https://davns.com',
  }
}
