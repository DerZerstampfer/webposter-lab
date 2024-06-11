'use client'

import { Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { MovingBorder } from '@/components/ui/moving-border'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { extractHostname, validateUrl } from '@/lib/urlHelper'

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
      const isValid = await validateUrl(url, abortController.current.signal)
      if (!abortController.current.signal.aborted) {
        setIsValidUrl(isValid)
      }
    }

    checkUrl()

    return () => {
      abortController.current.abort()
      abortController.current = new AbortController()
    }
  }, [url])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Input */}
      <div className="relative overflow-hidden p-[1px] rounded-full">
        <div
          className="absolute inset-0"
          style={{ borderRadius: `calc(1.75rem * 0.96)` }}
        >
          <MovingBorder rx="30%" ry="30%" duration={5000}>
            <div
              className={cn(
                'size-20 opacity-[0.8] bg-[radial-gradient(var(--white)_40%,transparent_60%)] blur-sm'
              )}
            />
          </MovingBorder>
        </div>
        <form
          className="flex gap-2 rounded-full border-2 border-slate-700 bg-background px-2 py-2 items-center relative max-w-fit"
          onSubmit={async (e) => {
            e.preventDefault()
            const isValide = await validateUrl(url)
            if (!isValide) {
              return
            }

            const hostname = await extractHostname(url)

            handleGenerate(hostname)
          }}
        >
          <input
            className={cn(
              'focus-visible:drop-shadow-[0_0_0.3rem_#ffffff70]a flex h-9 w-full md:w-96 flex-1 ml-2 bg-background text-2xl placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            )}
            placeholder="Enter domain"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div
            className={cn(
              'duration-200 overflow-hidden w-[48px] sm:w-[130px] m-0.5 hover:scale-105 active:scale-95 group relative rounded-full hover:overflow-visible',
              !isValidUrl && 'w-0 sm:w-0'
            )}
          >
            <div className="absolute size-full from-red-700 to-orange-700 bg-gradient-to-r animate-spin blur-xl hidden group-hover:block" />
            <Button
              className="rounded-full gap-1.5 h-10 w-[48px] sm:w-[130px] text-base relative"
              disabled={!isValidUrl}
            >
              <div className="absolute size-full animate-slow-shimmer bg-[linear-gradient(110deg,#FFFFFF,45%,#DDDDDD,55%,#FFFFFF)] bg-[length:200%_100%] rounded-full" />
              <div className="flex items-center justify-center gap-1.5 relative">
                <Sparkles className="size-4" fill="currentColor" />{' '}
                <span className="max-sm:hidden">Generate</span>
              </div>
            </Button>
          </div>
        </form>
      </div>
      <Link
        href="https://teampilot.ai/dev"
        className="flex items-end gap-1 text-sm text-gray-500 hover:underline"
        target={'_blank'}
      >
        <Image
          src={'https://teampilot.ai/favicon-white.svg'}
          className="h-5 w-5"
          alt="logo"
          width={32}
          height={32}
        />
        Powered by Teampilot AI
      </Link>
    </div>
  )
}
