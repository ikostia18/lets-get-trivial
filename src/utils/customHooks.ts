import { useState } from 'react';

export function useCounter(defaultValue = 0) {
  const [counter, setCounter] = useState(defaultValue);
  const increment = () => {
    setCounter(counter + 1);
  };
  const reset = () => {
    setCounter(defaultValue);
  }
  return [counter, increment, reset] as const;
}
