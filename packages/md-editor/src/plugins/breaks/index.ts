import remarkBreaks from "remark-breaks";
import type { Plugin } from "../../types";

export default function breaks(): Plugin {
	return {
		remark: (processor) => processor.use<any, any>(remarkBreaks),
	};
}
