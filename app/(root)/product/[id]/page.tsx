import { Container, GroupVariants, ProductImage, Title } from '@/components/shared';
import prisma from '@/prisma/prisma-client';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params: { id } }: Props) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) return notFound();

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage src={product.imageUrl} size={40} />
        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">textDetails</p>
          <GroupVariants
            value="asd"
            items={[
              {
                name: '123',
                value: 'asd',
              },
              {
                name: '123',
                value: 'zxc',
              },
              {
                name: '123',
                value: 'sfd',
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
