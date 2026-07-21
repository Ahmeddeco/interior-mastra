import { z } from 'zod';

export const DesignScalarFieldEnumSchema = z.enum(['id','titleAr','titleEn','slug','descriptionAr','descriptionEn','painPointsAr','painPointsEn','solutionsAr','solutionsEn','mainImage','images','country','state','city','createdAt','updatedAt','userId','styleId']);

export default DesignScalarFieldEnumSchema;
