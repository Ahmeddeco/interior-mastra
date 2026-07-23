import { z } from 'zod'

export const FactorySchema = z.object({
  id: z.string().nullish(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullish(),
  info: z.string().nullish(),
  country: z.string(),
  state: z.string(),
  city: z.string().nullish(),
  mobile: z.string(),
  hotLine: z.string().nullish(),
  users: z.string().array(),
})

export type Factory = z.infer<typeof FactorySchema>

export default FactorySchema
