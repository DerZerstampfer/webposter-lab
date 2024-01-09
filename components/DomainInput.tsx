'use client'

import { Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const getHostname = async (url: string, signal?: AbortSignal) => {
  if (!url) return undefined

  const urlWithProtocol =
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : 'https://' + url

  try {
    await fetch(urlWithProtocol, {
      mode: 'no-cors',
      signal,
      redirect: 'follow',
    })
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
  const abortController = useRef(new AbortController())

  useEffect(() => {
    const checkUrl = async () => {
      const hostname = await getHostname(url, abortController.current.signal)
      if (!abortController.current.signal.aborted) {
        setIsValidUrl(hostname !== undefined)
      }
    }

    checkUrl()

    return () => {
      abortController.current.abort()
      abortController.current = new AbortController()
    }
  }, [url])

  return (
    <form
      className="flex gap-2 rounded-xl border-2 border-input bg-background px-3 py-2"
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
          'focus-visible:drop-shadow-[0_0_0.3rem_#ffffff70]a flex h-12 w-full bg-background text-3xl placeholder:text-muted-foreground/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
