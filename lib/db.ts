import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

export const dbEnvVarsAreDefined = !!(
  process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN
)

const libsql = dbEnvVarsAreDefined
  ? createClient({
      url: `${process.env.TURSO_DATABASE_URL}`,
      authToken: `${process.env.TURSO_AUTH_TOKEN}`,
    })
  : undefined

const adapter = libsql ? new PrismaLibSQL(libsql) : undefined
export const prisma = dbEnvVarsAreDefined
  ? new PrismaClient({ adapter })
  : undefined
