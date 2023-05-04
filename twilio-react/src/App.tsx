import { useEffect, useMemo, useState } from 'react';
import { useFetchToken } from './hooks/useFetchToken';
import { registerTaskRouterCallbacks } from './common/utils';
import { useLoggerContext } from './contexts/LoggerContext';
import {
  WorkerActivityType,
  WorkerClient,
  activityTypeMap,
} from './common/constants';
import { useWorkerContext } from './contexts/WorkerContext';
import './app.css';
import { StatusSection } from './components/StatusSection/StatusSection';
import { CallPanelSection } from './components/CallPanelSection/CallPanelSection.components';

function App() {
  const { logger } = useLoggerContext();
  const { worker, setWorker } = useWorkerContext();

  const { token: workerToken, error: fetchWorkerError } =
    useFetchToken('taskRouter');

  const [workerClient, setWorkerClient] = useState<WorkerClient | null>(null);

  useEffect(() => {
    if (!workerToken) {
      return;
    }

    const client = new window.Twilio.TaskRouter.Worker(workerToken);
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
      if (error) console.log({ error });
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
    workerClient.fetchChannels((error: any, channels: any) => {
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

  const updateWorkerActivity = (status: WorkerActivityType) => {
    workerClient?.update(
      { ActivitySid: activities[activityTypeMap[status]].sid },
      (error: any) => {
        if (error) {
          console.log(error);
          return;
        }
      },
    );
  };

  // console.log({ worker, workerClient, activities, reservations, channels });

  if (fetchWorkerError)
    return (
      <div className="center">
        <h1>Unable to fetch worker token</h1>
        <p>{fetchWorkerError.message}</p>
      </div>
    );

  if (!workerClient) return <div className="center">Loading...</div>;

  return (
    <div className="content container">
      <StatusSection updateWorkerActivity={updateWorkerActivity} />
      <CallPanelSection />
    </div>
  );
}

export default App;
