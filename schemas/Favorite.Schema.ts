import { z } from 'zod';

export const FavoriteSchema = z.object({
  id: z.string().nullish(),
  userId: z.string(),
  productId: z.string(),
})

export type Favorite = z.infer<typeof FavoriteSchema>

export default FavoriteSchema;
