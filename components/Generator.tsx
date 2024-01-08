'use client'

import { useStringQueryParam } from '@/lib/useStringQueryParams'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useOnClickOutside } from 'usehooks-ts'
import { DomainInput } from './DomainInput'
import { DownloadButton } from './DownloadButton'
import { Timer } from './Timer'

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

    const resJson = await res.json()
    const imageUrl = resJson.url

    setImageUrl(imageUrl)

    if (!imageUrl) {
      toast.error(
        'We couldnt generate a poster for this website. Please try another one.'
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
        className="flex flex-col items-start justify-center gap-1 w-[85svw] max-w-[424px]"
        ref={imageRef}
      >
        <div className="flex justify-between w-full items-end gap-2">
          <div className="tracking-tight truncate text-2xl" title={url}>
            {url}
          </div>

          <a
            href="teampilot.ai"
            target="_blank"
            className="text-muted-foreground text-sm whitespace-nowrap"
          >
            Powered by teampilot.ai
          </a>
        </div>
        <div className="rounded-xl bg-gray-100/5 p-2 ring-1 ring-inset ring-gray-100/5 lg:rounded-2xl lg:p-3 w-full">
          <div className="relative w-full aspect-[1024/1792]">
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
