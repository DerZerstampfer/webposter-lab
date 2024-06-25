import { createNextRouteHandler } from '@openpanel/nextjs'

export const { POST } = createNextRouteHandler({
  clientId: process.env.OPENPANEL_CLIENT_ID!,
  clientSecret: process.env.OPENPANEL_CLIENT_SECRET!,
})
