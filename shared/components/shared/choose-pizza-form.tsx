import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import { GroupVariants, ProductImage, Title } from '@/shared/components/shared';
import { Button } from '../ui';
import { pizzaSizes } from '@/shared/constants/pizza';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onSubmit,
  className,
}) => {
  const textDetaills =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, explicabo.';
  const totalPrice = '350';
  const size = 30;

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage src={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 mb-3">{textDetaills}</p>
        <GroupVariants items={pizzaSizes} />
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
