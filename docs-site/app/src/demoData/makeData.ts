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
  fullName: string; // 中文姓名
  gender: "male" | "female";
  age: number;
  birthdate: Date;
  deposit: number;
  subRows?: Person[];
}

export const newPerson = (id?: number): Person => {
  const sex = faker.person.sex() as "male" | "female";
  return {
    id: id ?? faker.string.numeric({ length: 8, allowLeadingZeros: false }),
    fullName: faker.person.fullName({ sex }),
    gender: sex,
    age: faker.number.int({ min: 25, max: 35 }),
    deposit: faker.number.float({
      max: 5000000,
      precision: 0.01,
    }),
    birthdate: faker.date.birthdate(),
  };
};

/**
 * 创建分成数据, 第一个参数表示第一层的数量,第二个参数表示第二层的数量, 依此类推.
 * @param lens
 * @returns
 */
export function makePersonData(...lens: number[]) {
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

export interface Datum {
  id?: string | number;
  int: number;
  float: number;
  stringNumber: string;
  percent: number;
  enum: string;
  boolean: boolean;
  date: Date;
  subRows?: Datum[];
}

export const newDatum = (id?: number): Datum => {
  return {
    id: id ?? faker.string.numeric({ length: 8, allowLeadingZeros: false }),
    int: faker.number.int(),
    float: faker.number.float({
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
    date: faker.date.anytime(),
  };
};

/**
 * 创建分成数据, 第一个参数表示第一层的数量,第二个参数表示第二层的数量, 依此类推.
 * @param lens
 * @returns
 */
export function makeDatumData(...lens: number[]) {
  let id = 0;
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]!;
    return Array.from({ length: len }).map(
      (d, index): Datum => ({
        ...newDatum(++id),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      })
    );
  };

  return makeDataLevel();
}
