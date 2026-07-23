import { z } from 'zod';

/////////////////////////////////////////
// FACTORY SCHEMA
/////////////////////////////////////////

export const FactorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullish(),
  info: z.string().nullish(),
  country: z.string(),
  state: z.string(),
  city: z.string().nullish(),
  mobile: z.string(),
  hotLine: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Factory = z.infer<typeof FactorySchema>

export default FactorySchema;
