import { z } from 'zod';

/////////////////////////////////////////
// DESIGN SCHEMA
/////////////////////////////////////////

export const DesignSchema = z.object({
  id: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  slug: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  painPointsAr: z.string().nullish(),
  painPointsEn: z.string().nullish(),
  solutionsAr: z.string().nullish(),
  solutionsEn: z.string().nullish(),
  mainImage: z.string(),
  images: z.string().array(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  styleId: z.string(),
})

export type Design = z.infer<typeof DesignSchema>

export default DesignSchema;
