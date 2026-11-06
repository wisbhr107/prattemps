import { useEffect, useState } from 'react';

type EstatApi<T> = {
  url: string | null;
  data: T | null;
  error: number | null;
};

type ResultatApi<T> = {
  data: T | null;
  loading: boolean;
  error: number | null;
};

export function useApi<T>(url: string | null): ResultatApi<T> {
  const [resultat, setResultat] = useState<EstatApi<T>>({
    url: null,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (url === null) {
      return;
    }

    const controller = new AbortController();
    const urlPeticio = url;

    async function carregarDades() {
      try {
        const response = await fetch(urlPeticio, { signal: controller.signal });
        if (!response.ok) {
          setResultat({ url: urlPeticio, data: null, error: response.status });
          return;
        }

        const dades = (await response.json()) as T;
        setResultat({ url: urlPeticio, data: dades, error: null });
      } catch (errorCapturat: unknown) {
        if (errorCapturat instanceof DOMException && errorCapturat.name === 'AbortError') {
          return;
        }
        setResultat({ url: urlPeticio, data: null, error: 0 });
      }
    }

    void carregarDades();

    return () => {
      controller.abort();
    };
  }, [url]);

  if (url === null) {
    return { data: null, loading: false, error: null };
  }

  if (resultat.url !== url) {
    return { data: null, loading: true, error: null };
  }

  return { data: resultat.data, loading: false, error: resultat.error };
}
