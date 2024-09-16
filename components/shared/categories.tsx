'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: FC<Props> = ({ items, className }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(({ name, id }, index) => (
        <Link
          href={`/#${name}`}
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeCategoryId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}>
          {name}
        </Link>
      ))}
    </div>
  );
};
