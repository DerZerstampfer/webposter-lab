import { Spinner } from '@/components/ui/spinner'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import React, { useState } from 'react'

export const DownloadButton = ({
  imageUrl,
  name,
}: {
  imageUrl: string
  name: string
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownloadClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(
        `/api/imageProxy?url=${encodeURIComponent(imageUrl)}`
      )
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = objectUrl
      link.download = `teampilot_webposter_${filterName(
        name.replace('.', '_')
      )}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(objectUrl)
    } catch (error) {
      console.error('Download failed', error)
    }
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ translateY: '200%' }}
      animate={{ translateY: '0%' }}
      exit={{ translateY: '200%' }}
      transition={{
        type: 'spring',
        stiffness: 190,
        damping: 15,
      }}
      className="relative"
    >
      <button
        onClick={handleDownloadClick}
        className="relative rounded-lg bg-gray-100/50 hover:bg-gray-200/50 p-2 ring-1 ring-inset ring-gray-100/30 active:translate-y-1 duration-100"
      >
        {isLoading ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <Download className="h-4 w-4" />
        )}
      </button>
    </motion.div>
  )
}

const filterName = (name: string) => {
  // Define the allowed characters using a regular expression.
  // This example allows letters, numbers, underscores, and hyphens.
  const allowedChars = /^[a-zA-Z0-9_-]+$/

  // Split the name into individual characters, filter out disallowed ones, and rejoin them.
  const filteredName = name
    .split('')
    .filter((char) => allowedChars.test(char))
    .join('')

  // Return the filtered name.
  return filteredName
}
