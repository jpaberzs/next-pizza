'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from '@/components/shared';
import { Input } from '../ui';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={5000} defaultValue={0} />
          <Input type="number" placeholder="5000" min={100} defaultValue={500} max={5000} />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mb-5"
        limit={6}
        defaultItem={[
          {
            text: 'сырный соус',
            value: '10',
          },
          {
            text: 'Чеснок',
            value: '2',
          },
          {
            text: 'Огурец',
            value: '3',
          },
          {
            text: 'сырный соус 2',
            value: '4',
          },
          {
            text: 'Чеснок 2',
            value: '5',
          },
          {
            text: 'Огурец 2',
            value: '6',
          },
        ]}
        items={[
          {
            text: 'сырный соус',
            value: '1',
          },
          {
            text: 'Чеснок',
            value: '2',
          },
          {
            text: 'Огурец',
            value: '3',
          },
          {
            text: 'сырный соус',
            value: '1',
          },
          {
            text: 'Чеснок',
            value: '2',
          },
          {
            text: 'Огурец',
            value: '3',
          },
          {
            text: 'сырный соус',
            value: '1',
          },
          {
            text: 'Чеснок',
            value: '2',
          },
          {
            text: 'Огурец',
            value: '3',
          },
          {
            text: 'сырный соус',
            value: '1',
          },
          {
            text: 'Чеснок',
            value: '2',
          },
          {
            text: 'Огурец',
            value: '3',
          },
          {
            text: 'сырный соус 2',
            value: '4',
          },
          {
            text: 'Чеснок 2',
            value: '5',
          },
          {
            text: 'Огурец 2',
            value: '6',
          },
        ]}
      />
    </div>
  );
};
