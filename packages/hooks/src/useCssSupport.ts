import { useEffect, useState } from "react";

export function useCssSupport(conditionText: string, initialValue = false) {
  const [supported, setSupported] = useState(initialValue);

  useEffect(() => {
    if ("CSS" in window) {
      setSupported(CSS.supports(conditionText));
    }
  }, [conditionText]);

  return supported;
}
