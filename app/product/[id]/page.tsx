import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const ProductPage = ({ params: { id } }: Props) => {
  return <div>{id}</div>;
};

export default ProductPage;
