import { z } from 'zod'

export const ClassSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  slug: z.string(),
  image: z.string().nullish(),
  description: z.string().nullish(),
})

export type Class = z.infer<typeof ClassSchema>

export default ClassSchema
