import type { Header } from "@tanstack/react-table";
/**
 * 解决当有分组列头时数据分组出现的问题
 * @param header
 * @returns
 */
export function shouldIgnoreSticky(header: Header<unknown, unknown>) {
	const { column } = header;
	if (header.id.includes(`_${column.id}_`)) {
		const headerIds = header.id.split("_");
		const a = headerIds.slice(0, headerIds.length - 1).join("_");
		const b = header.headerGroup.headers.filter((d) => {
			const c = d.id.split("_");
			const e = c.slice(0, c.length - 1).join("_");
			if (a === e) return true;
			return false;
		});
		if (b.length > 1 && b.findIndex((d) => d.id === header.id) > 0) return true;
	}
	return false;
}
