'use client';

import { FC } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="73959dfcf4296fa20a3c09c6cd78ec2610719c72"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
