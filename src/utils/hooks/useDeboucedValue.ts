import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<ValueType>(
  value: ValueType,
  delay: number,
): ValueType {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // Reset current timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
      timerRef.current = null;
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
