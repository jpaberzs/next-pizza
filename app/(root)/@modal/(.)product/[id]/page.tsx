import { ChooseProductModal } from '@/shared/components/shared';
import prisma from '@/prisma/prisma-client';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductModalPage({ params: { id } }: Props) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      productItems: true,
    },
  });

  if (!product) return;
  // if (!product) return notFound();

  return <ChooseProductModal product={product}></ChooseProductModal>;
}
