'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Title, RangeSlider, CheckboxFiltersGroup } from '@/components/shared';
import { Input } from '../ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';

interface Props {
  className?: string;
}

interface PriceRangeProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));
  const [price, setPrice] = useState<PriceRangeProps>({ priceFrom: 0, priceTo: 5000 });

  const mappedIngredients = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log({ price, pizzaTypes, sizes, selectedIngredients });
  }, [price, pizzaTypes, sizes, selectedIngredients]);

  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickedCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickedCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { value: '20', text: '20 см' },
          { value: '30', text: '30 см' },
          { value: '40', text: '40 см' },
        ]}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={5000}
            value={String(price.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="5000"
            min={100}
            max={5000}
            value={String(price.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[price.priceFrom, price.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mb-5 mt-5"
        name="ingredients"
        limit={6}
        defaultItem={mappedIngredients.slice(0, 6)}
        items={mappedIngredients}
        loading={loading}
        onClickedCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
