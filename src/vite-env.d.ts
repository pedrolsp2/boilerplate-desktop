/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUSINESS_API_BASE_URL: string;
  readonly VITE_AUTH_API_BASE_URL: string;
  readonly VITE_VERSION: string;

  readonly VITE_URL_BUCKET_ARQUIVOS: string;
  readonly VITE_BUSINESS_SOCKET_BASE_URL: string;
  readonly VITE_AMBIENT: string;
  readonly VIT_APPLICATION_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
