import Image from 'next/image';

import Typography from '@/components/typography';
import StarIcon from '@/components/icons/StarIcon';
import { formatUSD } from '@/utils/MoneyUtils';
import type { Product } from '@/domains/product/types';

import './index.scss';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { title, description, price, discountPercentage, rating, stock, brand, thumbnail } =
    product;
  const originalPrice = price / (1 - discountPercentage / 100);

  return (
    <article className="ProductCard">
      <div className="ProductCard__image-wrapper">
        {!!discountPercentage && (
          <Typography
            className="ProductCard__badge"
            type="span"
            color="white"
            weight="regular"
            size={12}
            lineHeight={16}
            sizeDesktop={16}
            lineHeightDesktop={24}
          >
            -{Math.round(discountPercentage)}%
          </Typography>
        )}

        <Image
          className="ProductCard__image"
          src={thumbnail}
          alt={title}
          width={294}
          height={294}
        />
      </div>

      <div className="ProductCard__body">
        {!!brand && (
          <Typography
            className="ProductCard__brand"
            type="span"
            color="figma-text-muted"
            transform="uppercase"
            size={10}
            lineHeight={15}
            sizeDesktop={12}
            lineHeightDesktop={16}
          >
            {brand}
          </Typography>
        )}

        <Typography
          className="ProductCard__name"
          type="h3"
          color="figma-text-primary"
          weight="medium"
          size={14}
          lineHeight={20}
          sizeDesktop={18}
          lineHeightDesktop={27}
        >
          {title}
        </Typography>

        <Typography
          className="ProductCard__description"
          type="p"
          color="figma-text-body"
          weight="regular"
          sizeDesktop={14}
          lineHeightDesktop={20}
        >
          {description}
        </Typography>

        <div className="ProductCard__meta">
          <div className="ProductCard__rating">
            <StarIcon />

            <Typography
              type="span"
              color="figma-text-primary"
              weight="regular"
              size={12}
              lineHeight={16}
              sizeDesktop={14}
              lineHeightDesktop={20}
            >
              {rating.toFixed(1)}
            </Typography>
          </div>

          <span className="ProductCard__dot" aria-hidden="true">
            •
          </span>

          <Typography
            type="span"
            color="figma-text-body"
            weight="regular"
            size={12}
            lineHeight={16}
            sizeDesktop={14}
            lineHeightDesktop={20}
          >
            <span className="ProductCard__stock-desktop">{stock} in stock</span>
            <span className="ProductCard__stock-mobile">{stock} stock</span>
          </Typography>
        </div>

        <div className="ProductCard__pricing">
          <Typography
            type="span"
            color="figma-price"
            weight="regular"
            size={18}
            lineHeight={28}
            sizeDesktop={24}
            lineHeightDesktop={32}
          >
            {formatUSD(price)}
          </Typography>

          <Typography
            className="ProductCard__original-price"
            type="span"
            color="figma-text-muted"
            weight="regular"
            size={12}
            lineHeight={16}
            sizeDesktop={14}
            lineHeightDesktop={20}
          >
            {formatUSD(originalPrice)}
          </Typography>
        </div>
      </div>
    </article>
  );
}
