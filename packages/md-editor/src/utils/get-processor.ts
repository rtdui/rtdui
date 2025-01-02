import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified, type Processor } from "unified";
import type { ProcessorOptions } from "../types";

/**
 * Get unified processor with MdEditor plugins
 *
 * unified有一条处理器链, 通过unified.use()附加处理器, 处理器分为两大类: remark处理器, rehype处理器
 *
 * remark处理器链从remarkParse处理器进入, 它将Markdown生成语法树(mdast), 后续的remark处理器应用于mdast
 *
 * rehype处理器链从remarkRehype处理器进入, 它将mdast语法树转换到html语法树(hast), 后续的rehype处理器应用于hast
 *
 * 因此unified中的处理链如下:
 * @example
 * unified()
 *  .use(remarkParse)
 *  //...use(otherRemarks)
 *  .use(remarkRehype)
 *  //...use(otherRehypes)
 *  .use(rehypeStringify)
 *  .processSync("markdown text");
 */
export function getProcessor(options: ProcessorOptions) {
	const { sanitize, plugins = [], remarkRehypeOptions = {} } = options;
	// remark处理器链
	let processor = unified().use(remarkParse) as unknown as Processor;

	// 通过插件为解析处理器附件额外的remark处理器
	plugins.forEach(({ remark }) => {
		if (remark) {
			processor = remark(processor);
		}
	});

	// rehype处理器链
	processor = processor
		.use(remarkRehype, { allowDangerousHtml: true, ...remarkRehypeOptions })
		.use(rehypeRaw) as unknown as Processor;

	// 得到默认的消毒架构副本, 默认架构跟随GitHub风格
	let schema = { ...defaultSchema };
	// 额外的允许所有元素的class特性
	schema.attributes!["*"].push("className");

	// 如果有自定义消毒函数则调用
	if (typeof sanitize === "function") {
		schema = sanitize(schema);
	}
	// 使用特定的架构的消毒处理器
	processor = processor.use(rehypeSanitize, schema) as unknown as Processor;

	// 通过插件的方式附件其它rehype处理器
	plugins.forEach(({ rehype }) => {
		if (rehype) {
			processor = rehype(processor);
		}
	});

	// 最后rehypeStringify处理器用于将hast序列化为字符串
	return processor.use(rehypeStringify);
}
