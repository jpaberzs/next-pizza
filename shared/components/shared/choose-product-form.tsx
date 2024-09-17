import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import { ProductImage, Title } from '@/shared/components/shared';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChooseProductForm: FC<Props> = ({ imageUrl, name, onSubmit, className }) => {
  const textDetaills =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, explicabo.';
  const totalPrice = '350';

  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 mb-10">{textDetaills}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
