import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import Typography from '@/components/typography';

import './index.scss';

type Props = {
  page: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, total, perPage, onPageChange }: Props) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className="Pagination" aria-label="Pagination navigation">
      <button
        className="Pagination__btn"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrev}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />

        <Typography
          type="span"
          color="figma-text-primary"
          weight="medium"
          sizeDesktop={16}
          lineHeightDesktop={24}
        >
          Previous
        </Typography>
      </button>

      <Typography
        type="span"
        color="figma-text-primary"
        weight="regular"
        size={12}
        lineHeight={16}
        sizeDesktop={14}
        lineHeightDesktop={20}
      >
        <span className="Pagination__info-desktop">
          Page {page} of {totalPages}
        </span>

        <span className="Pagination__info-mobile">
          {page} / {totalPages}
        </span>
      </Typography>

      <button
        className="Pagination__btn"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        aria-label="Next page"
      >
        <Typography
          type="span"
          color="figma-text-primary"
          weight="medium"
          sizeDesktop={16}
          lineHeightDesktop={24}
        >
          Next
        </Typography>

        <ChevronRightIcon />
      </button>
    </nav>
  );
}
