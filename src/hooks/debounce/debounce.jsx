import { useEffect, useState } from "react";

export const useDenounce = (value, delay = 700) => {
  const [debonceValue, setDebonceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebonceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debonceValue;
};
