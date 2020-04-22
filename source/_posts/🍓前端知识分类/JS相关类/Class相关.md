# Class相关

## 基本语法

### 简介

Class是通过构造函数方法创建实例的语法糖，本质还是函数 `typeof (class Person{}) === 'function'`,新的class写法知识让对象原型的写法更加清晰，更像面向对象编程的语法而已

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
Person === Person.prototype.constructor; // true

const Kris = new Person("Kris", 29);
Kris.sayName();             // 'Kris'


typeof Person === 'function'    // 类的数据类型是函数；
Kris.constructor === Person.prototype.constructor;  // 在类的实例上调用方法，实际上就是在调用原型上的方法
Person === Person.prototype.constructor； // 类本身就指向构造函数，ES5的  **构造函数Person** 对应ES6的 **类Person的构造方法**
// 
```
 
在class内部
- this关键字代表实例对象；
- constructor方法就是构造方法；


ES5构造函数写法 && ES6class写法对照

- 在类的内部定义的方法实际上在定义在 `Person` 的 `prototype` 上

```javascript

/* ES6写法 */
class Person {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  sayName() {
    // ...
  }
}

// 等同于
/* ES5写法 */
function Person(){ }

Person.prototype = {
  constructor() { },
  toString() { },
  sayName() { },
}
```

由于类的方法都定义在 `prototype` 对象上，所以类的新方法可以添加在 `prototype` 对象上。Object.assign方法可以很方便的一次向类添加多个方法


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


在类的内部定义的方法是不可枚举的

```javascript
/* ES6 class */
class Person {
  constructor() {
    // ...
  }
  sayName() {}

  sayAge() {}
}
Object.getOwnPropertyNames(Person.prototype);  // [ 'constructor', 'sayName', 'sayAge']
Object.keys(Person.prototype);                 // []


/* ES5 构造函数 */
function Person() {}

Person.prototype = {
  constructor() {},
  toString() {},
  sayName() {}
};
Object.getOwnPropertyNames(Person.prototype);   // [ 'constructor', 'toString', 'sayName' ]
Object.keys(Person.prototype);                  // [ 'constructor', 'toString', 'sayName' ]
```

类必须使用 new操作符调用，单独调用会报错

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

