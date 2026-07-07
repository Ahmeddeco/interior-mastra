import { z } from 'zod';

/////////////////////////////////////////
// STYLE SCHEMA
/////////////////////////////////////////

export const StyleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  image: z.string().nullish(),
})

export type Style = z.infer<typeof StyleSchema>

export default StyleSchema;
