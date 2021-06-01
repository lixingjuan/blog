
(测试地址)[https://www.typescriptlang.org/play?#code/KYOwrgtgBAgndQN4CgpQKoAcA0qoBEB7AdxFzQBlgAzAF3KgCUBLAcwAt7kBfZZAY0IgAzrSgAhSZKgBeJHiwAuKAAYGRUsoCMDKnWUAmBiw61lAZlzcoAQ2FRBI2gG4+8OADosrgPQ+0AYEAegD8fFKSXpi+-oHBYch+GMLMIKxQtOzAUKCQtvY2UJg2AE42EMC0wCXI1GAg-LTMQlDENgA2ANYAFAAmzCXK7jAAlEi8if4AkmIlwACOYAPABSA5AB60ZVDtqdm0hEVg7e1QhGBimdmdwACewsi0t5jZ+MuNzWtyTy+E1BIRADaN1ufwyz2AYIi4gAuq4+D9Xu8mkIDLJwb9-sNgXcwYiwcM4Xw+HUGii1iV6n0Bso3nMPkIxogJsS2l1usMPHpaCNXJSQN1oR4TJxeUA]


1. 获取枚举enum的 value

```typescript
/////////////////////////////////////////////////////////////////////////////////////////////////
//                    这种可以
/////////////////////////////////////////////////////////////////////////////////////////////////

const BBBBB = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

/* 1. 获取常量枚举的key 组合 */
type TheBBBBBType = keyof typeof BBBBB
// type TheBBBBBType = "Up" | "Down" | "Left" | "Right"

/* 2. 获取常量枚举的value 组合 */
type Direction = typeof BBBBB[keyof typeof BBBBB];
// type Direction2 = 0 | 1 | 2 | 3


/////////////////////////////////////////////////////////////////////////////////////////////////
//                    这种不行不能获取值组合
/////////////////////////////////////////////////////////////////////////////////////////////////


const enum AAAAA {
  Up,
  Down,
  Left,
  Right,
}

type Direction2 = typeof AAAAA[keyof typeof AAAAA];
// type Direction2 = AAAAA



/* eg.3 */
enum AA {
  name = 1,
  age = 20,
}

type AAKeys = keyof typeof AA;  // type AAKeys = "name" | "age"
type AAValues = typeof AA[keyof typeof AA]; // 1 | 20

const a: AAKeys = 'name';
const b: AAKeys = 2;  // error: 不能将类型“20”分配给类型“"name" | "age"”
const c: AAValues = 20;
const d: AAValues = '2222'; // error: 不能将类型“"2222"”分配给类型“AAValues”
```



字符串数组转为类型

```typescript

function asLiterals<T extends string>(arr: T[]): T[] { return arr; }

const s = asLiterals(['foo', 'rolo', 'zoombaz']);
// s => ('foo' | 'rolo' | 'zoombaz')[]
type v = {[K in (typeof s)[number]]: string};
// v => { foo: string, role: string, zoombaz: string }

```