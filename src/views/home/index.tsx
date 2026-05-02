'use client';

import { useCallback, useEffect, useRef } from 'react';

import LayoutContainer from '@/components/layout/Container';
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCard/Skeleton';
import SearchInput from '@/components/SearchInput';
import Typography from '@/components/typography';
import { PRODUCTS_PER_PAGE } from '@/constants/products';
import { useProductsStore } from '@/domains/product/ProductStore';

import './index.scss';

const SEARCH_DEBOUNCE_MS = 400;

export default function HomeView() {
  const { products, search, status, error, total, page, setSearch, fetchProducts, searchProducts } =
    useProductsStore();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchProducts(1);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchProducts]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        if (value.trim()) {
          searchProducts(value, 1);
        } else {
          fetchProducts(1);
        }
      }, SEARCH_DEBOUNCE_MS);
    },
    [setSearch, searchProducts, fetchProducts],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (search.trim()) {
        searchProducts(search, newPage);
      } else {
        fetchProducts(newPage);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [search, searchProducts, fetchProducts],
  );

  const handleRetry = useCallback(() => {
    if (search.trim()) {
      searchProducts(search, page);
    } else {
      fetchProducts(page);
    }
  }, [search, page, searchProducts, fetchProducts]);

  const isLoading = status === 'loading' || status === 'idle';
  const hasError = status === 'error';
  const isEmpty = status === 'success' && products.length === 0;
  const showPagination = !isLoading && total > PRODUCTS_PER_PAGE;

  return (
    <LayoutContainer type="main">
      <div className="HomeView">
        <div className="HomeView__header">
          <Typography
            type="h1"
            className="HomeView__title"
            color="figma-text-primary"
            size={24}
            lineHeight={32}
            sizeDesktop={24}
            lineHeightDesktop={36}
            weight="medium"
          >
            Products
          </Typography>

          <SearchInput value={search} onChange={handleSearch} />

          <Typography
            type="p"
            className="HomeView__count"
            color="figma-text-body"
            size={14}
            lineHeight={20}
            sizeDesktop={16}
            lineHeightDesktop={24}
            weight="regular"
            isLoading={isLoading}
          >
            {hasError ? (
              ''
            ) : (
              <>
                <span className="HomeView__count-desktop">Showing {total} products</span>
                <span className="HomeView__count-mobile">{total} products</span>
              </>
            )}
          </Typography>
        </div>

        {hasError && (
          <div className="HomeView__feedback" role="alert">
            <Typography type="p" size={12} sizeDesktop={14} weight="medium">
              {error}
            </Typography>
            <button className="HomeView__retry" type="button" onClick={handleRetry}>
              <Typography type="span" color="white" size={12} sizeDesktop={13} weight="semi-bold">
                Try again
              </Typography>
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="HomeView__feedback">
            <Typography type="p" size={12} sizeDesktop={14} weight="medium">
              No products found
            </Typography>
          </div>
        )}

        {!hasError && !isEmpty && (
          <div className="HomeView__grid">
            {isLoading
              ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
              : products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}

        {showPagination && (
          <Pagination
            page={page}
            total={total}
            perPage={PRODUCTS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </LayoutContainer>
  );
}
