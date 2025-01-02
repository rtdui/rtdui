/**
 * id-parentId 数据结构转换为树型层次结构
 * @param data id-parentId型的原始数据
 * @param root 想要返回的指定节点的孩子数据
 * @returns 指定节点的孩子数据.
 */
export function flatToTree(
	data: Record<string, any>[],
	root: string,
	idField = "id",
	parentIdField = "parentId",
): Record<string, any>[] {
	// 辅助对象，以数据的id作为属性名。
	const output: Record<string, any> = {};
	data.forEach((d) => {
		d.children = output[d[idField]] && output[d[idField]].children;
		output[d[idField]] = d;
		output[d[parentIdField]] ??= {};
		output[d[parentIdField]].children ??= [];
		output[d[parentIdField]].children.push(d);
	});
	return output[root]?.children ?? [];
}
