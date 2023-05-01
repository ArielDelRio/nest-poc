import { useEffect, useMemo, useState } from 'react';
import { useFetchToken } from './hooks/useFetchToken';
import { registerTaskRouterCallbacks } from './common/utils';
import { useLoggerContext } from './contexts/LoggerContext';
import { WorkerActivityType, activityTypeMap } from './common/constants';
import { useWorkerContext } from './contexts/WorkerContext';

import './app.css';

function App() {
  const { log, logger, clearLog } = useLoggerContext();
  const { worker, setWorker } = useWorkerContext();

  const { token: workerToken } = useFetchToken(
    'WK38aa33d8bfe686463d5c280707cc0e5f',
  );

  const [workerClient, setWorkerClient] = useState(null);

  useEffect(() => {
    if (!workerToken) {
      setWorkerClient(null);
      return;
    }

    const client = new Twilio.TaskRouter.Worker(workerToken);
    registerTaskRouterCallbacks(client, { logger, setWorker });
    setWorkerClient(client);

    return () => {
      client.removeAllListeners();
    };
  }, [workerToken]);

  const activities = useMemo(() => {
    if (!workerClient) return null;

    const activitySids: any = {};
    workerClient.activities.fetch((error: any, activityList: { data: any }) => {
      activityList.data.map((activity: any) => {
        activitySids[activity.friendlyName] = activity;
      });
    });

    return activitySids;
  }, [workerClient]);

  const reservations = useMemo(() => {
    if (!workerClient) return null;
    const reservationsSids: any = {};

    workerClient.fetchReservations(
      (error: any, reservations: { data: any[] }) => {
        if (error) {
          console.log(error);
          return;
        }
        reservations.data.map((reservation: any) => {
          reservationsSids[reservation?.friendlyName] = reservation;
        });
      },
    );

    return reservationsSids;
  }, [workerClient]);

  const channels = useMemo(() => {
    if (!workerClient) return null;
    const channelsSids: any = {};
    workerClient.fetchChannels((error: any, channels: { data: any }) => {
      if (error) {
        console.log(error);
        return;
      }
      channels.data.map((channel: any) => {
        channelsSids[channel?.taskChannelUniqueName] = channel;
      });
    });

    return channelsSids;
  }, [workerClient]);

  const handleClickGoAvailable = () => {
    workerClient.update({ ActivitySid: 'WA1cd0d303c153aa7df5326a86cce60f03' });
  };

  const handleClickGoOffline = () => {
    workerClient.update({ ActivitySid: 'WAb8dcec52562ab4e745ffe7a607b8fc33' });
  };

  const AvailableButton = () => (
    <button className="change-activity" onClick={handleClickGoAvailable}>
      Go Available
    </button>
  );

  const OfflineButton = () => (
    <button className="change-activity" onClick={handleClickGoOffline}>
      Go Offline
    </button>
  );

  const ClearLogButton = () => (
    <button className="change-activity" onClick={clearLog}>
      Clear Log
    </button>
  );

  console.log({ worker, workerClient, activities, reservations, channels });

  return (
    <div className="content">
      {Object.values(activityTypeMap).map((activity) => (
        <section
          key={activity}
          style={{
            display:
              worker?.activityName?.toLowerCase() === activity
                ? 'block'
                : 'none',
          }}
          className={`agent-activity ${activity}`}
        >
          <p className="activity">{activity}</p>
          {activity === activityTypeMap[WorkerActivityType.offline] && (
            <AvailableButton />
          )}
          {activity === activityTypeMap[WorkerActivityType.idle] && (
            <OfflineButton />
          )}
          {activity === activityTypeMap[WorkerActivityType.wrapup] && (
            <>
              <AvailableButton />
              <OfflineButton />
            </>
          )}
          <ClearLogButton />
        </section>
      ))}
      <section className="log">
        <label htmlFor="log">Log</label>
        <textarea id="log" readOnly value={String(log)}></textarea>
      </section>
    </div>
  );
}

export default App;
