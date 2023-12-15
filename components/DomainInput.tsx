'use client'

import { cn } from '@/lib/utils'
import NiceModal from '@ebay/nice-modal-react'
import { Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ImageDialog } from './dialogs/ImageDialog'
import { Button } from './ui/button'

export const DomainInput = () => {
  const [value, setValue] = useState('')
  const [fetching, setFetching] = useState(false)

  const isValidUrl = useMemo(() => {
    try {
      if (!value.includes('.')) return false
      new URL(`https://${value}`)
      return true
    } catch (e) {
      return false
    }
  }, [value])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidUrl) return

    setFetching(true)
    const res = await fetch('/api/generatePoster', {
      method: 'POST',
      body: JSON.stringify({ url: value }),
    })
    setFetching(false)

    const resJson = await res.json()
    const imageUrl = resJson.url

    NiceModal.show(ImageDialog, {
      imageUrl,
      url: value,
    })
  }

  return (
    <form
      className="flex rounded-md border-2 border-input bg-background px-3 py-2"
      onSubmit={handleSubmit}
    >
      <input
        className={cn(
          'flex h-12 w-full text-3xl bg-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:drop-shadow-[0_0_0.3rem_#ffffff70]a disabled:cursor-not-allowed disabled:opacity-50'
        )}
        placeholder="example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button size="icon" className="h-12 w-12" disabled={!isValidUrl}>
        <Sparkles />
      </Button>
    </form>
  )
}
