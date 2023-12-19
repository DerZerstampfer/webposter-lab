import { Download } from 'lucide-react'
import React from 'react'

export const DownloadButton = ({
  imageUrl,
  name,
}: {
  imageUrl: string
  name: string
}) => {
  const handleDownloadClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

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
  }

  return (
    <button
      onClick={handleDownloadClick}
      className="rounded-lg bg-gray-100/10 hover:bg-gray-200/10 p-2 ring-1 ring-inset ring-gray-100/5 active:translate-y-1 duration-100"
    >
      <Download className="h-4 w-4" />
    </button>
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
