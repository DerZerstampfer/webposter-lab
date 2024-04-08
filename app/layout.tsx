import type { Metadata } from 'next'
import { Sora } from 'next/font/google'

import '@/app/globals.css'
import { Providers } from '@/app/providers'
import { TailwindBreakpointIndicator } from '@/components/tailwind-breakpoint-indicator'
import Script from 'next/script'

const outfit = Sora({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://webposterlab.com'),
  title: 'Webposter Lab',
  description: 'Open Source AI web poster generator for any website',
  openGraph: {
    title: 'Webposter Lab',
    description: 'Open Source AI web poster generator for any website',
    url: 'https://webposterlab.com',
    siteName: 'webposterlab.com',
    images: [
      {
        url: 'https://webposterlab.com/newOgImage.webp',
        width: 1792,
        height: 1024,
      },
    ],
  },
  twitter: {
    title: 'Webposter Lab',
    card: 'summary_large_image',
    images: ['https://webposterlab.com/newOgImage.webp'],
    creator: '@paukraft',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          defer
          data-website-id={process.env.UMAMI_WEBSITE_ID}
          src={process.env.UMAMI_URL}
        />
      </head>
      <body className={outfit.className}>
        <Providers>{children}</Providers>
        <TailwindBreakpointIndicator />
      </body>
    </html>
  )
}
