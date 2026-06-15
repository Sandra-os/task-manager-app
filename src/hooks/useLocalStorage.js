import { useCallback, useEffect, useRef, useState } from 'react';

function resolveInitialValue(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

export function useLocalStorage(key, initialValue) {
  const initialValueRef = useRef(initialValue);
  const [storedValue, setStoredValue] = useState(() => resolveInitialValue(initialValueRef.current));
  const [isLoading, setIsLoading] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : resolveInitialValue(initialValueRef.current));
    } catch {
      setStoredValue(resolveInitialValue(initialValueRef.current));
      setError('Saved task data could not be loaded, so a fresh workspace is being shown.');
    } finally {
      setIsLoading(false);
      setHasHydrated(true);
    }
  }, [key]);

  // Wait for the first read before persisting so saved data is never overwritten by defaults.
  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      setError('Tasks could not be saved locally. Changes may not persist after refresh.');
    }
  }, [hasHydrated, key, storedValue]);

  const setValue = useCallback((value) => {
    setStoredValue((currentValue) =>
      typeof value === 'function' ? value(currentValue) : value,
    );
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return [storedValue, setValue, { isLoading, error, clearError }];
}
