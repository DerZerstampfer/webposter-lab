import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Explore } from '@/components/Explore'
import { Generator } from '@/components/Generator'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { prisma } from '@/lib/db'
import { Metadata, ResolvingMetadata } from 'next'
import { unstable_cache } from 'next/cache'

type Props = {
  params: {
    url?: string[]
  }
}

const getUrlFromProps = (props: Props) => {
  const paramUrl =
    props.params?.url && (props.params?.url[0] as string | undefined)

  return paramUrl !== 'index' ? paramUrl : undefined
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.DATABASE_URL) return {}

  const url = getUrlFromProps(props)

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

const getWebposter = unstable_cache(
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
  ['getWebposter'],
  {
    revalidate: 60,
    tags: ['getWebposter'],
  }
)

export default async function Home(props: Props) {
  return (
    <AuroraBackground>
      {/* <div className="fixed -z-10 h-screen w-screen opacity-10">
        <Image src={BGImage} alt="bg image" fill className="object-cover" />
      </div> */}
      <main className="flex min-h-[100svh] flex-col items-center justify-around gap-4 px-4">
        <div className="flex flex-col items-center pt-6 md:gap-1">
          <Link href="/">
            <div className="text-4xl md:text-7xl relative">
              <span className="italic absolute right-0 top-4 md:top-8 bg-clip-text text-transparent bg-gradient-to-b from-orange-700 to-red-700 pr-1">
                Lab
              </span>
              <div className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 relative pr-9 md:pr-16">
                Webposter
              </div>
            </div>
          </Link>
          {/* <span className="text-center text-sm text-muted-foreground md:text-lg">
            Unique AI generated posters for any website
          </span> */}
        </div>

        <div className="flex min-h-[70svh] flex-1 items-center">
          <Generator
            cachedImageUrl={
              getUrlFromProps(props) &&
              (await getWebposter(getUrlFromProps(props)))?.imageUrl
            }
            paramUrl={getUrlFromProps(props)}
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
    </AuroraBackground>
  )
}
