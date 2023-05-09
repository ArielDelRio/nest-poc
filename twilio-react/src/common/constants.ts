export enum WorkerActivityType {
  offline,
  idle,
  busy,
  reserved,
  wrapup,
}

export const activityTypeMap: { [key: number]: string } = {
  [WorkerActivityType.offline]: 'Offline',
  [WorkerActivityType.idle]: 'Idle',
  [WorkerActivityType.busy]: 'Busy',
  [WorkerActivityType.reserved]: 'Reserved',
  [WorkerActivityType.wrapup]: 'Wrapup',
};

export interface WorkerClient {
  fetchChannels: (callback: (error: any, channels: any) => void) => void;
  update: (
    attributes: any,
    callback: (error: any, worker: any) => void,
  ) => void;
  activities: {
    fetch: (callback: (error: any, activities: any) => void) => void;
  };
  fetchReservations: (
    callback: (error: any, reservations: any) => void,
  ) => void;
}

export interface Worker {
  sid: string;
  friendlyName: string;
  accountSid: string;
  activitySid: string;
  activityName: string;
  workspaceSid: string;
  attributes: {};
  available: boolean;
}

export interface Device {
  state: 'unregistered' | 'registered' | 'registering' | 'destroyed';
  register: () => void;
  unregister: () => void;
  connect: (x: any) => Promise<Call>;
  disconnectAll: () => void;
  isBusy: boolean;
  emit: (event: string, ...args: any[]) => void;
  audio: {
    availableInputDevices: Map<string, { label: string }>;
  };
}

export interface CallError {
  causes: string[];
  code: number;
  description: string;
  explanation: string;
  message: string;
  name: string;
  originalError: string;
  solutions: string[];
}

export interface Call {
  disconnect: () => void;
  accept: () => void;
  reject: () => void;
  ignore: () => void;
  direction: 'INCOMING' | 'OUTGOING';
  status: () =>
    | 'reconnecting'
    | 'connecting'
    | 'open'
    | 'closed'
    | 'pending'
    | 'ringing';
  parameters: {
    From: string;
    CallSid: string;
    To: string;
    AccountSid: string;
  };

  customParameters: Map<string, string>;

  on: (event: string, listener: any) => void;
  sendMessage: (message: {
    content: any;
    messageType: string;
    contentType: string;
  }) => void;

  isMuted: () => boolean;
  mute: (shouldMute?: boolean) => void;
}

export type RecordingState = 'disabled' | 'ready' | 'recording' | 'paused';

export type RecordingStatus =
  | 'in-progress'
  | 'paused'
  | 'stopped'
  | 'processing'
  | 'completed'
  | 'absent';

export interface Record {
  state: RecordingState;
  url: string;
  status: RecordingStatus;
}
