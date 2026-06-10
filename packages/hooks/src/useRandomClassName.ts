import { useId } from "react";

export function useRandomClassName() {
  // useId prefix from :r: (19.0.0) or «r» (19.1.0) to _r_ (19.2.0)
  const id = useId().replace(/_r_|:r:|«r»/gi, "");
  return `__rtd__-${id}`;
}
