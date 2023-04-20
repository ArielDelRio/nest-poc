export const MODERATOR = '+19793303975';

export const ROUTES = {
  AGENTS: {
    base: 'agents',
    CALL: {
      base: 'call',
      path: '/agents/call',
    },
    SCREEN_CALL: {
      base: 'screencall',
      path: '/agents/screencall',
    },
    HANGUP: {
      base: 'hangup',
      path: '/agents/hangup',
    },
    CONNECT_MESSAGE: {
      base: 'connectmessage',
      path: '/agents/connectmessage',
    },
  },
  EXTENSION: {
    base: 'extension',
    CONNECT: {
      base: 'connect',
      path: '/extension/connect',
    },
    RECORDING: {
      base: 'recording',
      path: '/extension/recording',
    },
  },
  IVR_SCREEN_AND_RECORDING: {
    base: 'ivr-screening-and-recording',
    WELCOME: {
      base: 'welcome',
      path: '/ivr-screening-and-recording/welcome',
    },
    MENU: {
      base: 'menu',
      path: '/ivr-screening-and-recording/menu',
    },
    screening: '/ivr-screening-and-recording/screening',
    recording: '/ivr-screening-and-recording/recording',
  },
  IVR_PHONE_TREE: {
    base: 'ivr-phone-tree',
    WELCOME: {
      base: 'welcome',
      path: '/ivr-phone-tree/welcome',
    },
    MENU: {
      base: 'menu',
      path: '/ivr-phone-tree/menu',
    },
    PLANETS: {
      base: 'planets',
      path: '/ivr-phone-tree/planets',
    },
  },
};
