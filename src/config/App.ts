export const appConfig = {
  env: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  isClient: typeof window !== 'undefined',
  isServer: typeof window === 'undefined',
} as const;
