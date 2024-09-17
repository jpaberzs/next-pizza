'use client';

import { FC, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input, Skeleton } from '../ui';
import { FilterCheckbox } from '@/shared/components/shared';

interface Item {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

interface Props {
  title: string;
  items: Item[];
  defaultItem?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickedCheckbox?: (id: string) => void;
  selected: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroup: FC<Props> = ({
  title,
  items,
  defaultItem,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  loading,
  onClickedCheckbox,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="h-7 mb-4 rounded-[8px]" />)}
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )
    : (defaultItem || items).slice(0, limit);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(e) => onChangeSearchInput(e.target.value)}
            value={searchValue}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickedCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
