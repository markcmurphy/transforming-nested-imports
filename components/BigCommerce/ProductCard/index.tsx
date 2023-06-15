import React from 'react';

interface ProductCardProps {
  title?: string;
  body?: string;
}

interface ProductCardTitleProps {
  title?: string;
}

interface ProductCardBodyProps {
  body?: string;
}

export const ProductCardBody: React.FC<ProductCardBodyProps> = ({ body }) => {
  return (
    <p>{body}</p>
  );
}

export const ProductCardTitle: React.FC<ProductCardTitleProps> = ({ title }) => {
  return (
    <h2>{title}</h2>
  );
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, body }) => {
  return (
    <div>
      <ProductCardTitle title={title} />
      <ProductCardBody body={body} />
    </div>
  );
}

