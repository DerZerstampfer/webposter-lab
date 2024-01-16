import { toast } from 'sonner'

export const shareOrCopy = ({
  title,
  url,
  copySuccessMessage,
}: {
  title?: string
  url: string
  copySuccessMessage?: string
}) => {
  if (navigator.share && navigator.canShare()) {
    navigator.share({
      title,
      url,
    })
  } else {
    navigator.clipboard.writeText(url)
    if (copySuccessMessage) toast.success(copySuccessMessage)
  }
}
