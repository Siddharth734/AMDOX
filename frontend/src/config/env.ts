export const env = {
  apiUrl:      process.env.NEXT_PUBLIC_API_URL    ?? "http://localhost:5000/api",
  appEnv:      process.env.NEXT_PUBLIC_APP_ENV    ?? "development",
  tenantId:    process.env.NEXT_PUBLIC_TENANT_ID  ?? "GLOBAL_PROD",
  isDev:       process.env.NODE_ENV === "development",
  isProd:      process.env.NODE_ENV === "production",
} as const;
