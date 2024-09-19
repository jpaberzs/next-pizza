import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Title } from '@/shared/components/shared';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients: Ingredient[];
}

export const ProductCard: FC<Props> = ({ id, name, price, imageUrl, ingredients, className }) => {
  return (
    <Link className={cn('h-full flex flex-col', className)} href={`/product/${id}`}>
      <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
      </div>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
      <p className="text-sm text-gray-400 mb-4">
        {ingredients.map((ingredient) => ingredient.name).join(' ')}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>
        <Button variant="secondary">
          <Plus size={16} className="mr-1" />
          Добавить
        </Button>
      </div>
    </Link>
  );
};
