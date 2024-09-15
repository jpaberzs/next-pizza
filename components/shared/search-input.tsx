'use client';

import { FC, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface Props {
  className?: string;
}

export const SearchInput: FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      Api.products
        .search(searchQuery)
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    300,
    [searchQuery],
  );

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div
        ref={ref}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-40', className)}>
        <Search size={20} className="absolute top-1/2 translate-y-[-50%] left-3 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <div
          className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12',
          )}>
          {products.map((product, index) => (
            <Link
              href="#"
              key={index}
              className="flex items-center px-3 py-2 hover:bg-primary/10 transition-all duration-200">
              <img
                className="rounded-sm flex-grow-0 flex-shrink-0 mr-3"
                src={product.imageUrl}
                alt="Pizza"
                width={32}
                height={32}
              />
              <div>{product.name}</div>
            </Link>
          ))}
          {products.length === 0 && (
            <div className="text-center font-bold py-12 text-[26px]">
              По вашему запросу нечего не найдено
            </div>
          )}
        </div>
      </div>
    </>
  );
};
