import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Explore } from '@/components/Explore'
import { Generator } from '@/components/Generator'
import BGImage from '@/public/bg.png'

export default function Home() {
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
          <Generator />
        </div>

        <Explore />

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
