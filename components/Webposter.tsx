import { Webposter as WebposterType } from '@prisma/client'
import Image from 'next/image'

export const Webposter = ({ webposter }: { webposter: WebposterType }) => {
  return (
    <div className="group relative flex flex-col items-center gap-1.5 duration-100 hover:scale-105 hover:drop-shadow-md">
      <Image
        src={webposter.imageUrl}
        alt={webposter.url}
        width={256}
        height={256}
        unoptimized
        className="absolute scale-105 opacity-0 blur-lg duration-100 group-hover:opacity-100"
      />
      <Image
        src={webposter.imageUrl}
        alt={webposter.url}
        width={256}
        height={256}
        unoptimized
        className="relative"
      />
      <div className="truncate font-mono text-lg" title={webposter.url}>
        {webposter.url}
      </div>
    </div>
  )
}
