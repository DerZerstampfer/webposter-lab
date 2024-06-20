import { dbEnvVarsAreDefined, prisma } from '@/lib/db'
import { getClientIp } from '@/lib/getClientIp'
import { fetchTeampilot } from '@teampilot/sdk'
import { Ratelimit } from '@unkey/ratelimit'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

export const maxDuration = 300

const inputSchema = z.object({
  url: z.string(),
  regenerationKey: z.string().optional(),
})

const regenerationJWT = z.object({
  id: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { url, regenerationKey: inputRegenerationKey } = inputSchema.parse(body)

  const existingWebposter = prisma
    ? await prisma.webposter.findUnique({
        where: {
          url,
        },
      })
    : undefined

  if (existingWebposter && inputRegenerationKey === undefined) {
    return Response.json({
      url: existingWebposter.imageUrl,
    })
  }

  if (existingWebposter && inputRegenerationKey) {
    try {
      if (!process.env.JWT_SECRET) throw new Error('No JWT secret set')
      const decoded = jwt.verify(inputRegenerationKey, process.env.JWT_SECRET)
      const { id } = regenerationJWT.parse(decoded)

      if (id !== existingWebposter.id) {
        throw new Error('Invalid regeneration key')
      }
    } catch (error) {
      return Response.json(
        {
          error: 'Invalid regeneration key',
        },
        { status: 400 }
      )
    }
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
    message: `${url} - research, lookup dominant color, generate poster, add watermark

please always go for a 3d disney like style`,
    cacheTtlSeconds: existingWebposter ? 0 : 'forever',
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

  const imageUrl =
    data.mediaAttachments?.[data.mediaAttachments.length - 1]?.url
  let regenerationKey: string | undefined

  if (imageUrl) {
    if (!dbEnvVarsAreDefined) {
      console.log('No database connection - skipping saving to database')
    } else {
      // It isn't too important that it lands in the db, so if it fails to create don't return an error
      try {
        if (existingWebposter) {
          await prisma?.webposter.update({
            where: {
              url,
            },
            data: {
              imageUrl: imageUrl,
            },
          })

          if (process.env.JWT_SECRET) {
            regenerationKey = jwt.sign(
              regenerationJWT.parse({ id: existingWebposter.id }),
              process.env.JWT_SECRET
            )
          }
        } else {
          const webposter = await prisma?.webposter.create({
            data: {
              url: url,
              imageUrl: imageUrl,
            },
            select: {
              id: true,
            },
          })

          if (process.env.JWT_SECRET && webposter) {
            regenerationKey = jwt.sign(
              regenerationJWT.parse({ id: webposter.id }),
              process.env.JWT_SECRET
            )
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return Response.json({
    url: imageUrl,
    regenerationKey,
  })
}
