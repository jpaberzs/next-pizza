'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui';

interface FilterChecboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const FilterCheckbox: FC<FilterChecboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
}) => {
  return (
    <div className={cn('flex items-center space-x-2')}>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className={cn('rounded-[8px] w-6 h-6')}
        id={`checkbox-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${String(value)}`}
        className={cn('leading-none cursor-pointer flex-1')}>
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
