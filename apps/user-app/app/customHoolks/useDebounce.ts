import { useEffect, useState } from "react";

export const useDebounce = (inputVal: string, time: number) => {
  const [resultValue, setResultValue] = useState<any>();
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setResultValue(inputVal.trim());
    }, time);
    return () => clearTimeout(timeout);
  }, [inputVal]);

  return { resultValue };
};
