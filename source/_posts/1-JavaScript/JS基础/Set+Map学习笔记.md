# Set和Map

## Set 

### 性质
1. 可接受数组等具有Iterabel接口的数据类型初始化
2. 不会添加重复的元素（注：Set任务NaN等与NaN，其他判断相等的表现均于全等一致）
3. 具有add方法,用于添加元素 `new Set().add(1)   // Set(1) {1}`
4. 向Set添加元素不会发生类型转换

### 属性
1. Set.prototype.constructor: 构造函数，默认是Set函数
2. Set.prototype.size: 返回Set实例的成员总数

### 方法
1. Set.prototype.add(value): 添加某个值，返回Set结构本身；
2. Set.prototype.delete(value): 删除某个值，返回一个布尔值表示是删除成功；
3. Set.prototype.has(value): 返回一个布尔值，表示该值是否是Set成员；
4. Set.prototype.clear(vlaue): 清除所有成员，无返回值；
5. Set.prototype.keys(): set结构键值对相等；
6. Set.prototype.value(): set结构键值对相等；
7. Set.prototype.entries(): set结构键值对相等；

### 常见使用
1. 字符串去重 `[...new Set('aabbccdd')].join('')  // 'abcd'`
2. 数组去重 `[...new Set([1,1,1,2])]    // [1,2] `
3. Set转数组-扩展运算符 `[...new Set([1,2,3])]   // [1,2,3]`
4. Set转数组-Array.from `Array.from(new Set([1,2,3]))   // [1,2,3]`
5. Set结构使用数组的map,filter方法：`[...new Set([1,2,3])].filter(item=>item)`
6. 并集：`new Set([...a,...b])`
7. 交集：`new Set([...a].filter(x=>b.has(x)))`
8. 差集：`new Set([...a].filter(x=>!b.has(x)))`
9. 遍历操作中，同步改变原来的Set结构，方法1：`let set = new Set([1,2,3]); set = new Set([...set].map(val => val*2))`
10. 遍历操作中，同步改变原来的Set结构，方法2：`let set = new Set([1,2,3]); set = new Set(Array.from(set, val => val*2))`


## WeakSet

### 性质
1. 成员只能是对象；
2. 垃圾回收机制不考虑weakSet对该对象的引用；

### 属性
1. 同Set

## Map

### 性质
1. 读取未知的键返回 undefined `new Map().get()  // undefined`
2. 只有对同一个对象的引用（内存地址一样），Map结构才会认为是同一个键, 实际上['a'] 是不同的数组实例，指向不同的内存地址
  `new Map().set(['a'],666); new Map.get(['a']);  // undefined`
3. Map的set方法返回的还是Map结构返回的还是Map结构，因此可以使用链式写法
   `new Map().set('a',1).set('b',2)`

### 属性
1. size, 返回Map成员总数
2. Map.prototype.set(key, value)
3. Map.prototype.get(key, value)
4. Map.prototype.has(key): 返回布尔值，表示某个键是否在某个Map对象之中；
5. Map.prototype.delete(key): 删除某个键，返回布尔值，表示是否删除成功；
6. Map.prototype.clear(): 无返回值，清除所有成员；

### 使用
1. Map转数组 `[...new Map([1,2])]`
2. 数组转Map `new Map([1,2])`