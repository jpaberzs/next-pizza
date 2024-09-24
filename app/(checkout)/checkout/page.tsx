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
import { useEffect, useState } from 'react';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';

const CheckoutPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, updateItemQuantity, removeCartItem, items, loading } = useCart();
  const { data: session } = useSession();

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

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      console.log(data);

      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) location.href = url;
    } catch (error) {
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
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
