import { useCallback, useEffect, RefObject } from "react";

/**
 * @useClickOutside
 * @param {RefObject<HTMLElement>} ref React ref
 * @param {() => void} handler Function to handle click outside
 * @return {void}
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void
): void {
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!ref.current) {
        return;
      }

      const target = event.target as Node;
      if (ref.current.contains(target)) {
        return;
      }

      handler();
    },
    [ref, handler]
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleClickOutside]);
}
