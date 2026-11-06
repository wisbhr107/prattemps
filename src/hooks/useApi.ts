import { useEffect, useState } from 'react';

type EstatApi<T> = {
  data: T | null;
  loading: boolean;
  error: number | null;
};

export function useApi<T>(url: string | null): EstatApi<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  useEffect(() => {
    if (url === null) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function carregarDades() {
      setData(null);
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          setError(response.status);
          return;
        }

        const dades = (await response.json()) as T;
        setData(dades);
      } catch (errorCapturat: unknown) {
        if (errorCapturat instanceof DOMException && errorCapturat.name === 'AbortError') {
          return;
        }
        setError(0);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void carregarDades();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
