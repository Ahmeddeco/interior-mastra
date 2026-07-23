import { z } from 'zod';

export const RoleSchema = z.enum(['admin','user','manufacturer','client','designer']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export default RoleSchema;
