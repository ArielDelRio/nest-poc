import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../common/config';

export const useFetchToken = (workerSid: string) => {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${config.nestHost}/task-router/agents?workerSid=${workerSid}`,
        );
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
