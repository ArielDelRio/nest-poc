import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../common/config';

type tokenType = 'taskRouter' | 'voice';

export const useFetchToken = (tokenType: tokenType) => {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      const url = new URL(window.location.href);
      const workerSid = url.searchParams.get('worker-sid');

      if (!workerSid) {
        setError(new Error('Worker SID not found'));
      }

      const urlToFetch =
        tokenType === 'taskRouter'
          ? `${config.nestHost}/task-router/agents?workerSid=${workerSid}`
          : `${config.nestHost}/voice/token/agents?workerSid=${workerSid}`;

      try {
        const response = await axios.get(urlToFetch);
        setToken(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  return { token, error, loading };
};
