import { SetStateAction } from 'react';
import { LoggerType } from '../contexts/LoggerContext';
import { Call, CallError } from './constants';

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
    setCall: {
      (value: SetStateAction<Call | null>): void;
      (arg0: Call | null): void;
    };
  },
) => {
  const { logger, setCall } = updateEvents;

  device.on('registered', () => {
    logger(`${device.identity} device ready to make and receive calls!`);
  });

  device.on('accept', (call: Call) => {
    logger('Call from ' + call.parameters.From + ' accepted');
    setCall(call);
  });

  device.on('cancel', () => {
    logger('Call canceled');
    setCall(null);
  });

  device.on('disconnect', () => {
    logger('Call ended');
    setCall(null);
  });

  device.on('incoming', (call: Call) => {
    logger('Incoming call from ' + call.parameters.From, 'warning');
    setCall(call);
  });

  device.on('connect', (call: Call) => {
    logger('Successfully established call!');
    setCall(call);
  });

  device.on('error', function (error: { message: string }) {
    logger('Twilio.Device Error: ' + error.message);
  });

  device.on('messageReceived', (message: { author: string; body: string }) => {
    logger('Incoming message from ' + message.author + ': ' + message.body);
  });

  // device.on('messageSent'),
  //   (message: { to: string; body: string }) => {
  //     logger('Message sent to ' + message.to + ': ' + message.body);
  //   };

  // device.on('mute', () => {
  //   logger('Call muted');
  // });

  // device.on('reconnected', () => {
  //   logger('Twilio.Device has reconnected');
  // });

  // device.on('reconnecting'),
  //   () => {
  //     logger('Twilio.Device is reconnecting');
  //   };

  // device.on('reject', () => {
  //   logger('Call rejected');
  // });

  // device.on('volume', (inputVolume: string, outputVolume: string) => {
  //   logger('Call inputVolume is ' + inputVolume);
  //   logger('Call outputVolume is ' + outputVolume);
  // });

  // device.audio.on('deviceChange', updateAllAudioDevices.bind(device));

  // Show audio selection UI if it is supported by the browser.
  // if (device.audio.isOutputSelectionSupported) {
  //   audioSelectionDiv.classList.remove('hide');
  // }
};

export const registerCallEvents = (
  call: Call,
  updateEvents: {
    logger: LoggerType;
    setCall: {
      (value: SetStateAction<Call | null>): void;
      (arg0: Call | null): void;
    };
  },
) => {
  const { logger } = updateEvents;

  call.on('accept', (call: Call) => {
    logger(`Call accepted, status: ${call.status()}`);
    console.log({ call });
  });
  call.on('disconnect', (call: Call) => {
    logger(`Call ended, status ${call.status()}`);
    console.log({ call });
  });
  call.on('cancel', () => {
    logger(`The call has been canceled.`);
  });
  call.on('reject', (call: Call) => {
    logger(`Call rejected by ${call.parameters.From}`);
    console.log({ call });
  });
  call.on('error', (error: CallError) => {
    logger(`Call error `, 'error');
    console.log({ error });
  });
};
