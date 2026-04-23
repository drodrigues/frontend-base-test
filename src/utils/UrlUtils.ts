import { appConfig } from '@/config/App';

export function withBasePath(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!appConfig.basePath) return cleanPath;
  return `${appConfig.basePath}${cleanPath}`;
}

export function buildAppUrl(path: string): string {
  if (path.startsWith('http')) return path;

  const cleanPath = withBasePath(path);
  const { basePath, siteUrl } = appConfig;

  if (typeof window !== 'undefined') {
    return `${basePath}${cleanPath}`;
  }

  if (!siteUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not defined');
  }

  return `${siteUrl}${basePath}${cleanPath}`;
}
