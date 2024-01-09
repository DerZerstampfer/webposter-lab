import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Webposter Lab',
  description: 'Unique AI generated posters for any website',
  openGraph: {
    url: 'https://webposterlab.com',
    title: 'Webposter Lab',
    description: 'Unique AI generated posters for any website',
    images: ['https://webposterlab.com/newOgImage.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
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
