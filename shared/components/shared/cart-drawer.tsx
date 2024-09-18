'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '@/shared/components/shared';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store/cart';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface Props {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [totalAmount, fetchCartItems, updateItemQuantity, removeCartItem, items] = useCartStore(
    (state) => [
      state.totalAmount,
      state.fetchCartItems,
      state.updateItemQuantity,
      state.removeCartItem,
      state.items,
    ],
  );

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetDescription />
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetTitle>
          В корзине{' '}
          <span className="font-bold">
            {items.length}{' '}
            {items.length === 1
              ? 'товар'
              : items.length > 1 && items.length < 5
              ? 'товара'
              : 'товаров'}
          </span>
        </SheetTitle>
        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          {items.map((item) => (
            <CartDrawerItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={
                item.pizzaType && item.pizzaSize
                  ? getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
                    )
                  : ''
              }
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              className="mb-2"
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
        </div>
        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>
            <Link href="/checkout">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
