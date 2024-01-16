'use client'

import { Analytics } from '@vercel/analytics/react'
import dynamic from 'next/dynamic'

type Props = {
  children?: React.ReactNode
}

const Toaster = dynamic(
  () => import('@/components/ui/sonner').then((m) => m.Toaster),
  {
    ssr: false,
  },
)

export const Providers = ({ children }: Props) => {
  return (
    <>
      {children}
      <Toaster
        toastOptions={{
          duration: 10_000,
        }}
      />
      <Analytics />
    </>
  )
}
