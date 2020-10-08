# Class相关


## ES6&ES5对比

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

## getter和setter

取值函数getter 和 存值函数setter
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

## 表达式写法

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



## class 与 this

类的方法内部如果有this, 默认指向类的实例

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(this.name);
    this.sayAge();
  }

  sayAge() {
    console.log(this.age);
  }
}
const instance1 = new Person("Tom", 15);
const instance2 = new Person("Jack", 29);


/* class 内的this指向实例 */
+ instance1.sayName();  // 'Tom'  15 
+ instance2.sayName();  // 'Jack' 29

```

若将class内的方法单独提取出来使用的话请注意，会报错
（关于使用new操作符创建构造函数实例内容详见new内页）

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
+   console.log(this);  // TODO: 这里打印是undefined, 按我理解，this应该是执行函数的调用环境的，但是阮一峰的文章讲 =>  因为class内部是严格模式, 所以这里是undefined， 去看下严格模式和this的关系 
    console.log(this.name);
  }
}
const instance1 = new Person("Tom", 15);
const { sayName } = instance1;

+ sayName();
```

解决方法1: 在构造函数中使用bind绑定this

```javascript
class Person {
  constructor(name, age) {
+   this.sayName = this.sayName.bind(this);
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(this);
    console.log(this.name);
  }
}
const instance1 = new Person("Tom", 15);
const { sayName } = instance1;

sayName();  // 'Tom'
```


解决方法2: 使用箭头函数，箭头函数总是查找作用域，this绑定的就是最近一层非箭头函数的this

这样构造函数运行的时候，箭头函数所在的运行环境即实例，则this也指向实例对象

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

+ sayName = () => {
    console.log(this.name);
  };
}
const instance1 = new Person("Tom", 15);
const { sayName } = instance1;

sayName();
```


## 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承，如果在一个方法前加上 `static` 关键字，则该方法就不会被实例继承，而是通过类来调用，这就成为 ‘静态方法’。


```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

+ sayName() {
    console.log(this.name);
  }

+ static sayAge() {
    console.log(this.age);
  }
}
const instance1 = new Person("Tom", 15);
+ instance1.sayName();  // 'Tom'
+ instance1.sayAge();   // 报错：TypeError: instance1.sayAge is not a function

+ Person.sayName();  // 非静态方法不能通过类直接调用 报错：TypeError: Person.sayName is not a function,
+ Person.sayAge();   // undefined，请注意，这里的this,指向类本身

+ Person.sayName();  // Person，静态方法可以和非静态方法重名，静态方法可以直接通过类调用
```

- 静态属性: 定义在类本身的；
- 静态方法: 类本身
- 普通属性: 
- 普通方法: 类的原型上
 

```javascript
class Person {
  static age = 18;    // 在类本身
  height = 164;       // 在类的实例上
  static sayAge() {}  // 在类本身
  sayName() {}        // 在类的原型上
}
const Jack = new Person();

Object.getOwnPropertyNames(Person);   // [ 'length', 'prototype', 'sayAge', 'name', 'age' ]
Object.getOwnPropertyNames(Person.prototype)  // [ 'constructor', 'sayName' ]
Object.getOwnPropertyNames(Jack)              // [ 'height' ]
```


静态方法虽然不会被实例继承（因为继承的本质是继承的父类原型上的方法和属性，静态方法位于父类本身，当然不会被继承）
但是会被子类继承（子类实际上就是创建了父类的副本）
非静态方法不会被继承（这个我有点迷惑，难道说，继承的时候，只拷贝了父类本身的属性，而不拷贝父类原型上的属性）

```javascript
class Person {
  sayName() {
    console.log("hello");
  }

  static sayHello() {
    console.log("hello");
  }
}
class JACK extends Person {}

JACK.sayHello();    // 'hello'
JACK.sayName();     // 报错：TypeError: JACK.sayName is not a function
```

子类也可以从super对象上调用从父类继承的静态方法，（注意：加static 只有类的静态方法才可以直接通过类调用）

```javascript
class Person {
  static sayHello() {
    console.log("hello");
  }
}
class JACK extends Person {
  static PersonSayHello() {
+   return super.sayHello();
  }
}

JACK.PersonSayHello(); // 'hello'
```

## 实例属性的新写法

实例属性除了可以定义在 `constructor()` 方法里面的 `this` 上，也可以直接定义在类的最顶层
实例属性 `state` 与 `sayHello` 的取值位于同一平级，所以不需要加this

```javascript
class Person {
+ state = 0 // 该属性位于类的实例上

  sayHello() {
    console.log("hello");
  }
}
const instance1 = new Person();

+ instance1.state; // 0
```


## 静态属性

目前只能通过在外面赋值
同静态方法一样，在前面加static生成静态属性的方法仍处于提案阶段

```javascript
class Person {
}
Person.state = 5;

Person.state    // 5
```


## new.target属性

该属性用于判断构造函数是怎么被调用的, 该属性一般用于构造函数中，返回`new`操作符作用于的那个构造函数若构造函数不是通过 `new操作符`或 `Reflect.construct()`调用的， `new.target` 内部会返回 `undefined`

class内部使用该属性，返回当前class
子类继承弗雷德时候，`new.target`返回子类

```javascript
/* 在class内部使用new.target */
class Person {
  constructor() {
    console.log(new.target);
  }
}
class Jack extends Person {}

+ const PersonInstance = new Person(); // [Function: Person]
+ const instance1 = new Jack(); // [Function: Jack]
+ console.log(instance1); // Jack {}
```

利用该特点我们可以写出不能独立使用，必须继承后才能使用的类


```javascript
class Person {
  constructor() {
+    if (new.target === Person) {
+      throw new Error("本类不能独立被调用，只能通过继承方法调用！");
+    }
  }
}
class Jack extends Person {}

const PersonInstance = new Person();  // 抛出错误
const JackInstance = new Jack();      // 正确被调用
```


在构造函数内部使用`new.target`，始终指向Person本身

```javascript
function Person() {
  console.log(new.target);
}

+ Person(); // undefined
+ const PersonInstance = new Person(); // [Function: Person]

/* 通过原型继承方法实现Person子类 */
Jack.prototype = new Person();  // [Function: Person]
new Person().constructor = Jack;  

const JackInstance = new Jack();  // [Function: Person]
```

###  class继承

class可以通过 `extends` 关键字实现继承，子类可以继承父类所有的属性和方法

```javascript
class Person {
  color = "red";
}
class Jack extends Person {
  sayColor() {
    console.log(`子类的color是${this.color}`);
  }
}

class Nancy extends Person {
+ color = "black";

  sayColor() {
    console.log(`子类的color是${this.color}`);
  }
}
const JackInstance = new Jack();
const NancyInstance = new Nancy();

+ JackInstance.sayColor();  // 子类的color是red
+ NancyInstance.sayColor(); // 子类的color是black

```

子类的实例同时是父类和子类的实例，这与ES5一致
TODO: class没有 isPrototypeOf 方法？

```javascript
class Person {
  color = "red";
}
class Jack extends Person {
  // constructor() {
  //   // super();
  //   // this.color = "black";
  // }
}

const JackInstance = new Jack();

+ JackInstance instanceof Person;   // true
+ JackInstance instanceof Jack;   // true
+ Person.isPrototypeOf(JackInstance);   // false
```

Object.getPrototypeOf()可以从子类上获取父类，可以用来判断一个类是否继承了另一个类

```javascript
Object.getPrototypeOf(Jack) === Person;  // true
```

### super

用于重塑子类的this, 如果没有显示添加，会被自动添加
 
ES5构造函数的继承，实际上，是先创建子类的实例对象的`this`, 然后将父类的方法添加到`this`上
ES6class的继承，实际上，是先将父类实例对象的方法和属性添加到`this`上面（所以必须先调用super方法），然后再用子类构造函数修改`this`

```javascript
class Jack extends Person{

}

// 等同于
class Jack extends Person{
  constructor(...args) {
    super(...args); 
  }
}
```

在constructor函数内部, 必须在调用super()之后使用this, 否则新建子类的实例会报错

```javascript
class Person {
  color = "red";
}
class Jack extends Person {
  constructor() {
    this.color = "black";
  }
}

+ const JackInstance = new Jack();  // 报错：ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

```

super既可以当作函数使用，也可以当做对象使用，这两种时候用法完全不同

**情况一**： super作为函数调用时，代表父类的构造函数。ES6要求，子类的构造函数必须执行一次super()函数
子类重的super()虽然代表的是父类，但是实际上，返回的却是子类
相当于 `Person.prototype.constructor.call(this)`

如下可证实，
`new.target` 指向的是当前正在执行的函数，可以发现，当创建子类实例的时候（super()执行），此时的`new.target` 指向的是子类的构造函数。也就是说，super()内部的this指向的是 `Jack`

```javascript
class Person {
  constructor() {
    console.log(new.target.name);
  }
}

class Jack extends Person {
  constructor() {
    super();
    this.color = "black";
  }
}

+ const PersonInstance = new Person();  // Person
+ const JackInstance = new Jack();      //  Jack
```

作为函数时，只能用在子类的构造函数中，用在其他地方就会报错

**情况二**：`super` 作为对象时，
- 在普通方法中，指向**父类的原型对象**，⚠️ 即无法通过`super`访问定义在父类实例上的方法和属性
- 在静态方法中，指向父类；

// TODO: 静态方法/静态属性是定义在类本身的，而普通方法/普通属性是定义在类的原型上的，我们使用extends 创建类的实例的时候，实际上，是先将父类实例对象的方法和属性添加到`this`上面，在用子类构造函数修改this指向自己，所以，子类是拿不到位于父类本身的属性和方法的

```javascript
/* super 普通方法中 */
class Person {
  height = "164"; // 该属性位于Person实例上

  sayAge() {      // 该属性位于Person.prototype
    return "25";
  }
  static length = "164";
}

class Jack extends Person {
+ sayAge() {      // 该属性位于Person.prototype
    return "18";
  }

+ sayHeight() {     // 访问父类实例上的属性
    console.log(super.height);
  }

+ sayPersonAge() {  // 访问父类原型上的属性
    console.log(super.sayAge());
  }
}
const JackInstance = new Jack();

+ JackInstance.sayHeight();   // undefined
+ JackInstance.sayPersonAge();  // 18

/* 在普通方法中 --- 联合this */
// ⚠️：ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
class Person {
+  hello = "我是父类";

  sayHello() {
    return this.hello;
  }
}

class Jack extends Person {
+  hello = "我是子类";

  letPersonHello() {
    console.log(super.sayHello());
  }
}
const JackInstance = new Jack();

JackInstance.letPersonHello();  // '我是子类'

```


```javascript
/* super 在静态方法中 */

class Person {
+ static age = "18";  // static 静态变量只能通过类本身调用，

  sayAge() {
    return "18";
  }
}

class Jack extends Person {
  constructor() {
    super();
  }
  static sayPersonAge() {   // 访问父类
    console.log(super.age);
  }

  static getPersonAge() { // 访问父类的原型
    console.log(super.sayAge());
  }
}

+ Jack.sayPersonAge();  // 18，说明此时的super指向的是 Person本身
+ Jack.getPersonAge();  // 报错，TypeError: (intermediate value).sayAge is not a function，因为sayAge是定义在
```


## Mixin模式的实现

Mixin指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口，他的最简单实现乳腺癌

```javascript
const a = {
  a: "a"
};
const b = {
  b: "b"
};
const c = { ...a, ...b };
```
以上代码，c对象是 a对象 和 b对象的合成，具有二者的接口

下面是一个更完备的实现，将多个类的接口’混入‘ (mix in)另一个类


```javascript
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (!["constructor", "prototype", "name"].includes(key)) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }
  return Mix;
}

```
上面的代码可以将多个对象合成一个类，使用的时候继承这个类即可

```javascript
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```






## 参考
1. [阮一峰的ES6入门 - class基本语法](https://es6.ruanyifeng.com/#docs/class)
2. [阮一峰的ES6入门 - class继承](https://es6.ruanyifeng.com/#docs/class-extends)
3. Javascript语法精粹


