/// <reference types="vite/client" />

import TwilioSDK from 'twilio';
import { TwilioResponsePayload } from 'twilio/lib/base/Page';
import Twilio from 'twilio/lib/rest/Twilio';

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
}
