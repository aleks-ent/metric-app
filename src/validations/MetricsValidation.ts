import { z } from 'zod'

export const MetricsSchema = z.object({
  created_at: z.string().nonempty(),
  owner: z.string().nonempty(),
  repo: z.string().nonempty(),
  metrics: z.string().nonempty(),
})
