import { useId } from "react";

export function useRandomClassName() {
  const id = useId().replace(/_R_/g, "");
  return `__rtd__-${id}`;
}
