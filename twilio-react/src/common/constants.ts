export enum WorkerActivityType {
  offline,
  idle,
  busy,
  reserved,
  wrapup,
}

export const activityTypeMap: { [key: number]: string } = {
  [WorkerActivityType.offline]: 'offline',
  [WorkerActivityType.idle]: 'idle',
  [WorkerActivityType.busy]: 'busy',
  [WorkerActivityType.reserved]: 'reserved',
  [WorkerActivityType.wrapup]: 'wrapup',
};
