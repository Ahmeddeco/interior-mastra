import { z } from 'zod';

export const ClassScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','slug','image','descriptionAr','descriptionEn','createdAt','updatedAt']);

export default ClassScalarFieldEnumSchema;
