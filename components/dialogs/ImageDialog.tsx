import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import Image from 'next/image'

export const ImageDialog = NiceModal.create<{
  imageUrl: string
  url: string
}>(({ imageUrl, url }) => {
  // Use a hook to manage the modal state
  const modal = useModal()

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => {
        if (!open) {
          modal.reject()
          modal.remove()
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Web Poster</DialogTitle>
          <DialogDescription>
            Generated for {url}, it is presented to you by
            <a
              href="https://teampilot.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              teampilot.ai
            </a>
          </DialogDescription>
        </DialogHeader>
        <Image
          width={1024}
          height={1792}
          src={imageUrl}
          alt="Generated Web Poster"
          unoptimized
        />
      </DialogContent>
    </Dialog>
  )
})
