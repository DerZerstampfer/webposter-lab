import { NextRequest } from 'next/server'

export const getClientIp = (request: NextRequest) => {
  let ip = request.ip ?? request.headers.get('x-real-ip')
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? null
    return ip
  }
  return ip
}
