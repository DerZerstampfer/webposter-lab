import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useStringQueryParam = (name: string) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchParamValue = searchParams?.get(name) ?? undefined
  const [value, setValue] = useState<string | undefined>(searchParamValue)

  // Whenever the router's query changes, update the local state
  useEffect(() => {
    setValue(searchParamValue)
  }, [searchParamValue])

  return {
    setValue: (value?: string) => {
      setValue(value) // update the local state
      const newSearchParams = new URLSearchParams(searchParams ?? {})

      if (!value) newSearchParams.delete(name)
      else newSearchParams.set(name, value)
      router.push(
        [pathname, newSearchParams.toString()].filter(Boolean).join('?')
      )
    },
    getValue: () => {
      return value
    },
  }
}
