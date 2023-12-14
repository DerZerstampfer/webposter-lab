'use client'

import { cn } from '@/lib/utils'
import NiceModal from '@ebay/nice-modal-react'
import { useMemo, useState } from 'react'
import { ImageDialog } from './dialogs/ImageDialog'

export const DomainInput = () => {
  const [value, setValue] = useState('')

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

    const res = await fetch('/api/generatePoster', {
      method: 'POST',
      body: JSON.stringify({ url: `https://${value}` }),
    })

    const resJson = await res.json()
    const imageUrl = resJson.url

    NiceModal.show(ImageDialog, {
      imageUrl,
      url: value,
    })
  }

  return (
    <form className="flex h-16" onSubmit={handleSubmit}>
      <div className="bg-input px-3 py-2 border rounded-l-md flex items-center">
        <span className="text-muted-foreground font-extralight text-3xl select-none">
          https://
        </span>
      </div>
      <input
        className={cn(
          'flex h-16 w-full rounded-r-md border-2 border-input bg-background px-3 py-2 text-4xl file:border-0 file:bg-transparent file:text-4xl file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:drop-shadow-[0_0_0.3rem_#ffffff70]a disabled:cursor-not-allowed disabled:opacity-50'
        )}
        placeholder="example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isValidUrl && <button type="submit">Generate</button>}
    </form>
  )
}
