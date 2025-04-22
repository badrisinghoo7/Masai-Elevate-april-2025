import { useEffect, useState, useRef } from 'react';

const TTL = 5 * 60 * 1000;

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = async (bypassCache = false) => {
    setLoading(true);
    setError(null);

    try {
      const key = `useFetch:${url}`;
      const cached = sessionStorage.getItem(key);

      if (!bypassCache && cached) {
        const { data: cachedData, ts } = JSON.parse(cached);
        if (Date.now() - ts < TTL) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      controllerRef.current = new AbortController();
      const res = await fetch(url, { ...options, signal: controllerRef.current.signal });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();

      sessionStorage.setItem(key, JSON.stringify({ data: result, ts: Date.now() }));
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => controllerRef.current?.abort(); 
  }, [url]);

  const refetch = () => fetchData(true); 

  return { data, loading, error, refetch };
}
