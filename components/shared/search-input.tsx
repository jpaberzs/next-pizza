'use client';

import { FC, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useClickAway } from 'react-use';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const SearchInput: FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

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
        />

        <div
          className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12',
          )}>
          <Link
            href="#"
            className="flex items-center px-3 py-2 hover:bg-primary/10 transition-all duration-200">
            <img
              className="rounded-sm flex-grow-0 flex-shrink-0 mr-3"
              src="https://media.dodostatic.net/image/r:292x292/11EE7D6134BC4150BDD8E792D866AB52.jpg"
              alt="Pizza"
              width={32}
              height={32}
            />
            <div>Пицца 1</div>
          </Link>
        </div>
      </div>
    </>
  );
};
