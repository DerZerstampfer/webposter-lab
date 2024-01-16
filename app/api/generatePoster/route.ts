import { prisma } from '@/lib/db'
import { fetchTeampilot } from '@teampilot/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

export const maxDuration = 300

const inputSchema = z.object({
  url: z.string(),
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

  const imageUrl = data.mediaAttachments?.[0]?.url

  if (imageUrl) {
    if (!process.env.DATABASE_URL) {
      console.log('No database connection - skipping saving to database')
    } else {
      // It isn't too important that it lands in the db, so if it fails to create don't return an error
      try {
        await prisma.webposter.create({
          data: {
            url: url,
            imageUrl: imageUrl,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return NextResponse.json({
    url: imageUrl,
  })
}
