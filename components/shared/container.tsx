import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('mx-auto max-w-[1304px] px-3', className)}>{children}</div>;
};
