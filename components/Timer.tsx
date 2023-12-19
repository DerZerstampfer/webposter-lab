import { useEffect, useState } from 'react'

export const Timer = ({ date }: { date: Date }) => {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const diff = (now.getTime() - date.getTime()) / 1000
  const minutes = Math.floor(diff / 60)
  const seconds = Math.floor(diff % 60)

  return (
    <span className="font-mono">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </span>
  )
}
