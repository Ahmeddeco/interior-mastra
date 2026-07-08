import ProductStatusSchema from "@/generated/zod/inputTypeSchemas/ProductStatusSchema"
import { z } from 'zod'

export const ProductSchema = z.object({
  status: ProductStatusSchema,
  id: z.string().nullish(),
  titleAr: z.string(),
  titleEn: z.string(),
  model: z.string(),
  descriptionAr: z.string().nullish(),
  descriptionEn: z.string().nullish(),
  miniDescriptionAr: z.string(),
  miniDescriptionEn: z.string(),
  quantity: z.number(),
  lowStock: z.number(),
  price: z.number(),
  discount: z.number().nullish(),
  mainImage: z.string(),
  images: z.string().array(),
  factoryId: z.string(),
  styleId: z.string(),
  classId: z.string(),
  slug: z.string().nullish(),
  colors: z.array(z.string())
})

export type Product = z.infer<typeof ProductSchema>

export default ProductSchema
