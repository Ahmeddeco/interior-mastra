import { z } from 'zod';

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.string(),
  titleAr: z.string(),
  titleEn: z.string(),
  descriptionAr: z.string(),
  descriptionEn: z.string(),
  slug: z.string(),
  topicAr: z.string(),
  topicEn: z.string(),
  mainImage: z.string(),
  images: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export type Article = z.infer<typeof ArticleSchema>

export default ArticleSchema;
