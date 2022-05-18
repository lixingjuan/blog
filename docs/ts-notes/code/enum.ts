/* ****************************************************************************************************
 *                                    1
s ************************************************************************************************* */
const BBBBB = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

type TheBBBBBType = keyof typeof BBBBB;

type Direction = typeof BBBBB[keyof typeof BBBBB];

/* ****************************************************************************************************
 *                                    2
 ************************************************************************************************* */
const enum AAAAA {
  Up,
  Down,
  Left,
  Right,
}

type Direction2 = typeof AAAAA[keyof typeof AAAAA];

/* ****************************************************************************************************
 *                                    3
 ************************************************************************************************* */
enum AA {
  name = 1,
  age = 20,
}

type AAKeys = keyof typeof AA; // type AAKeys = "name" | "age"
type AAValues = typeof AA[keyof typeof AA]; // 1 | 20

const a: AAKeys = "name";
const b: AAKeys = 2; // error: 不能将类型“20”分配给类型“"name" | "age"”
const c: AAValues = 20;
const d: AAValues = "2222"; // error: 不能将类型“"2222"”分配给类型“AAValues”

// 字符串数组转为类型

function asLiterals<T extends string>(arr: T[]): T[] {
  return arr;
}

const s = asLiterals(["foo", "rolo", "zoombaz"]);
// s => ('foo' | 'rolo' | 'zoombaz')[]
type v = { [K in typeof s[number]]: string };
// v => { foo: string, role: string, zoombaz: string }
