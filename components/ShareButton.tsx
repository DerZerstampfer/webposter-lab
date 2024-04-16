import { shareOrCopy } from '@/lib/shareOrCopy'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

export const ShareButton = ({ url }: { url: string }) => {
  return (
    <motion.div
      initial={{ translateY: '200%' }}
      animate={{ translateY: '0%' }}
      exit={{ translateY: '200%' }}
      transition={{
        type: 'spring',
        stiffness: 190,
        damping: 17,
      }}
      className="relative"
    >
      <button
        onClick={() =>
          shareOrCopy({
            url: `https://webposterlab.com/${url}`,
            copySuccessMessage: 'Copied to clipboard!',
            title: `Webposter for ${url} - By Webposter Lab`,
          })
        }
        className="relative rounded-lg bg-gray-100/50 hover:bg-gray-200/50 p-2 ring-1 ring-inset ring-gray-100/30 active:translate-y-1 duration-100"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
