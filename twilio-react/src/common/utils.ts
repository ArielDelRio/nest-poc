import { SetStateAction } from 'react';

export const registerTaskRouterCallbacks = (
  workerClient: any,
  updateEvents: {
    logger: (value: string) => void;
    setWorker: { (value: SetStateAction<string>): void; (arg0: string): void };
  },
) => {
  const { logger, setWorker } = updateEvents;

  workerClient.on('ready', (worker: any) => {
    logger(
      `Successfully registered as: ${worker.friendlyName} \nCurrent activity is: ${worker.activityName}`,
    );
    setWorker(worker);
  });
  workerClient.on('activity.update', (worker: any) => {
    logger('Worker activity changed to: ' + worker.activityName);
    setWorker(worker);
  });
  workerClient.on('attributes.update', (worker: any) => {});
  workerClient.on('attributes.update.update', (worker: any) => {});
  workerClient.on('reservation.created', (reservation: any) => {
    logger(
      `-----\nYou have been reserved to handle a call!\nCall from: ${reservation.task.attributes.from}\nSelected language: ${reservation.task.attributes.selected_language}\n-----`,
    );
  });
  workerClient.on('reservation.accepted', (reservation: any) => {
    logger('Reservation ' + reservation.sid + ' accepted!');
  });
  workerClient.on('reservation.rejected', (reservation: any) => {
    logger('Reservation ' + reservation.sid + ' rejected!');
  });
  workerClient.on('reservation.timeout', (reservation: any) => {
    logger('Reservation ' + reservation.sid + ' timed out!');
  });
  workerClient.on('reservation.canceled', (reservation: any) => {
    logger('Reservation ' + reservation.sid + ' canceled!');
  });
  workerClient.on('reservation.rescinded', (reservation: any) => {});
  workerClient.on('reservation.completed', (reservation: any) => {});
  workerClient.on('reservation.wrapup', (reservation: any) => {});
};
