import { fetchTeampilot } from '@teampilot/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const inputSchema = z.object({
  url: z.string().url(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { url } = inputSchema.parse(body)

  const data = await fetchTeampilot({
    launchpadSlugId: process.env.LAUNCHPAD_ID,
    message: url,
  })

  if (data.mediaAttachments?.length === 0) {
    return NextResponse.error()
  }

  const image = data.mediaAttachments?.[0]?.url

  return NextResponse.json({
    url: image,
  })
}
