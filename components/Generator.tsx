'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { DomainInput } from '@/components/DomainInput'
import { DownloadButton } from '@/components/DownloadButton'
import { ShareButton } from '@/components/ShareButton'
import { Timer } from '@/components/Timer'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const Generator = ({
  cachedImageUrl,
  paramUrl,
}: {
  cachedImageUrl?: string
  paramUrl?: string
}) => {
  const imageRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(cachedImageUrl)
  const [startedGenerationAt, setStartedGenerationAt] = useState<
    Date | undefined
  >()

  const [url, setUrl] = useState(paramUrl ?? '')

  const router = useRouter()

  const handleGenerate = async (url: string) => {
    setStartedGenerationAt(new Date())
    const res = await fetch('/api/generatePoster', {
      method: 'POST',
      body: JSON.stringify({ url }),
    })
    setStartedGenerationAt(undefined)
    router.push(`/${url}`)

    try {
      const resJson = await res.json()
      const imageUrl = resJson.url

      setImageUrl(imageUrl)
    } catch (error) {
      toast.error(
        'We couldnt generate a poster for this website. Please try another one. This is likely due to the website needing javascript to render.'
      )
    }
  }

  if (startedGenerationAt) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-4xl font-bold tracking-tight">
          Generating...
          <span className="pl-5 text-muted-foreground">
            <Timer date={startedGenerationAt} />
          </span>
        </div>
        <div className="max-w-md text-center text-muted-foreground">
          This may take a while (
          <HoverCard>
            <HoverCardTrigger>
              <strong className="underline">about 2 minutes</strong>
            </HoverCardTrigger>
            <HoverCardContent className="w-96">
              <div className="flex flex-col gap-1 text-left">
                <h4 className="text-lg font-semibold">
                  Why does it take a bit?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Here&apos;s the process: We start by visiting your website,
                  studying not just the main page but sometimes also the linked
                  pages. We focus exclusively on the text, ignoring images or
                  videos. This information is run through a LLM which can take a
                  little time. Afterwards, we use DALL·E 3 to create the poster,
                  which also needs its time. All these steps add up to about a
                  2-minute wait.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
          ), please be patient. We research your website and generate a custom
          poster for you.
        </div>
      </div>
    )
  } else if (imageUrl) {
    return (
      <div
        className="flex w-[85svw] max-w-[424px] flex-col items-start justify-center gap-1 py-10"
        ref={imageRef}
      >
        <div className="flex w-full items-end justify-between gap-2">
          <div className="truncate text-2xl tracking-tight" title={url}>
            {url}
          </div>

          <a
            href="https://teampilot.ai/"
            target="_blank"
            className="whitespace-nowrap text-sm text-muted-foreground"
          >
            Powered by teampilot.ai
          </a>
        </div>
        <div className="mb-3 w-full rounded-xl bg-gray-100/5 p-2 ring-1 ring-inset ring-gray-100/5 lg:rounded-2xl lg:p-3">
          <div className="relative aspect-[1024/1792] w-full">
            <div className="absolute bottom-2 right-2 z-10 space-x-2">
              <ShareButton url={url} />
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
        <div className="flex w-full justify-center">
          <button
            onClick={() => {
              setImageUrl(undefined)
              setStartedGenerationAt(undefined)
              setUrl('')
              router.push('/')
            }}
            className="flex flex-row items-center justify-center gap-1 rounded-lg bg-gray-100/10 p-1 px-2 text-sm ring-1 ring-inset ring-gray-100/5 duration-100 hover:bg-gray-200/10 active:translate-y-1"
          >
            <RotateCcw className="h-3 w-3" />
            Generate more
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <DomainInput handleGenerate={handleGenerate} url={url} setUrl={setUrl} />
    )
  }
}
