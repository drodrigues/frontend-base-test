import { buildAppUrl } from '@/utils/UrlUtils';

export async function apiFetch<T = unknown>(path: string, options?: RequestInit): Promise<T> {
  const url = buildAppUrl(path);

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return await res.json();
}
