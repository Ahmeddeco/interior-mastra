import { z } from 'zod';

/////////////////////////////////////////
// FAVORITE SCHEMA
/////////////////////////////////////////

export const FavoriteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string(),
  createdAt: z.date(),
})

export type Favorite = z.infer<typeof FavoriteSchema>

export default FavoriteSchema;
