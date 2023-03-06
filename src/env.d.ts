/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENMON_POST_ROUTE: string;
  readonly VITE_ENMON_GET_ROUTE: string;
  readonly VITE_ENMON_PUT_ROUTE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
