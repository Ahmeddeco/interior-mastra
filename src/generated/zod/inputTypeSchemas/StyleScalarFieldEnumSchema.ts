import { z } from 'zod';

export const StyleScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','slug','descriptionAr','descriptionEn','image']);

export default StyleScalarFieldEnumSchema;
