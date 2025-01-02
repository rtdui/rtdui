import remarkGemoji from "remark-gemoji";
import type { Plugin } from "../../types";

export default function gemoji(): Plugin {
	return {
		//@ts-expect-error type
		remark: (processor) => processor.use(remarkGemoji),
	};
}
