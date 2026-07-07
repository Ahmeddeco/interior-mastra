import { z } from 'zod'

export const StyleSchema = z.object({
  id: z.string().nullish(),
  titleAr: z.string(),
  titleEn: z.string(),
  slug: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  image: z.string().nullish(),
})

export type Style = z.infer<typeof StyleSchema>

export default StyleSchema
