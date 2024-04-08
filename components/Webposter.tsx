import { Webposter as WebposterType } from '@prisma/client'
import Image from 'next/image'

export const Webposter = ({
  webposter,
  unoptimized = false,
}: {
  webposter: Pick<WebposterType, 'imageUrl' | 'url'>
  unoptimized?: boolean
}) => {
  return (
    <div className="group relative flex max-w-full flex-col items-center gap-2 duration-100 hover:scale-105 hover:drop-shadow-md max-sm:flex-col-reverse sm:gap-1.5">
      <Image
        src={webposter.imageUrl}
        alt={webposter.url}
        width={256}
        height={256}
        unoptimized={unoptimized}
        className="absolute scale-105 opacity-0 blur-lg duration-100 group-hover:opacity-100"
      />
      <Image
        src={webposter.imageUrl}
        alt={webposter.url}
        width={256}
        height={256}
        unoptimized={unoptimized}
        className="relative"
      />
      <div className="truncate text-2xl sm:text-lg" title={webposter.url}>
        {webposter.url}
      </div>
    </div>
  )
}
