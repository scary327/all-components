import React, { useEffect, useRef } from "react";

export const useWatchEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList
) => {
  const isMounted = useRef(false);

  return useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    return effect();
  }, deps);
};
