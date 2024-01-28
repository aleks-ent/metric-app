/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    DATABASE_URL: z.string().nonempty(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
  },
})
