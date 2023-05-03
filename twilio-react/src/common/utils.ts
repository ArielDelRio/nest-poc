import { SetStateAction } from 'react';
import { LoggerType } from '../contexts/LoggerContext';
import { Call } from './constants';

export const registerTaskRouterCallbacks = (
  workerClient: any,
  updateEvents: {
    logger: LoggerType;
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
  workerClient.on('attributes.update', (worker: any) => {
    logger('Worker attributes updated: ' + JSON.stringify(worker.attributes));
  });
  workerClient.on('attributes.update.update', (worker: any) => {
    logger('Worker attributes updated: ' + JSON.stringify(worker.attributes));
  });
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
  workerClient.on('reservation.rescinded', (reservation: any) => {
    logger('Reservation ' + reservation.sid + ' rescinded!');
  });
  workerClient.on('reservation.completed', (reservation: any) => {
    logger('Reservation ' + reservation.sid + ' completed!');
  });
  workerClient.on('reservation.wrapup', (reservation: any) => {
    logger('Reservation ' + reservation.sid + ' wrapup!');
  });
};

export const registerDeviceListeners = (
  device: any,
  updateEvents: {
    logger: LoggerType;
  },
) => {
  const { logger } = updateEvents;
  console.log({ device });
  device.on('registered', () => {
    logger(`${device.identity} device ready to make and receive calls!`);
  });

  device.on('error', function (error: { message: string }) {
    logger('Twilio.Device Error: ' + error.message);
  });

  device.on('incoming', (call: Call) => {
    call.accept();
  });

  // device.audio.on('deviceChange', updateAllAudioDevices.bind(device));

  // Show audio selection UI if it is supported by the browser.
  // if (device.audio.isOutputSelectionSupported) {
  //   audioSelectionDiv.classList.remove('hide');
  // }
};
