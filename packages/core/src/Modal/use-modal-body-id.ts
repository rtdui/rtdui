import { useEffect } from "react";
import { useModalContext } from "./context";

export function useModalBodyId() {
  const ctx = useModalContext();

  useEffect(() => {
    ctx.setBodyMounted(true);
    return () => ctx.setBodyMounted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ctx.getBodyId();
}
