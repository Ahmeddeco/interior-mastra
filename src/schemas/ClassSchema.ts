import { z } from 'zod'

export const ClassSchema = z.object({
  id: z.string().nullish(),
  titleAr: z.string(),
  titleEn: z.string(),
  slug: z.string(),
  image: z.string().nullish(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
})

export type Class = z.infer<typeof ClassSchema>

export default ClassSchema
