import { z } from 'zod';

/////////////////////////////////////////
// CLASS SCHEMA
/////////////////////////////////////////

export const ClassSchema = z.object({
  id: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  slug: z.string(),
  image: z.string().nullish(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Class = z.infer<typeof ClassSchema>

export default ClassSchema;
