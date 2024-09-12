'use client';

import { FC, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard, Title } from '@/components/shared';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

interface Props {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: FC<Props> = ({ title, items, className, categoryId }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, setActiveCategoryId, intersection?.isIntersecting]);

  return (
    <div className={cn(className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((item, i) => (
          <ProductCard
            key={i}
            name={item.name}
            id={item.id}
            imageUrl={item.imageUrl}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
