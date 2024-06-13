import remarkBreaks from "remark-breaks";
import type { Plugin } from "../../types";

export default function breaks(): Plugin {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remark: (processor) => processor.use<any, any>(remarkBreaks),
  };
}
