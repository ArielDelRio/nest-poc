import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../common/config';

type tokenType = 'taskRouter' | 'voice';

export const useFetchToken = (workerSid: string, tokenType: tokenType) => {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const urlToFetch =
    tokenType === 'taskRouter'
      ? `${config.nestHost}/task-router/agents?workerSid=${workerSid}`
      : `${config.nestHost}/voice/token/agents?workerSid=${workerSid}`;

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);

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
