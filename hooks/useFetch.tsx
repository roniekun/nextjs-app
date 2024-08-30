import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UseFetchResult<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

const useFetch = <T,>(
  url: string,
  options: AxiosRequestConfig = {}
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<T>(url, options);
        setData(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
