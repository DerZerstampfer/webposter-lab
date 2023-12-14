'use client'

import NiceModal from '@ebay/nice-modal-react'

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return <NiceModal.Provider>{children}</NiceModal.Provider>
}
