'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useOnClickOutside } from 'usehooks-ts'

import { DomainInput } from '@/components/DomainInput'
import { DownloadButton } from '@/components/DownloadButton'
import { Timer } from '@/components/Timer'
import { useStringQueryParam } from '@/lib/useStringQueryParams'

export const Generator = () => {
  const imageRef = useRef(null)
  const [imageUrl, setImageUrl] = useState()
  const [startedGenerationAt, setStartedGenerationAt] = useState<
    Date | undefined
  >()

  const isGenerating = useMemo(() => {
    return startedGenerationAt
  }, [startedGenerationAt])

  const [url, setUrl] = useState('')

  const { setValue: setUrlParam } = useStringQueryParam('url')

  const searchparams = useSearchParams()

  useEffect(() => {
    if (searchparams.get('url') !== url) {
      setUrl(searchparams.get('url') ?? '')
      setImageUrl(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchparams])

  const handleGenerate = async (url: string) => {
    setUrlParam(url)
    setStartedGenerationAt(new Date())
    const res = await fetch('/api/generatePoster', {
      method: 'POST',
      body: JSON.stringify({ url }),
    })
    setStartedGenerationAt(undefined)

    try {
      const resJson = await res.json()
      const imageUrl = resJson.url

      setImageUrl(imageUrl)
    } catch (error) {
      toast.error(
        'We couldnt generate a poster for this website. Please try another one.',
      )
    }
  }

  useOnClickOutside(imageRef, () => {
    setImageUrl(undefined)
    setStartedGenerationAt(undefined)
    setUrlParam('')
    setUrl('')
  })

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-4xl font-bold tracking-tight">
          Generating...
          <span className="pl-5 text-muted-foreground">
            <Timer date={new Date(startedGenerationAt || 0)} />
          </span>
        </div>
        <div className="max-w-md text-center text-muted-foreground">
          This may take a while (about 2 minutes), please be patient. We
          research your website and generate a custom poster for you.
        </div>
      </div>
    )
  } else if (imageUrl) {
    return (
      <div
        className="flex w-[85svw] max-w-[424px] flex-col items-start justify-center gap-1"
        ref={imageRef}
      >
        <div className="flex w-full items-end justify-between gap-2">
          <div className="truncate text-2xl tracking-tight" title={url}>
            {url}
          </div>

          <a
            href="teampilot.ai"
            target="_blank"
            className="whitespace-nowrap text-sm text-muted-foreground"
          >
            Powered by teampilot.ai
          </a>
        </div>
        <div className="w-full rounded-xl bg-gray-100/5 p-2 ring-1 ring-inset ring-gray-100/5 lg:rounded-2xl lg:p-3">
          <div className="relative aspect-[1024/1792] w-full">
            <div className="absolute bottom-2 right-2 z-10">
              <DownloadButton imageUrl={imageUrl} name={url} />
            </div>
            <Image
              fill
              className="rounded-md shadow-2xl ring-1 ring-gray-100/10"
              src={imageUrl}
              alt="Generated Web Poster"
              unoptimized
            />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <DomainInput handleGenerate={handleGenerate} url={url} setUrl={setUrl} />
    )
  }
}
