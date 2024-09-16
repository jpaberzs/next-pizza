'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui';
import { Title, RangeSlider, CheckboxFiltersGroup } from '@/components/shared';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const filters = useFilters();
  const { ingredients, loading } = useIngredients();

  useQueryFilters(filters);

  const mappedIngredients = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const updatedPrice = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickedCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickedCheckbox={filters.setSizes}
        selected={filters.sizes}
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
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="5000"
            min={100}
            max={5000}
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={5000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 0]}
          onValueChange={updatedPrice}
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
        onClickedCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
