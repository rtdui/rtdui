import { fakerZH_CN as faker } from "@faker-js/faker";

export interface Organization {
	id: number;
	parentId: number;
	name: string;
}
/**
 * 创建组织结构, 邻接表结构: id-parentId
 * @param id
 * @returns
 */
export const newOrganization = (id: number): Organization => {
	const pid = faker.number.int({ min: 1, max: id });
	return {
		id,
		parentId: pid === id ? 0 : pid,
		name: faker.person.fullName(),
	};
};

/**
 * 创建分成数据, 第一个参数表示第一层的数量,第二个参数表示第二层的数量, 依此类推.
 * @param lens
 * @returns
 */
export function makeOrganizationData(len: number) {
	return Array.from({ length: len }).map((d, index) => ({
		...newOrganization(index + 1),
	}));
}
