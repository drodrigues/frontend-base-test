import { apiFetch } from '@/core/HttpClient';

import type { Product, ProductsResponse } from './types';

export class ProductService {
  static async list(limit = 20, skip = 0) {
    return apiFetch<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  }

  static async search(query: string, limit = 20, skip = 0) {
    return apiFetch<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    );
  }

  static async getById(id: number) {
    return apiFetch<Product>(`/products/${id}`);
  }
}
