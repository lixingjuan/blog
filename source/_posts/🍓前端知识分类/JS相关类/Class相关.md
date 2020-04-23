# Class相关

## 基本语法

### 简介

Class是通过构造函数方法创建实例的语法糖，本质还是函数 `typeof (class Person{}) === 'function'`;
新的class写法知识让对象原型的写法更加清晰，更像面向对象编程的语法而已;

在class内部
- this关键字代表实例对象；
- constructor方法就是构造方法；


ES5 ES6写法对比

```javascript
/**
 * @des ES5
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function() {
  console.log(this.name);
};

```

```javascript
/**
 * @des ES6
 */
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {             // 定义类的方法（`sayName`）的时候，前面不需要加 `function` 关键字，也不需要逗号分隔；
    console.log(this.name);
  }
}
```

类写法的一些测试

```javascript
/* 测试 */
const Kris = new Person("Kris", 29);
Kris.sayName();             // 'Kris'

/* 测试类的类型 */
typeof Person === 'function'    // 类的数据类型是函数；

/* 测试类的原型 */
Person === Person.prototype.constructor； // 类本身就指向构造函数，ES5的  **构造函数Person** 对应ES6的 **类Person的构造方法**

/* 在类的实例上调用方法，实际上就是在调用原型上的方法 */
Kris.constructor === Person.prototype.constructor;  

```
 


ES5构造函数写法 && ES6class写法对照

- 在类的内部定义的方法实际上在定义在 `Person.prototype` 上

```javascript

/* ES6写法 */
class Person {
+ constructor() {
    // ...
  }

+ toString() {
    // ...
  }

+ sayName() {
    // ...
  }
}

// 等同于
/* ES5写法 */
function Person(){ }

Person.prototype = {
+  constructor() { },
+  toString() { },
+  sayName() { },
}
```

由于类的方法都定义在 `prototype` 对象上，所以类的新方法可以添加在 `prototype` 对象上。
可以使用 `Object.assign` 方法一次向类添加多个方法


```javascript
class Person {
  constructor() {
    // ...
  }
}

Object.assign(Person.prototype, {
  sayName() {},
  sayAge() {}
});

```


ES5 与ES6的不同：在类的内部定义的方法是不可枚举的, 但是在构造函数的原型上定义的方法是可枚举的

```javascript
/* ES6 class */
class Person {
  constructor() {
    // ...
  }
  sayName() {}
  sayAge() {}
}

+ Object.getOwnPropertyNames(Person.prototype);  // [ 'constructor', 'sayName', 'sayAge']
+ Object.keys(Person.prototype);                 // []


/* ES5 构造函数 */
function Person() {}
Person.prototype = {
  constructor() {},
  toString() {},
  sayName() {}
};

+ Object.getOwnPropertyNames(Person.prototype);   // [ 'constructor', 'toString', 'sayName' ]
+ Object.keys(Person.prototype);                  // [ 'constructor', 'toString', 'sayName' ]
```

类必须使用 `new操作符` 调用，单独调用会报错

```javascript
class Person {}
Person(); // TypeError: Class constructor Person cannot be invoked without 'new'
```

`constructor`方法
- 是类的默认方法，一个类必须有 `constructor` 方法，若未显示添加，则javascript引擎会自动为他添加一个空的`constructor`；
- 通过 `new` 操作符生成 类的实例时，自动调用该方法；
- `constructor`默认返回对象实例对象（即this）,也可以指定其返回另一个对象，这时，通过 `new` 操作符创建的类的实例对象，并非是类的实例(如下示例)
  

```javascript
/* constructor默认返回this */
class Person {}

instance1 instanceof Person;   // true
Person.prototype.isPrototypeOf(instance1);   // true


/* constructor 手动指定了一个返回对象 */
class Person {
  constructor() {
    return Object.create(null);
  }
}

instance1 instanceof Person;   // false
Person.prototype.isPrototypeOf(instance1);   // false


```

与ES5一样，类的所有实例共享同一个原型对象

```javascript
class Person {
  constructor(name) {
    this.name = name;
    this.friends = ["Tom", "Jack"];
  }

  sayName() {
    console.log(this.name);
  }
}

const instance1 = new Person("Herry");
const instance2 = new Person("Merry");


instance1.__proto__ === instance2.__proto__; // true
```

### 取值函数getter 和 存值setter

与ES5 一样，在类的内部可以使用 get 和 set 关键字，对某个函数设置存值函数和取值函数，拦截该属性的存取行为

```javascript
class Person {
  set age(value) {
    console.log("age", value);
  }

  get age() {
    return "age";
  }
}

const instance1 = new Person("Herry");

instance1.age = 25; // age 25
console.log(instance1.age); // age

```

存值函数和取值函数都是设置在属性的描述对象上的

```javascript
const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, "age");

console.log(descriptor);
// {
//   get: [Function: get age],
//   set: [Function: set age],
//   enumerable: false,
//   configurable: true
// }
```

### 表达式

类可以采用表达式的形式定义

```javascript
/* 类表达式写法 */
// 这里的 Me 仅在类内部可用，指代当前类，在外部只能使用Person 引用，使用Me则报错，
// 若内部没用的话，省略即可 ，如下
// const Person = class { 
const Person = class Me { 
  sayName() {
    return Me.name;
  }
};
const instance1 = new Person();
console.log(instance1.sayName()); // 'Me'

```

类的属性也可以采用表达式的形式定义

```javascript
/* 类的属性表达式写法 */
const methodName = "sayName";

const Person = class {
  [methodName]() {
    return "sayName";
  }
};
const instance1 = new Person();


console.log(instance1.sayName());   // "sayName"

```

## 严格模式

类和模块的内部默认严格模式
类不存在变量提升



## class的this