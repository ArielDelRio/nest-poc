/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEST_HOST_DEV: string;
  readonly VITE_TWILIO_ACCOUNT_SID: string;
  readonly VITE_TWILIO_AUTH_TOKEN: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Twilio: any;
  device: any;
}
