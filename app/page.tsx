import { Generator } from '@/components/Generator'
import Image from 'next/image'

import BGImage from '../public/bg.png'

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center p-4">
      <div className="fixed w-screen h-screen -z-10 opacity-10">
        <Image src={BGImage} alt="bg image" fill className="object-cover" />
      </div>
      {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div className="text-6xl font-bold tracking-tight">Web Poster</div>
      </div> */}
      <Generator />
    </main>
  )
}
