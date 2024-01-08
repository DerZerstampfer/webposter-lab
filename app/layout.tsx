import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Webposter Lab',
  description: 'Unique AI generated posters for any website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta property="og:image" content="/ogImage.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webposterlab.com/" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster
          toastOptions={{
            duration: 10_000,
          }}
        />
      </body>
    </html>
  )
}
