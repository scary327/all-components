import { useMemo } from "react";

type Condition<T, R> = [T, R];
type DefaultCondition<R> = () => R;

export function useWhen<T, R>(
  value: T,
  conditions: Condition<T, R>[],
  defaultCondition?: DefaultCondition<R>
): R | undefined {
  return useMemo(() => {
    for (const [conditionValue, result] of conditions) {
      if (value === conditionValue) {
        return result;
      }
    }

    return defaultCondition ? defaultCondition() : undefined;
  }, [value, conditions, defaultCondition]);
}
