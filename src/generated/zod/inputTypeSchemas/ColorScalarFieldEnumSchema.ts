import { z } from 'zod';

export const ColorScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','slug','colorCode']);

export default ColorScalarFieldEnumSchema;
