import LoadingInline from '@/components/loading/Inline';

import classNames from 'classnames';
import type { CSSProperties, ReactNode } from 'react';

import './index.scss';

type TypographyStyle = CSSProperties & {
  '--typography-size'?: string;
  '--typography-size-desktop'?: string;
  '--typography-line-height'?: string;
  '--typography-line-height-desktop'?: string;
};

interface Props {
  font?: 'poppins' | 'inter';
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
  color?:
    | 'primary'
    | 'secondary'
    | 'black'
    | 'white'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'figma-text-primary'
    | 'figma-text-body'
    | 'figma-text-muted'
    | 'figma-price';
  transform?: 'uppercase' | 'lowercase' | 'default';
  align?: 'inherit' | 'left' | 'right' | 'center';
  size?: number;
  lineHeight?: number;
  sizeDesktop?: number;
  lineHeightDesktop?: number;
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

const toRem = (value?: number) => (typeof value === 'number' ? `${value / 16}rem` : undefined);

const Typography = ({
  font = 'inter',
  type,
  className,
  transform,
  size,
  sizeDesktop,
  lineHeight,
  lineHeightDesktop,
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
    [`Typography--${transform}`]: !!transform && transform !== 'default',
    [`Typography--${align}`]: !!align && align !== 'inherit',
    [`Typography--${weight}`]: !!weight,
    [`Typography--${color}`]: !!color,
    [`Typography--size-${size}`]: !!size,
    [`Typography--size-desktop-${sizeDesktop}`]: !!sizeDesktop,
    [`Typography--line-height-${lineHeight}`]: !!lineHeight,
    [`Typography--line-height-desktop-${lineHeightDesktop}`]: !!lineHeightDesktop,
  });

  // Adjustment to match Figma, where line-heights vary between styles.
  const style: TypographyStyle = {
    '--typography-size': toRem(size),
    '--typography-size-desktop': toRem(sizeDesktop),
    '--typography-line-height': toRem(lineHeight),
    '--typography-line-height-desktop': toRem(lineHeightDesktop),
  };

  return (
    <TypographyComponent className={classes} style={style}>
      {children}
      <LoadingInline visible={isLoading} />
    </TypographyComponent>
  );
};

export default Typography;
