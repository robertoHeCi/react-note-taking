import { useEffect, useRef } from 'react';

type UseDebounceOptions = {
  delay?: number;
  onDebounce: () => void;
}

export const useDebounce = ({ delay = 1000, onDebounce }: UseDebounceOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const debouncedCallback = () => {
    clearExistingTimeout();
    timeoutRef.current = setTimeout(() => onDebounce(), delay);
  };

  useEffect(() => {
    return () => clearExistingTimeout();
  }, []);

  return { debouncedCallback };
};