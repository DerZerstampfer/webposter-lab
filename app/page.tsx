import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Generator } from '@/components/Generator'
import BGImage from '@/public/bg.png'

export default function Home() {
  return (
    <>
      <div className="fixed w-screen h-screen -z-10 opacity-10">
        <Image src={BGImage} alt="bg image" fill className="object-cover" />
      </div>
      <main className="flex min-h-[100svh] flex-col items-center justify-around px-4 gap-4">
        <div className="flex flex-col pt-6 md:gap-1 items-center">
          <Link href="/">
            <div className="font-mono text-4xl md:text-5xl">Webposter Lab</div>
          </Link>
          <span className="font-mono text-muted-foreground text-sm md:text-lg text-center">
            Unique AI generated posters for any website
          </span>
        </div>

        <div className="flex-1 flex items-center">
          <Generator />
        </div>

        <footer className="w-full flex flex-col justify-end py-6">
          <div className="container mx-auto flex items-center justify-between p-0">
            <Link
              href="https://twitter.com/paukraft"
              className="text-xs text-gray-500 hover:underline"
              target={'_blank'}
            >
              by Pau Kraft
            </Link>

            <Link
              href=""
              className="text-xs text-gray-500 hover:underline flex items-end gap-1"
              target="_blank"
            >
              <Github className="h-4 w-4 text-white" />
              Source Code
            </Link>

            <Link
              href="https://teampilot.ai/"
              className="text-xs text-gray-500 hover:underline flex items-end gap-1"
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
