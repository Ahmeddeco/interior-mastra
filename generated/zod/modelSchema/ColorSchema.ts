import { z } from 'zod';

/////////////////////////////////////////
// COLOR SCHEMA
/////////////////////////////////////////

export const ColorSchema = z.object({
  id: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  slug: z.string(),
  colorCode: z.string(),
})

export type Color = z.infer<typeof ColorSchema>

export default ColorSchema;
