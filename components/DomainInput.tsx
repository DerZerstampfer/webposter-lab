'use client'

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const getHostname = async (url: string) => {
  if (!url) return undefined // return undefined for empty strings

  const urlWithProtocol =
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : 'https://' + url

  try {
    await fetch(urlWithProtocol, { mode: 'no-cors' })
    const hostname = new URL(urlWithProtocol).hostname
    return hostname
  } catch (e) {
    return undefined
  }
}

export const DomainInput = ({
  handleGenerate,
  url,
  setUrl,
}: {
  handleGenerate: (url: string) => void
  url: string
  setUrl: (url: string) => void
}) => {
  const [isValidUrl, setIsValidUrl] = useState(false)

  useEffect(() => {
    const checkUrl = async () => {
      const hostname = await getHostname(url)
      setIsValidUrl(hostname !== undefined)
    }

    checkUrl()
  }, [url])

  return (
    <form
      className="flex rounded-xl border-2 border-input bg-background px-3 py-2"
      onSubmit={async (e) => {
        e.preventDefault()
        const hostname = await getHostname(url)

        if (hostname) {
          handleGenerate(hostname)
        }
      }}
    >
      <input
        className={cn(
          'flex h-12 w-full text-3xl bg-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:drop-shadow-[0_0_0.3rem_#ffffff70]a disabled:cursor-not-allowed disabled:opacity-50'
        )}
        placeholder="yourwebsite.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button size="icon" className="h-12 w-12" disabled={!isValidUrl}>
        <Sparkles />
      </Button>
    </form>
  )
}
