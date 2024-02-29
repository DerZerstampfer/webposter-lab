import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Explore } from '@/components/Explore'
import { Generator } from '@/components/Generator'
import { prisma } from '@/lib/db'
import BGImage from '@/public/bg.webp'
import { Metadata, ResolvingMetadata } from 'next'
import { unstable_cache } from 'next/cache'

type Props = {
  params: {
    url?: string[]
  }
}

const getUrl = (props: Props) => {
  const paramUrl =
    props.params?.url && (props.params?.url[0] as string | undefined)

  return paramUrl !== 'index' ? paramUrl : undefined
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  if (!process.env.DATABASE_URL) return {}

  const url = getUrl(props)

  if (!url) {
    return {}
  }

  const webposter = await prisma.webposter.findUnique({
    where: { url },
    select: {
      imageUrl: true,
    },
  })

  if (!webposter) {
    return {}
  }

  const description = `Webposter for ${url} - By Webposter Lab`

  return {
    description: description,
    openGraph: {
      images: [{ url: webposter.imageUrl, width: 1024, height: 1792 }],
      url: `https://webposterlab.com/${url}`,
      description: description,
    },
    twitter: {
      title: 'Webposter Lab',
      description: description,
      card: 'summary_large_image',
      images: [webposter.imageUrl],
      creator: '@paukraft',
    },
  }
}

const getMovieposter = unstable_cache(
  async (url?: string) => {
    if (!process.env.DATABASE_URL) return null

    if (!url) {
      return null
    }

    const webposter = await prisma.webposter.findUnique({
      where: {
        url,
      },
    })
    return webposter
  },
  ['getMovieposter'],
  {
    revalidate: 60,
    tags: ['getMovieposter'],
  },
)

export default async function Home(props: Props) {
  return (
    <>
      <div className="fixed -z-10 h-screen w-screen opacity-10">
        <Image src={BGImage} alt="bg image" fill className="object-cover" />
      </div>
      <main className="flex min-h-[100svh] flex-col items-center justify-around gap-4 px-4">
        <div className="flex flex-col items-center pt-6 md:gap-1">
          <Link href="/">
            <div className="font-mono text-4xl md:text-5xl">Webposter Lab</div>
          </Link>
          <span className="text-center font-mono text-sm text-muted-foreground md:text-lg">
            Unique AI generated posters for any website
          </span>
        </div>

        <div className="flex min-h-[70svh] flex-1 items-center">
          <Generator
            cachedImageUrl={
              getUrl(props) && (await getMovieposter(getUrl(props)))?.imageUrl
            }
            paramUrl={getUrl(props)}
          />
        </div>

        {!!process.env.DATABASE_URL && <Explore />}

        <footer className="flex w-full flex-col justify-end py-6">
          <div className="container mx-auto flex items-center justify-between p-0">
            <Link
              href="https://twitter.com/paukraft"
              className="text-xs text-gray-500 hover:underline"
              target={'_blank'}
            >
              by Pau Kraft
            </Link>

            <Link
              href="https://github.com/DerZerstampfer/webposter-lab/"
              className="flex items-end gap-1 text-xs text-gray-500 hover:underline"
              target="_blank"
            >
              <Github className="h-4 w-4 text-white" />
              Source Code
            </Link>

            <Link
              href="https://teampilot.ai/"
              className="flex items-end gap-1 text-xs text-gray-500 hover:underline"
              target={'_blank'}
            >
              <Image
                src={'https://teampilot.ai/favicon-white.svg'}
                className="h-4 w-4"
                alt="logo"
                width={32}
                height={32}
              />
              <span className="max-sm:hidden">Powered by Teampilot AI</span>
              <span className="sm:hidden">Teampilot AI</span>
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}
