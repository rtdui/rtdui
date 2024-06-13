import rehypeHighlight, { Options } from "rehype-highlight";
import type { Plugin } from "../../types";

export default function highlight(options: Options = {}): Plugin {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rehype: (processor) => processor.use<any, any>(rehypeHighlight, options),
    viewerEffect: ({ markdownBody }) => {
      const hlEl = markdownBody.querySelectorAll(
        'pre>code[class*="language-"]'
      ) as NodeListOf<HTMLElement>;

      hlEl.forEach((d) => {
        if (d.previousElementSibling?.matches(".md-lang-id")) {
          return;
        }
        const language =
          d.className
            .split(" ")
            .find((dd) => dd.includes("language-"))
            ?.split("-")
            .at(-1) ?? "";

        if (language && language !== "mermaid") {
          const tipEl = document.createElement("div");
          tipEl.innerText = language;
          tipEl.className =
            "md-lang-id inline-block bg-base-300 text-gray-500 px-2 -translate-x-4 -translate-y-3 rounded-ss-md rounded-ee-md";
          d.parentElement?.prepend(tipEl);
        }
      });
    },
  };
}
