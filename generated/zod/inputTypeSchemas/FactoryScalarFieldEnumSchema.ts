import { z } from 'zod';

export const FactoryScalarFieldEnumSchema = z.enum(['id','name','slug','logo','info','country','state','city','mobile','hotLine','createdAt','updatedAt']);

export default FactoryScalarFieldEnumSchema;
