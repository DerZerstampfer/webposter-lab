import '@/app/globals.css'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
        <meta property="og:image" content="/newOgImage.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webposterlab.com/" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster
          toastOptions={{
            duration: 10_000,
          }}
        />
      </body>
    </html>
  )
}
