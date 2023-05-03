import { WorkerActivityType, activityTypeMap } from '../../common/constants';
import { useLoggerContext } from '../../contexts/LoggerContext';
import { useWorkerContext } from '../../contexts/WorkerContext';
import { LogTextarea, StatusSectionContainer } from './StatusSection.styles';

interface StatusSectionProps {
  updateWorkerActivity: (activity: WorkerActivityType) => void;
}

export const StatusSection = ({ updateWorkerActivity }: StatusSectionProps) => {
  const { log, clearLog } = useLoggerContext();
  const { worker } = useWorkerContext();

  const AvailableButton = () => (
    <button
      className="change-activity"
      onClick={() => updateWorkerActivity(WorkerActivityType.idle)}
    >
      Go Available
    </button>
  );

  const OfflineButton = () => (
    <button
      className="change-activity"
      onClick={() => updateWorkerActivity(WorkerActivityType.offline)}
    >
      Go Offline
    </button>
  );

  const ClearLogButton = () => (
    <button className="change-activity" onClick={clearLog}>
      Clear Log
    </button>
  );

  return (
    <StatusSectionContainer>
      {Object.values(activityTypeMap).map((activity) => (
        <section
          key={activity}
          style={{
            display: worker?.activityName === activity ? 'block' : 'none',
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
        <LogTextarea>{log}</LogTextarea>
      </section>
    </StatusSectionContainer>
  );
};
