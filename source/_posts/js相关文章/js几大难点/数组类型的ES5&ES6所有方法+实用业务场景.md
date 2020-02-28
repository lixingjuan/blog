[TOC]


```javascript
let a = [{name:'bob',age:'15'},{name:'Tom',age:'30'},{name:'Alice',age:'28'}]
let b = [1,2,3]
```

# ==数组的方法们==

## 数组原生18个操作方法



```JavaScript

let b = [1,2,3]
/*
* pop()
* 从数组末尾删除一个成员
* return 被删除元素
* params 传参无用，只取出一个
*/
b.pop();	            // 3

/*
* push()
* 向数组末尾添加1+成员
* return 新数组长度
* params 要添加元素（可多个）
*/
b.push(4,5)             // 4

/*
* shift()
* 从数组头部删除一个成员
* return 被删除元素
* params 传参无用，只取出一个
*/
b.shift();	            // 3

/*
* push()
* 向数组末尾添加1+成员
* return 新数组长度
* params 要添加元素（可多个）
*/
b.push(4,5)             // 4

/*
* slice()
* 从数组中切一部分
* 不改变原数组
* return 组成的新数组
* params [开始位置，结束位置(可选，默认到结束))
*/
[1,2,3,4].slice(0,1)        //[1]

/*
* splice()
* 从数组中指定位置 删除||添加成员
* 改变原数组
* return 删除的元素组成的数组
* params (start,?delCount,...items)
*/
[1,2,3,4].splice(0,1)        //[1]

/*
* reduce() 接收两个参数
* 作用：从前往后迭代数组的所有项，然后构建一个最终返回的值
* 参数一：回调函数（累加器accumulator，数组正在处理的元素currentValue，正在处理元素的索引currentIndex，调用reduce()的数组array）
* 参数二：初始值（第一次调用callback函数时第一个参数的值，若未提供初始值，则使用数组的第一个元素）
* 
*/

[1,2,3,4].reduce((prev,cur,index,array)=>{  // 使用reduce实现数组累加
	return prev+cur;
})	                     //10

/*
* reduceRight()
* 从后往前迭代数组的所有项，然后构建一个最终返回的值
* params (前一个值，当前值,项的索引，数组对象)
*/
[1,2,3,4].reduceRight((prev,cur,index,array)=>{  // 使用reduce实现数组累加
    console.log(index);
	return prev+cur;
})	                     //2,1,0,10

/*
* every()
* 对数组中的每一项运行给定函数，每项都true返回true
* 用于查询数组中的项是否全部满足某个条件
* return true/false
* params 成员，索引，源数组
*/
[1,2,3,4,5,6].every((item,index,array)=>{
	return (item>0)
})                      // true

/*
* every()
* 对数组中的每一项运行给定函数，一项都true返回true
* 用于查询数组中的项是否有满足某个条件
* return true/false
* params 成员，索引，源数组
*/
[1,2,3,4,5,6].some((item,index,array)=>{
	return (item>5)
})                      // true

/*
* map()
* 遍历数组并执行操作
* return 执行过操作的新数组
* params 成员，索引，源数组
*/
[1,2,3,4].map((item,index,array)=>{
	return (item+4);
})

/*
* filter()
* 检查指定数组中符合条件的所有元素
* return 满足条件的成员组成新数组
* params 成员，索引，源数组
*/
[1,2,3,4].filter((item,index,array)=>{
	return item>3;      //[4]  
})

/*
* forEach()
* 用于循环访问集合以获取所需信息；
* return 无返回值
* params 函数
*/
[1,2,3,4].forEach((item)=>{
    console.log(item)
})        //[1]

/*
* indexOf()
* 检查元素在数组中的位置
* return -1/index
* params (要查找元素，开始查找索引位置(默认为0))
*/
[1,2,3].indexOf(2,0)             // 1

/*
* lastIndexOf()
* 从后向前检查元素在数组中的位置
* return -1/index
* params (要查找元素，开始查找索引位置(默认为0))
*/
[1,2,3].lastIndexOf(2,0)             // -1
[1,2,3].lastIndexOf(2,2)             // 1

/*
* reverse()
* 反转数组
* 操作原数组
* return 返回翻转后的数组
* params 无
*/
[1,2,3].reverse()       // [3,2,1]

/*
* sort()
* 数组排序
* 操作原数组
* return 返回翻转后的数组
* params ?compareFn
*/
[-3,2,-1].sort()    // [-1,-3, 2]
[-3,2,-1].sort((value1, value2)=>{ 
	if (value1 < value2) { 
		return -1; 
	} else if (value1 > value2) { 
		return 1; 
	} else { 
		return 0; 
	} 
})         // [-3, -1, 2]

/*
* join()
* 作用 将数组用指定字符拼接为字符串
* 操作原数组
* return 返回翻转后的数组
* params ?compareFn
*/
[1,2,3].join(':')       // '1:2:3'

```

## 数组ES6扩展操作

```JavaScript

/*
* Array.from() 
* 用于将类数组对象和可遍历对象转为数组
* return 新数组
* @params1 要被转换的对象
* @params2 f()对每个元素进行处理，并将处理后的值放入返回的数组
* @params3 绑定this
*/
 let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};   
Array.from(arrayLike)   // [a,b,c]
Array.from('like')   // ['l','i','k','e']
// eg4 类数组对象
Array.from({ length: 3 });  // [undefined, undefined, undefined]

/*
* Array.of()
* 作用 用于将一组值转为新数组，替代构造函数Array()
* return 组成的新数组
* 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错
*/
Array.of(1,2,3)     // [1,2,3]

/*
* ... 扩展运算符
* return 将数组转为逗号分隔的参数序列
* 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错
*/
// eg1
[...[1,2,3]]    //[1,2,3]
// eg2 将具有Iterablei接口的对象转为数组
[...'like']     // ["l", "i", "k", "e"]

/*
* includes()
* 某数组是否包含给定的值
* return true/false
* params (searchElement,?indexFrom)
*/
[1,2,3].includes(2)     //true

/*
* find() // findIndex()
* 对数组执行回调函数
* return 第一个满足条件的成员/undefined // 位置/-1
* @params1 (f(当前的值,当前的位置,原数组),)
* @params2 绑定回调函数的this
* 注 借助Object.is(NAN)可识别NAN
*/
// eg 1
[1,2,3].find((i)=>i>2)     //3
[1,2,3].findIndex((i)=>i>2)     //2
// eg 2
[NaN].find((i)=>i>NaN)     //NAN
[NaN].findIndex(i => Object.is(i, y)) //0
// eg 3
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26

/*
* copyWithin()
* 作用 将指定位置的成员复制到其他位置，覆盖原有成员
* return 新数组
* @params1 开始位置
* @params2 要复制的值
* @params3 结束位置，默认数组长度
*/
[1,2,3,4].copyWithin(2,3)   // [1,2,4,4]

/*
* fill()
* 作用 用指定值填充数组指定位置（默认整个数组）
* return 新数组
* @params value,?start,?end
* 注 若value为对象，浅拷贝
*/
[1,2,3,4].fill('a',1,2)     // [1, "a", 3, 4]

/*
* entries()
* 作用 遍历数组键值对
* @return 遍历器对象
* @params 
*/
// eg1: 使用for of循环遍历
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}           // 0 "a"   1 "b"
// eg2:使用 .next()方法手动遍历
[1,2,3].entries().next().value      // [0,1]

/*
* keys()
* 作用 遍历数组键名
* @return 遍历器对象
* @params 
*/
// eg1 使用for of循环遍历
 for (let elem of ['a', 'b'].keys()) {
  console.log(elem);
}           // 0  1
// eg2 手动调用遍历器的 .next()方法
['a','b','c'].keys().next().value     // 0

/*
* values()
* 作用 遍历数组键值对
* @return 遍历器对象
* @params 
*/
// eg1 使用for of循环遍历
for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}           // 'a'  'b'
// eg2 手动调用遍历器的 .next()方法
['a','b','c'].values().next().value       //'a'

/*
* flat()
* 作用 拉平嵌套数组
* @return 新数组
* @params ?layers  （默认为1层，可用Infinity表示所有层） 
*/
[1,2,[3,4]].flat()

/*
* flatMap()
* 作用 原数组的每个成员执行一个函数,
* @return  然后对返回值组成的数组执行flat()方法后，组成新数组返回
* @params1 callback(当前数组成员、当前数组成员的位置(从零开始),?thisArg)
* @params2 绑定this
*/
[2, 3, 4].flatMap((x) => [x, x * 2])

```

# ==数组的常规实用操作==

## 数组取交集/并集/差集


```javascript

// 实现交集
let intersect = new Set([...a].filter(item => b.has(item)));

// 实现并集
let union = new Set([...a, ...b]);

// 实现差集
let union = new Set([...a].filter(item => !b.has(item)));

```


## 浅拷贝一个将数组——————直接赋值给变量

```javascript

const a = [1,2,3]
const b = a 
b.splice(0,1)   
console.log(b)      // 打印b  [2,3]
console.log(a)      // 打印a  [2,3]

```

## 深拷贝一个数组——————两个方法

```javascript

// eg 1 ...运算符 ES6
const a = [1,2,3]
const c = [...a]
// eg2 concat ES5
const d = a.concat()
```

## 拼接两个数组——————两个方法

```javascript

// eg1 ...运算符 ES6
[...[1,2,3],...[3,4,5]]         // [1, 2, 3, 3, 4, 5]
[...new Set([...[1,2,3],...[3,4,5]])]   // [1, 2, 3, 4, 5]

// eg2 concat方法 ES5
[1,2,3].concat([3,4,5])         // [1, 2, 3, 3, 4, 5]

```

## 找数组中最大值

```javascript

// eg1 Math.max
Math.max(...arr)

// eg2 reduce()
[1,2,3,4].reduce((num1,num2)=>{
    return num1>num2?num1:num2
})
```

## 根据数组的对象成员的某个属性进行排序


```javascript
var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];
 
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
arr.sort(compare('age'))
```


## 根据索引值从数组删除一项
```javascript
/*
* Arr.splice(index,num,ele) 
* 从数组的index位置删除num个数并且插入新元素
*/
// 从a的第二个位置删除一个元素并且插入两个元素
a.splice(2,1,"Lemon","Kiwi");   // 返回的是被删除元素组成的新数组
```

## 数组去重

```JavaScript
/*
* 方法一：使用set数据类型
* [...new Set(array)]
*/
const tasks = new Set([1,2,3,4,5,5,5])
[...tasks];     // [1,2,3,4,5]
```

## 字符串去重
```JavaScript
/*
* 方法一：使用set数据类型
* [...new Set(String)].join('')
*/
[...new Set('ababbc')].join('')     // 'abc'
```

## 置空数组

`a.length = 0`

## 取出一组DOM节点的文本内容

```JavaScript
let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)
```

## 使数组每个元素等于自身或者等于false

```JavaScript
// 将数组中布尔值为false的成员转为true
Array.from([1,2,,4],n=>n||true)
```

## 返回各种数据的类型

```JavaScript

function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

```
## 将字符串转为数组，然后返回字符串的长度
```JavaScript
function countSymbols(string) {
  return Array.from(string).length;
}
```

## 数组深拷贝

```JavaScript
arrCopy = JSON.parse(JSON.stringify(arr))
```


## map和filter的返回值
## 数组重排序
