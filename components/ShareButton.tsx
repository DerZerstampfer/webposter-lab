import { shareOrCopy } from '@/lib/shareOrCopy'
import { Share2 } from 'lucide-react'

export const ShareButton = ({ url }: { url: string }) => {
  return (
    <button
      onClick={() =>
        shareOrCopy({
          url: `https://webposterlab.com/${url}`,
          copySuccessMessage: 'Copied to clipboard!',
          title: `Webposter for ${url} - By Webposter Lab`,
        })
      }
      className="rounded-lg bg-gray-100/30 p-2 ring-1 ring-inset ring-gray-100/20 duration-100 hover:bg-gray-200/30 active:translate-y-1"
    >
      <Share2 className="h-4 w-4" />
    </button>
  )
}
