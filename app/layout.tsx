import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Webposter Lab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="description"
          content="Unique AI generated posters tailored to any website with Webposter Lab"
        />
        <meta
          property="og:title"
          content="Webposter Lab - Unique AI generated posters for any website"
        />
        <meta
          property="og:description"
          content="Unique AI generated posters tailored to any website with Webposter Lab"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webposterlab.com" />
        <meta property="og:image" content="/newOgImage.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@paukraft" />
        <meta
          name="twitter:title"
          content="Webposter Lab - Unique AI generated posters for any website"
        />
        <meta
          name="twitter:description"
          content="Unique AI generated posters tailored to any website with Webposter Lab"
        />
        <meta name="twitter:image" content="/newOgImage.png" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
