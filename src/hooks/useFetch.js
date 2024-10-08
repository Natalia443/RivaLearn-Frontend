import { useEffect, useState, useCallback } from "react";

export function useFetch(fetch, param) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = param !== undefined ? await fetch(param) : await fetch();
      setData(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [fetch, param]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    setData,
    loading,
    error,
    refetch: fetchData,
  };
}
