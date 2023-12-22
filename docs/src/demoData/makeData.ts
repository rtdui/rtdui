import { fakerZH_CN as faker } from "@faker-js/faker";

export interface User {
  /**
   * 用户标识
   */
  userId: number | string;
  /**
   * 登录的账号
   */
  account: string;
  /**
   * 用户姓名
   */
  userName: string;
  /**
   * 用户所在组织
   */
  orgId?: number | string;
  /**
   * 访问令牌
   */
  token?: string;
}

export interface Person {
  id?: string | number;
  integer: number;
  number: number;
  stringNumber: string;
  percent: number;
  enum: string;
  boolean: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  birthdate: Date;
  subRows?: Person[];
}

export const newPerson = (id?: number): Person => {
  const firstName = faker.person.lastName();
  const lastName = faker.person.firstName();
  const fullName = firstName + lastName;
  return {
    id: id ?? faker.string.numeric({ length: 8, allowLeadingZeros: false }),
    integer: faker.number.int(),
    number: faker.number.float({
      max: 5000000,
      precision: 0.01,
    }),
    stringNumber: faker.number
      .float({
        max: 5000000,
        precision: 0.01,
      })
      .toString(),
    percent: faker.number.float({
      min: 0,
      max: 1,
      precision: 0.0001,
    }),
    enum: faker.helpers.arrayElement(["m", "f"]),
    boolean: faker.datatype.boolean(),
    firstName,
    lastName,
    fullName,
    age: faker.number.int({ min: 12, max: 55 }),
    birthdate: faker.date.birthdate(),
  };
};

/**
 * 创建分成数据, 第一个参数表示第一层的数量,第二个参数表示第二层的数量, 依此类推.
 * @param lens
 * @returns
 */
export function makeData(...lens: number[]) {
  let id = 0;
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]!;
    return Array.from({ length: len }).map(
      (d, index): Person => ({
        ...newPerson(++id),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      })
    );
  };

  return makeDataLevel();
}
