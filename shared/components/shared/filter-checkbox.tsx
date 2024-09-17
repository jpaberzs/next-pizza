'use client';

import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Checkbox } from '../ui';

interface FilterChecboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: FC<FilterChecboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className={cn('flex items-center space-x-2')}>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className={cn('rounded-[8px] w-6 h-6')}
        id={`checkbox-${name}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${name}-${String(value)}`}
        className={cn('leading-none cursor-pointer flex-1')}>
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
