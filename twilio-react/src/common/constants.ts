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
  connect: (params: { to: string }) => Promise<Call>;
}

export interface Call {
  disconnect: () => void;
  accept: () => void;
  reject: () => void;
  ignore: () => void;
  direction: 'INCOMING' | 'OUTGOING';
  status: () =>
    | 'closed'
    | 'closed'
    | 'closed'
    | 'pending'
    | 'pending'
    | 'ringing';
  parameters: {
    From: string;
    CallSid: string;
    To: string;
    AccountSid: string;
  };

  on: (event: string, callback: (call: Call) => void) => void;
}
