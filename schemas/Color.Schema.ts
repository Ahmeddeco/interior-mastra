import { z } from 'zod'

export const ColorSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  slug: z.string(),
  colorCode: z.string(),
})

export type Color = z.infer<typeof ColorSchema>

export default ColorSchema
