'use client';

import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import { GroupVariants, Ingredients, ProductImage, Title } from '@/shared/components/shared';
import { Button } from '../ui';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { usePizzaOptions } from '@/shared/hooks';
import { getPizzaDetails } from '@/shared/lib';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
  loading?: boolean;
}

export const ChoosePizzaForm: FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onSubmit,
  className,
  loading,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    currentItemId,
    addIngredient,
    setSize,
    setType,
  } = usePizzaOptions(items);

  const { textDetaills, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClick = () => {
    if (!currentItemId) return;
    onSubmit(currentItemId, Array.from(selectedIngredients));
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage src={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 mb-3">{textDetaills}</p>
        <GroupVariants
          items={availablePizzaSizes}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
          className="mb-1"
        />
        <GroupVariants
          items={pizzaTypes}
          value={String(type)}
          onClick={(value) => setType(Number(value) as PizzaType)}
          className="mb-3 *:capitalize"
        />
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <Ingredients
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
