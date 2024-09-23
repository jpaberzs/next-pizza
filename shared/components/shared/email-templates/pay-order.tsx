import { FC } from 'react';

interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderEmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ #{orderId}</h1>

    <p>
      Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Перейдите{' '}
      <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
    </p>
  </div>
);
