"use client";

import { useCallback, useEffect, useState } from "react";

type ParamValue = string | number | boolean | null | undefined;
type ParamsUpdate = Record<string, ParamValue>;

interface UseSearchParamsReturn {
  searchParams: URLSearchParams;
  setParam: (key: string, value: ParamValue, replace?: boolean) => void;
  setParams: (params: ParamsUpdate, replace?: boolean) => void;
  removeParam: (key: string, replace?: boolean) => void;
  removeParams: (keys: string[], replace?: boolean) => void;
  clearParams: (replace?: boolean) => void;
  getParam: (key: string) => string | null;
  hasParam: (key: string) => boolean;
}

export const useCustomSearchParams = (): UseSearchParamsReturn => {
  // Состояние для отслеживания изменений URL
  const [searchParamsString, setSearchParamsString] = useState(
    () => window.location.search
  );

  // Создаем URLSearchParams из текущей строки
  const searchParams = new URLSearchParams(searchParamsString);

  // Обработчик изменений URL (например, при навигации назад/вперед)
  useEffect(() => {
    const handlePopState = () => {
      setSearchParamsString(window.location.search);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const updateURL = useCallback(
    (newParams: URLSearchParams, replace = false) => {
      const pathname = window.location.pathname;
      const newSearch = newParams.toString();
      const url = newSearch ? `${pathname}?${newSearch}` : pathname;

      if (replace) {
        window.history.replaceState({}, "", url);
      } else {
        window.history.pushState({}, "", url);
      }

      // Обновляем локальное состояние
      setSearchParamsString(newSearch);
    },
    []
  );

  const setParam = useCallback(
    (key: string, value: ParamValue, replace = false) => {
      const params = new URLSearchParams(searchParamsString);

      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      updateURL(params, replace);
    },
    [searchParamsString, updateURL]
  );

  const setParams = useCallback(
    (paramsUpdate: ParamsUpdate, replace = false) => {
      const params = new URLSearchParams(searchParamsString);

      Object.entries(paramsUpdate).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      updateURL(params, replace);
    },
    [searchParamsString, updateURL]
  );

  const removeParam = useCallback(
    (key: string, replace = false) => {
      const params = new URLSearchParams(searchParamsString);
      params.delete(key);
      updateURL(params, replace);
    },
    [searchParamsString, updateURL]
  );

  const removeParams = useCallback(
    (keys: string[], replace = false) => {
      const params = new URLSearchParams(searchParamsString);
      keys.forEach((key) => params.delete(key));
      updateURL(params, replace);
    },
    [searchParamsString, updateURL]
  );

  const clearParams = useCallback(
    (replace = false) => {
      const params = new URLSearchParams();
      updateURL(params, replace);
    },
    [updateURL]
  );

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const hasParam = useCallback(
    (key: string) => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  return {
    searchParams,
    setParam,
    setParams,
    removeParam,
    removeParams,
    clearParams,
    getParam,
    hasParam,
  };
};
