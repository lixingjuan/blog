## Map语法
- 创建语法`new map(参数)`，参数可以是数组或者其他iterable对象;(如下示例)
- null 会被当作 undefined

```javascript
let first = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"]
]);

//  Map { 1 => 'one', 2 => 'two', 3 => 'three' }
```

比较键的相等的时候，认为 `NaN相等，其他行为表现同 ===`

## Map和Object对比
相同点
1. Object和Map都允许存储键值对；
不同点
1. Map的键允许是任意类型，但是Object的键只能是 字符串 或 Symbols
2. Map中的键是有序的，for...of遍历时候按照插入顺序；Object不是
3. Map可以使用size 属性判断键值对的个数；Object只能自己计算
4. Map可以直接进行迭代；Object只能Object.entries(obj)获得键值对数组后再进行迭代；
5. ？object 都有自己的原型，原型链上的键名有可能和你自己设置的键名冲突
6. Map在频繁涉及增删的场景较有优势；


## Map.prototype.entries() map.prototype.values() Map.prototype.keys()

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2]
]);
console.log(map); 
// Map { 'a' => 1, 'b' => 2 }
```


- 获取所有成员的遍历器

```javascript
map.entries();
// MapIterator {"a" => 1, "b" => 2}
```

- 获取键名的遍历器

```javascript
map.keys();
// MapIterator {"a", "b"}
```

- 获取键值的遍历器

```javascript
map.values()) 
// MapIterator {1, 2}

```


## Map的一些操作

### Map和数组合并

- Map对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。

```javascript
let first = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"]
]);
let second = new Map([
  [1, "uno"],
  [2, "dos"]
]);

// Map对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
let merged = new Map([...first, ...second, [1, "eins"]]);
console.log(merged);

// Map { 1 => 'eins', 2 => 'dos', 3 => 'three' }
```

### Map转为数组

```javascript
const map = new Map(["a", 1],["b", 2]);
```
Map 转为数组两种方法

```javascript
/* map转为数组 */
// 方法1
Array.from(map); // [ [ 'a', 1 ], [ 'b', 2 ] ]
// 方法2
[...map]; // [ [ 'a', 1 ], [ 'b', 2 ] ]

/* 得到map键数组 */
[...map.keys()]; // [ 'a', 'b' ]

/* 得到map值数组 */
[...map.values()]; // [ 1, 2 ]
```

### Map和对象互相转化

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2]
]);
const obj = { a: 22, b: 11 };
```

- Map ==> 对象 

```javascript
Object.fromEntries([...map]);  // { a: 1, b: 2 }
```

- 对象 ==> Map
  
```javascript
Object.entries(obj)   // [ [ 'a', 22 ], [ 'b', 11 ] ]
new Map(Object.entries(obj));   // Map { 'a' => 22, 'b' => 11 }
```
