# 共同点

1. 都可以声明类型

```ts
type AAA = {
  name: string;
  guagua: string;
};


interface BBB {
  name: string;
  guagua: string;
}

```

2. 都能作为类型使用

```ts

const objA: AAA = {
  name: "name",
  guagua: "",
};

const objB: BBB = {
  name: "name",
  guagua: "",
};
```


3. 都能被混合

```ts
type HighAAA = AAA & { age: number };
type HighBBB = BBB & { length: number };
```

4. 都能被继承

```ts
interface ExtendsAAA extends AAA {
  something: "something";
}

interface ExtendsBBB extends BBB {
  something: "something";
}

```

# VS

1. interface 的报错更简洁

```ts

interface Base {
    name: string
}

// interface
interface MergeItemInterface extends Base {
    age: number
}

type TypeMergeItem = Base & {
    age: number
}


function demo(val: MergeItemInterface){}
demo({age: 11})
// Argument of type '{ age: number; }' is not assignable to parameter of type 'MergeItemInterface'.
//  Property 'name' is missing in type '{ age: number; }' but required in type 'MergeItemInterface'




function demo2(val: TypeMergeItem){}
demo2({age: 11})
// Argument of type '{ age: number; }' is not assignable to parameter of type 'TypeMergeItem'.
// Property 'name' is missing in type '{ age: number; }' but required in type 'Base'
```


2. interface 如果是使用名称使用的，接口名称会以其原始形式出现在报错信息里, type 如果是基本类型，报错不会出现其原始名称

```ts
/* interface */
interface MergeItemInterface {
  age: number
}

type TypeMergeItem = {
  age: number
}

const a: MergeItemInterface = { age: '2' }
//                        ~~~~~~
// 不能将类型“string”分配给类型“number”。ts(2322)
// del.ts(85, 3): 所需类型来自属性 "age"，在此处的 "MergeItemInterface" 类型上声明该属性
//
// Age => 年龄
//
// (property) MergeItemInterface.age: number   <------ 这里

const b: TypeMergeItem = { age: '2' }
//                        ~~~~~~
// 不能将类型“string”分配给类型“number”。ts(2322)
// del.ts(89, 3): 所需类型来自属性 "age"，在此处的 "MergeItemType" 类型上声明该属性
//
// Age => 年龄
//
// (property) age: number   <------ 这里


/**
 * type
 */
type HHH = string;
const c: HHH = 1;
//   ~~~
//  不能将类型“number”分配给类型“string”。ts(2322)
//  const c: string
```


3. interface 可以声明合并，而type不行

4. type可以重命名基本类型


