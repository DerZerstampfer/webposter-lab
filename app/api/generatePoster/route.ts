import { prisma } from '@/lib/db'
import { getClientIp } from '@/lib/getClientIp'
import { fetchTeampilot } from '@teampilot/sdk'
import { Ratelimit } from '@unkey/ratelimit'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

export const maxDuration = 300

const inputSchema = z.object({
  url: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { url } = inputSchema.parse(body)

  const existingWebposter = await prisma.webposter.findUnique({
    where: {
      url,
    },
  })

  if (existingWebposter) {
    return Response.json({
      url: existingWebposter.imageUrl,
    })
  }

  // If the unkey root key is set, we'll use it to rate limit the requests
  if (process.env.UNKEY_ROOT_KEY) {
    const unkey = new Ratelimit({
      rootKey: process.env.UNKEY_ROOT_KEY,
      namespace: 'poster-generation',
      limit: 3,
      duration: '80s',
      async: false,
    })

    const identifier = getClientIp(req) ?? 'unknown'

    const ratelimit = await unkey.limit(identifier)

    if (!ratelimit.success) {
      return Response.json(
        {
          error:
            "You exceeded the rate limit. This service is free to use, but costly to operate. Please don't abuse it. Thanks :)",
        },
        { status: 429 }
      )
    }
  }

  const data = await fetchTeampilot({
    launchpadSlugId: process.env.LAUNCHPAD_ID,
    message: url,
    cacheTtlSeconds: 'forever',
  })

  if (data.mediaAttachments?.length === 0) {
    return Response.json(
      {
        error:
          "We couldn't generate a poster for this website. This is likely due to the website needing javascript to render. Please try another one.",
      },
      { status: 500 }
    )
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

  return Response.json({
    url: imageUrl,
  })
}
