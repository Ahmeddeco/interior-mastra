import { z } from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','miniDescriptionAr','miniDescriptionEn','descriptionAr','descriptionEn','slug','model','status','quantity','lowStock','price','discount','mainImage','images','factoryId','styleId','classId','createdAt','updatedAt']);

export default ProductScalarFieldEnumSchema;
