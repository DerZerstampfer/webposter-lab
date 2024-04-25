'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
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
import { AnimatePresence } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const Generator = ({
  cachedImageUrl,
  paramUrl,
}: {
  cachedImageUrl?: string
  paramUrl?: string
}) => {
  const [imageUrl, setImageUrl] = useState(cachedImageUrl)
  const [startedGenerationAt, setStartedGenerationAt] = useState<
    Date | undefined
  >()

  const [url, setUrl] = useState(paramUrl ?? '')

  const [posterIsHovered, setPosterIsHovered] = useState(false)

  const router = useRouter()

  const handleGenerate = async (url: string, regenerationKey?: string) => {
    setImageUrl(undefined)
    setStartedGenerationAt(new Date())
    const res = await fetch('/api/generatePoster', {
      method: 'POST',
      body: JSON.stringify({ url, regenerationKey }),
    })

    if (!res.ok) {
      const resJson = await res.json()

      if (resJson.error) {
        toast.error(resJson.error)
      } else {
        toast.error('An error occurred while generating the poster.')
      }

      setStartedGenerationAt(undefined)
      return
    }

    setStartedGenerationAt(undefined)

    try {
      const resJson = await res.json()
      const imageUrl = resJson.url

      setImageUrl(imageUrl)

      if (resJson.regenerationKey) {
        toast.success(
          "Successfully generated the poster. If you don't like it, feel free to regenerate it.",
          {
            duration: 6000000, // 100 minutes
            action: {
              label: 'Regenerate',
              onClick: () => {
                handleGenerate(url, resJson.regenerationKey)
              },
            },
          }
        )

        window.history.pushState({}, '', `/${url}`)
      } else {
        window.history.pushState({}, '', `/${url}`)
      }
    } catch (error) {
      toast.error(
        "We couldn't generate a poster for this website. This is likely due to the website needing javascript to render. Please try another one."
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
      <div className="flex w-[85svw] max-w-[424px] flex-col items-center justify-center gap-1 pb-6 pt-14">
        <div
          className="relative aspect-[1024/1792] w-full overflow-hidden"
          onMouseEnter={() => setPosterIsHovered(true)}
          onMouseLeave={() => setPosterIsHovered(false)}
        >
          <AnimatePresence>
            {posterIsHovered && (
              <div className="absolute bottom-2 right-2 z-10">
                <div className="relative flex gap-2">
                  <motion.div
                    className="absolute w-full h-full bg-black blur-xl scale-150"
                    initial={{ opacity: '0%' }}
                    animate={{ opacity: '100%' }}
                    exit={{ opacity: '0%' }}
                  />
                  <ShareButton url={url} />
                  <DownloadButton imageUrl={imageUrl} name={url} />
                </div>
              </div>
            )}
          </AnimatePresence>
          <Image
            className="rounded-md shadow-2xl"
            fill
            src={imageUrl}
            alt="Generated Web Poster"
            unoptimized
          />
        </div>
        <div className="text-3xl">{url}</div>
        <button
          onClick={() => {
            setImageUrl(undefined)
            setStartedGenerationAt(undefined)
            setUrl('')
            router.push('/')
          }}
          className="flex flex-row items-center justify-center gap-1 rounded-lg bg-gray-100/10 p-1 px-2 text-sm ring-1 ring-inset ring-gray-100/5 duration-100 hover:bg-gray-200/10 active:translate-y-1 mt-6"
        >
          <RotateCcw className="h-3 w-3" />
          Generate more
        </button>
      </div>
    )
  } else {
    return (
      <DomainInput handleGenerate={handleGenerate} url={url} setUrl={setUrl} />
    )
  }
}
