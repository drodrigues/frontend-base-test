import { create } from 'zustand';

import { PRODUCTS_PER_PAGE } from '@/constants/products';

import { ProductService } from './ProductService';
import type { Product } from './types';

type ProductsStore = {
  products: Product[];
  search: string;
  status: Status;
  error: string | null;
  total: number;
  page: number;
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
  fetchProducts: (page?: number) => Promise<void>;
  searchProducts: (query: string, page?: number) => Promise<void>;
};

let latestRequestId = 0;

const getNextRequestId = () => {
  latestRequestId += 1;
  return latestRequestId;
};

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  search: '',
  status: 'idle',
  error: null,
  total: 0,
  page: 1,

  setSearch: (search) => {
    getNextRequestId();
    set({ search });
  },
  setPage: (page) => set({ page }),

  fetchProducts: async (page = 1) => {
    const requestId = getNextRequestId();
    set({ status: 'loading', error: null, page });
    try {
      const skip = (page - 1) * PRODUCTS_PER_PAGE;
      const data = await ProductService.list(PRODUCTS_PER_PAGE, skip);
      if (requestId !== latestRequestId) return;
      set({ products: data.products, total: data.total, status: 'success', error: null });
    } catch {
      if (requestId !== latestRequestId) return;
      set({
        products: [],
        total: 0,
        status: 'error',
        error: 'Unable to load products. Please try again.',
      });
    }
  },

  searchProducts: async (query, page = 1) => {
    const requestId = getNextRequestId();
    set({ status: 'loading', error: null, page });
    try {
      const skip = (page - 1) * PRODUCTS_PER_PAGE;
      const data = await ProductService.search(query, PRODUCTS_PER_PAGE, skip);
      if (requestId !== latestRequestId) return;
      set({ products: data.products, total: data.total, status: 'success', error: null });
    } catch {
      if (requestId !== latestRequestId) return;
      set({
        products: [],
        total: 0,
        status: 'error',
        error: 'Unable to search products. Please try again.',
      });
    }
  },
}));
