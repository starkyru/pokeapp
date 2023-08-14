import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<Callback extends (...args: any[]) => void>(
  callback: Callback,
  delay: number,
): Callback {
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      // Reset current timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
        timerRef.current = null;
      }, delay);
    },
    [delay],
  );

  useEffect(() => {
    // prevent memory leak
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedCallback as Callback;
}
