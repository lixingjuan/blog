/* ****************************************************************************************************
 *                                    类型守卫 - type narrow
 ************************************************************************************************* */

/**
 * 1. typeof 检查
 * ```
 * | typeof 可能返回类型有(八种) | 基本数据类型 |
 * |-----------------------------|--------------|
 * | string                      | string       |
 * | number                      | number       |
 * | bigint                      | bigint       |
 * | boolean                     | boolean      |
 * | symbol                      | symbol       |
 * | undefined                   | undefined    |
 * | object                      | object       |
 * | function                    | -            |
 * | -                           | null         |
 * ```
 * */

const demo = (val: string | number) => {
  if (typeof val === "string") {
    return val.toLocaleUpperCase();
  }
  return val;
};

/** 2. in 操作符检查复杂类型 */
type Duck = { swim: () => {} };
type Cow = { make: () => {} };

const Demo2 = (val: Duck | Cow) => {
  if ("swim" in val) {
    val.swim();
  }
  if ("make" in val) {
    val.make();
  }
};

/** 3. instanceof 类型检查 */
const Demo3 = (val: Date | number) => {
  if (val instanceof Date) {
    return val.getDate();
  }
  return val;
};

/** 4. 控制流分析，会自动合并类型 */
const Demo4 = () => {
  let x;
  x = Math.random() > 0.5;

  if (Math.random() > 0.5) {
    x = 3;
  } else {
    x = "3";
  }

  return x;
  // x: string | number
};

type Demo4Type = typeof Demo4; // Demo: () => string | number
type DemoReturn = ReturnType<typeof Demo4>; // string | number
// a: string | number

/** 5. 使用类型谓词 */
// 谓词接受表单 parameterName is Type， 此处的类型谓词 pet is Fish

interface Fish {
  swim: any;
}
interface Bird {
  fly: any;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

type IsFishType = ReturnType<typeof isFish>; // boolean
