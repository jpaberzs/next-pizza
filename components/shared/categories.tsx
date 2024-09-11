import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Categories: FC<Props> = ({ className }) => {
  return <div className={cn(className)}></div>;
};
