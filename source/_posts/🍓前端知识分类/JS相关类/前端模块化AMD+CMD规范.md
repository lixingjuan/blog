
# 前端模块化：CommonJS,AMD,CMD,ES6 Module

[TOC]

## ES6 Module

### 加载时机

- 代码编译时就引入

### 两个命令

- 导出：export
- 导入：import

### 特点

- ES6的模块非对象，import命令会被 JavaScript 引擎静态分析，
- 在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载,所以可以静态分析

### 使用方法

#### export

```JavaScript
/** 定义模块 math.js **/
const a = 1;
const b = 2;
export { a, b }

/** 引用模块 **/
import {a,b} from './math.js'

console.log(a)
console.log(b)
```

#### export default

```JavaScript
/** export default **/
//定义
const a = 1;
const b = 2;
export default { a,b };

//引用
import math from './math';
console.log(math.a) // 1
console.log(math.b) // 2

```


## ES6 模块与 CommonJS 模块的差异

### 输出

- CommonJS模块：值的拷贝
- ES6 模块：值的引用

### 加载时间

- CommonJS 模块是运行时加载，
- ES6 模块是编译时输出接口；

### 输出不同的影响

- CommonJS模块：一旦输出一个值，模块内部的变化就影响不到这个值。
- ES6 ：动态引用，不缓存值，模块里面的变量绑定其所在的模块；

### 一些理解
#### ES6 模块加载的过程
- JS引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。

#### 运行时加载和编译时加载区别
- 运行时加载：（common.js）模块就是对象，也就是在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，
- 编译时加载: (ES6) 模块不是对象，而是通过 export 命令显式指定输出的代码，import是采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块。
CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。


## CommonJS

### 加载方式
- 同步加载模块
- 在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题
- 但是在浏览器端，由于网速原因，用异步加载更合适

### 特点
- NOde.js是common.js的主要实践者

### 四个环境变量
- 四个重要的环境变量：module、exports、require、global


### module.exports使用方法

- 用module.exports定义当前模块对外输出的接口（不推荐直接用exports），
- 用require加载模块，

```javascript
- module.exports初始值是一个空对象{}
/*
* 举例1：
*/
// 定义模块math.js
// 定义：
var basicNum = 0;
function add(a, b) {
  return a + b;
}
module.exports = { 
//在这里写上需要向外暴露的函数、变量
  add: add,
  basicNum: basicNum
}

// 引用自定义的模块时，参数包含路径，可省略.js
// 引用：
var math = require('./math');
math.add(2, 5);

// 引用“核心”模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);

/*
* 举例2：
*/
module.exports = function(name, age) {
    this.name = name;
    this.age = age;
    this.about = function() {
        console.log(this.name + 'is' + this.age + '岁');
    };
};
//引用
var Rocker = require('./rocker.js');
var r = new Rocker('occy',98);
r.about();  // occy is 89 岁
```

### exports使用方法

```javascript
- exports是指向的module.exports的引用
// 定义
function handleAdd(a, b) {
  return a + b;
}
exports.handleAdd = handleAdd;

// 引用
const test = require('./components/test')

console.log(test.handleAdd(1,2))    // 3

```


### module.exports和exports区别

#### 返回值

- module.exports返回的是模块对象本身 ———— 需要new对象之后使用
- exports返回的是模块函数 —— 可以直接使用

#### 使用场景

- module.exports：若你的模块有特定的类型
- exports：若你想你的模块是一个典型的实例化对象



## AMD和require.js

### 异步加载模块
- AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行
- 所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行

### 用法举例
- 这里介绍用require.js实现AMD规范的模块化：
    - 用require.config()指定引用路径等
    - 用define()定义模块
    - 用require()加载模块
1. 首先我们需要引入require.js文件和一个入口文件main.js。main.js中配置require.config()并规定项目中用到的基础模块

```html
<!--网页中引入require.js及main.js-->
<script src="js/require.js" data-main="js/main"></script>
<script>
/** main.js 入口文件/主模块 **/
//首先用config()指定各模块路径和引用名-->
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
</script>
```

2. 引用模块的时候，我们将模块名放在[]中作为reqiure()的第一参数；如果我们定义的模块本身也依赖其他模块,那就需要将它们放在[]中作为define()的第一参数

```html
<script>
// 定义math.js模块
define(function () {
    var basicNum = 0;
    var add = function (x, y) {
        return x + y;
    };
    return {
        add: add,
        basicNum :basicNum
    };
});
// 定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})

// 引用模块，将模块放在[]内
require(['jquery', 'math'],function($, math){
  var sum = math.add(10,20);
  $("#sum").html(sum);
});
</script>
```

## CMD和sea.js

### 声明的第一时间加载
- require.js在申明依赖的模块时会在第一时间加载并执行模块内的代码

```JavaScript
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
    // 等于在最前面声明并初始化了要用到的所有模块
    if (false) {
      // 即便没用到某个模块 b，但 b 还是提前执行了
      b.foo()
    } 
});
```

### CMD与AMD区别
- AMD 推崇依赖前置、提前执行
- CMD推崇依赖就近、延迟执行。此规范其实是在sea.js推广过程中产生的

```javascript
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    } 
});

/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = function(a,b){
        return a+b;
    }
    exports.add = add;
});
// 加载模块
seajs.use(['math.js'], function(math){
    var sum = math.add(1+2);
});

```

