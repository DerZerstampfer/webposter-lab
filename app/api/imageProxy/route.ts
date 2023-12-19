import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const url = searchParams.get('url')

  if (!url || !url.startsWith('https://d39ob9hwkmfin1.cloudfront.net/')) {
    return NextResponse.error()
  }

  const response = await fetch(url)
  const buffer = await response.arrayBuffer()

  const contentType = response.headers.get('content-type')

  return new Response(buffer, {
    headers: {
      'content-type': contentType || 'image/jpeg',
    },
  })
}
