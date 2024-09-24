import { Ingredient, ProductItem } from '@prisma/client';

export type ProductWithRelations = {
  id: number;
  name: string;
  imageUrl: string;
  categoryID: number;
  createdAt: Date;
  updatedAt: Date;
  productItems: ProductItem[];
  ingredients: Ingredient[];
};
