'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CheckoutPersonalForm,
  CheckoutAddressForm,
  CheckoutSidebar,
  CheckoutCart,
} from '@/shared/components/shared/checkout';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { useState } from 'react';

const CheckoutPage = () => {
  const [submitting] = useState(false);
  const { totalAmount, updateItemQuantity, removeCartItem, items, loading } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar loading={loading || submitting} totalAmount={totalAmount} />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CheckoutPage;
