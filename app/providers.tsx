'use client'

import { Analytics } from '@vercel/analytics/react'
import dynamic from 'next/dynamic'
import { OpenpanelProvider } from '@openpanel/nextjs'

type Props = {
  children?: React.ReactNode
}

const Toaster = dynamic(
  () => import('@/components/ui/sonner').then((m) => m.Toaster),
  {
    ssr: false,
  }
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
      {process.env.OPENPANEL_CLIENT_ID && (
        <OpenpanelProvider
          url="/api/op"
          clientId={process.env.OPENPANEL_CLIENT_ID}
          trackScreenViews={true}
          trackAttributes={true}
          trackOutgoingLinks={true}
        />
      )}
      <Analytics />
    </>
  )
}
