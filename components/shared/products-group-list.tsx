import { FC } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard, Title } from '@/components/shared';

interface Props {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: FC<Props> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  return (
    <div className={cn(className)}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
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
