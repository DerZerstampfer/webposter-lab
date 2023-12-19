'use client'

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from './ui/button'

export const DomainInput = ({
  handleGenerate,
  url,
  setUrl,
}: {
  handleGenerate: (url: string) => void
  url: string
  setUrl: (url: string) => void
}) => {
  const isValidUrl = useMemo(() => {
    try {
      if (!url.includes('.')) return false
      new URL(`https://${url}`)
      return true
    } catch (e) {
      return false
    }
  }, [url])

  return (
    <form
      className="flex rounded-xl border-2 border-input bg-background px-3 py-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (isValidUrl) {
          handleGenerate(url)
        }
      }}
    >
      <input
        className={cn(
          'flex h-12 w-full text-3xl bg-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:drop-shadow-[0_0_0.3rem_#ffffff70]a disabled:cursor-not-allowed disabled:opacity-50'
        )}
        placeholder="example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button size="icon" className="h-12 w-12" disabled={!isValidUrl}>
        <Sparkles />
      </Button>
    </form>
  )
}
