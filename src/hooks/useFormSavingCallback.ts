import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

type OptionsType = {
  debounceTimeout?: number;
  effectDelay?: number;
};

const DEFAULT_DEBOUNCE_TIMOUT = 800;
const DEFAULT_EFFECT_DELAY = 1000;

type StrictPromiseCallback<C extends (...args: any) => any> = (
  ...args: Parameters<C>
) => ReturnType<C> extends PromiseLike<unknown>
  ? ReturnType<C>
  : Promise<ReturnType<C>>;

export const useFormSavingCallback: {
  <C extends (...args: any) => any>(
    callback: C,
    options?: OptionsType
  ): readonly [save: StrictPromiseCallback<C>, processed: boolean];
  <
    C extends (...args: any) => any,
    E extends (result: Awaited<ReturnType<C>>) => void
  >(
    callback: C,
    effect: E,
    options?: OptionsType
  ): readonly [save: StrictPromiseCallback<C>, processed: boolean];
} = <R, C extends (...args: unknown[]) => R>(
  callback: C,
  effectOrOptions?: ((result: R) => void) | OptionsType,
  fallbackOptions?: OptionsType
) => {
  const [processed, setProcessed] = useState(false);

  const effect = useMemo(
    () => (typeof effectOrOptions === "function" ? effectOrOptions : null),
    [effectOrOptions]
  );

  const {
    debounceTimeout = DEFAULT_DEBOUNCE_TIMOUT,
    effectDelay = DEFAULT_EFFECT_DELAY,
  } = useMemo(
    () =>
      (typeof effectOrOptions === "function"
        ? fallbackOptions
        : effectOrOptions) || {},
    [effectOrOptions, fallbackOptions]
  );

  const callbackRef = useRef(callback);
  const effectRef = useRef(effect);
  const callbackTimer = useRef<number | undefined>(undefined);
  const effectTimer = useRef<number | undefined>(undefined);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  const save = useCallback(
    async (...args: Parameters<C>) => {
      await Promise.resolve();

      return new Promise<R>((resolve, reject) => {
        if (callbackTimer.current) clearTimeout(callbackTimer.current);
        if (effectTimer.current) clearTimeout(effectTimer.current);

        setProcessed(false);

        callbackTimer.current = window.setTimeout(async () => {
          try {
            setProcessed(true);

            callbackTimer.current = undefined;
            const result = await callbackRef.current(...args);

            if (effectRef.current) {
              if (effectTimer.current) clearTimeout(effectTimer.current);

              effectTimer.current = window.setTimeout(() => {
                effectRef.current?.(result);
              }, effectDelay);
            }

            resolve(result);
          } catch (error) {
            if (effectTimer.current) clearTimeout(effectTimer.current);

            reject(error);
          } finally {
            setProcessed(false);
          }
        }, debounceTimeout);
      });
    },
    [debounceTimeout, effectDelay]
  );

  return [save, processed] as const;
};
