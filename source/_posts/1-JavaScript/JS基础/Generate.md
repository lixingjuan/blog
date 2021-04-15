## 💚 Generate co模块源码
### co模块
- 作用：使generate函数自动执行
- 使用方法：`var co = require('co');co(gen);`
- 返回值：返回一个promise对象，因此可以使用.then
- Thunk函数： 用于Generator 函数的自动流程管理；

## 🍓 Generator 函数的语法
### 基本
- 定义：ES6 提供的一种异步编程解决方案；
- 知识点：
    - 执行Generator 函数会返回一个遍历器对象；
    - function关键字与函数名之间有一个星号；
    - 函数体内部使用yield表达式，定义不同的内部状态；
    - 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象；
    - 调用遍历器对象的next方法，使得指针移向下一个状态；

### yield 表达式：
- 作用：暂停标志；
- 应用位置：只能用在 Generator 函数里面，其他位置报错；
- yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行；
- 若该函数没有return语句，则返回的对象的value属性值为undefined；

### 与 Iterator 接口的关系
- 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数；
- 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口 `var myIterable = {};myIterable[Symbol.iterator] = function* () {yield 1;yield 2;};`；
- next 方法的参数：用于函数开始后继续向函数体内部注入值；
- for...of循环：自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
- Generator.prototype.throw()：在函数体外抛出错误，然后在 Generator 函数体内捕获；
- Generator.prototype.return()：用于返回给定的值，同时终结遍历 Generator 函数
- next()、throw()、return() 的共同点：作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式，next()是将yield表达式替换成一个值，throw()是将yield表达式替换成一个throw语句，
