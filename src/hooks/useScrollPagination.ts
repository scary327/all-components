import {
  RefCallback,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

type UseScrollPaginationArgs = {
  ref?: RefObject<HTMLElement | null>;
  onComplete: () => void;
  delta?: number;
  blocked?: boolean;
  immediate?: boolean;
  inverted?: boolean;
  skipChildren?: number;
};

export const useScrollPagination = ({
  ref,
  onComplete,
  delta = 0,
  blocked,
  immediate,
  inverted,
  skipChildren,
}: UseScrollPaginationArgs) => {
  const localRef = useRef<HTMLDivElement | null>(null);
  const localBlocked = useRef(blocked);
  const localDelta = useRef(delta);
  const localSkipChildren = useRef(skipChildren);

  const checkedRef = localRef.current;

  useLayoutEffect(() => {
    localBlocked.current = blocked;
  }, [blocked]);

  useLayoutEffect(() => {
    localDelta.current = delta;
  }, [delta]);

  useLayoutEffect(() => {
    localSkipChildren.current = skipChildren;
  }, [skipChildren]);

  const check = useCallback(async () => {
    await Promise.resolve();

    if (localBlocked.current || !localRef.current) return;

    let additionalDelta = 0;
    if (localSkipChildren.current) {
      const children = localRef.current.children;

      additionalDelta = Array.from(children)
        .slice(
          inverted ? 0 : children.length - localSkipChildren.current,
          inverted ? localSkipChildren.current : children.length
        )
        .reduce((acc, item) => acc + (item as HTMLElement).offsetHeight, 0);
    }

    if (
      inverted
        ? localRef.current.scrollTop <= localDelta.current + additionalDelta
        : localRef.current.scrollTop + localRef.current.clientHeight >=
          localRef.current.scrollHeight - localDelta.current - additionalDelta
    )
      onComplete();
  }, [inverted, onComplete]);

  const setRef = useCallback<RefCallback<HTMLDivElement>>(
    (node) => {
      if (node && localRef.current !== node) {
        localRef.current = node;
        if (ref) ref.current = node;
        check();
      }
    },
    [check, ref]
  );

  useEffect(() => {
    if (!localRef.current) return;

    const element = localRef.current;

    element.addEventListener("scroll", check);

    if (immediate) check();

    return () => {
      element.removeEventListener("scroll", check);
    };
  }, [check, checkedRef, immediate]);

  return [setRef, check] as const;
};
