import LoadingInline from '@/components/loading/Inline';

import classNames from 'classnames';
import React, { ReactNode } from 'react';

import './index.scss';

interface Props {
  font?: 'poppins';
  type:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'p'
    | 'span'
    | 'label'
    | 'strong'
    | 'address'
    | 'div'
    | 'small';
  weight?:
    | 'thin'
    | 'extra-light'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semi-bold'
    | 'bold'
    | 'extra-bold';
  color?: 'primary' | 'secondary' | 'black' | 'white' | 'success' | 'error' | 'warning' | 'info';
  transform?: 'uppercase' | 'lowercase' | 'default';
  align?: 'inherit' | 'left' | 'right' | 'center';
  size?: number;
  sizeDesktop?: number;
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

const Typography = ({
  font = 'poppins',
  type,
  className,
  transform,
  size,
  sizeDesktop,
  children,
  align = 'inherit',
  weight = 'regular',
  color = 'black',
  isLoading,
}: Props) => {
  const TypographyComponent = type;

  const classes = classNames('Typography', className, {
    [`Typography--${font}`]: !!font,
    [`Typography--${type}`]: !!type,
    [`Typography--${transform}`]: !!transform,
    [`Typography--${align}`]: !!align,
    [`Typography--${weight}`]: !!weight,
    [`Typography--${color}`]: !!color,
    [`Typography--size-${size}`]: !!size,
    [`Typography--size-desktop-${sizeDesktop}`]: !!sizeDesktop,
  });

  return (
    <TypographyComponent className={classes}>
      {children}
      <LoadingInline visible={isLoading} />
    </TypographyComponent>
  );
};

export default Typography;
