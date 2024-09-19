import prisma from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { Container, ProductForm } from '@/shared/components/shared';

interface Props {
  product: ProductWithRelations;
  params: {
    id: string;
  };
}

export default async function ProductPage({ params: { id } }: Props) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              productItems: true,
            },
          },
        },
      },
      productItems: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!product) return notFound();

  return (
    <Container>
      <ProductForm product={product} />
    </Container>
  );
}
