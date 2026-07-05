import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
