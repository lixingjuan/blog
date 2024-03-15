实现继承的方式有7中实现方案
1. 原型链继承
   1. 缺点：
      1. 子类的实例无法向父类传参
      2. 父类的引用类型值，所有实例（子类和父类）都会共享
```js
function Animal(category) {
  this.category = category
  this.colors= ['pink','green']
}
Animal.prototype.speak = function(){
  console.log("I am "+ this.category)
}

function Dog(name){
  this.name = name;
}
Dog.ptototype = new Animal()
Dog.ptototype.bark = function(){
  console.log('Woof!')
}
const dog1 = new Dog('Max')
dog1.speak()
dog1.bark()

```

2. 借用构造函数继承
   1. 实现方式：通过在子类中调用父类，解决原型链继承的两个缺点
   2. 缺点：只能继承属性，不能继承方法
```js
function Animal(category) {
  this.category = category
  this.colors= ['pink','green']
}
Animal.prototype.speak = function(){
  console.log("I am "+ this.category)
}

function Dog(name){
  Animal.call(this, 'Dog')
  this.name = name;
}
const dog1 = new Dog('Max')
dog1.speak()
dog1.bark()

```

3. 组合继承（伪经典继承）
   1. 实现方式：利用原型链继承方法，利用构造函数继承属性
   2. 缺点：父类会被调用两次：为子类指定prototype的时候；创建实例的时候
```js
function Animal(category) {
  this.category = category
  this.colors= ['pink','green']
}
Animal.prototype.speak = function(){
  console.log("I am "+ this.category)
}

function Dog(name){
  Animal.call(this, 'Dog')
  this.name = name;
}
Dog.prototype = new Animal();

const dog1 = new Dog('Max')

```
4. 原型式继承
   1. 实现方式：利用Object.create方法
   2. 缺点：无法向父类传参
```js
function Animal(category) {
  this.category = category
  this.colors= ['pink','green']
}
function Dog(name){
  this.name = name;
}
Dog.ptototype = Object.create(Animal.prototype);

```
5. 寄生式继承
   1. 实现方式，利用Object.create在子类内部完成对父类的继承 和 增强
   2. 缺点：无法向父类传参数
```js
function Animal(category) {
  this.category = category
  this.colors= ['pink','green']
}
function Dog(name){
  return Object.create(Animal.prototype, {
    color: {
      value: ['pink', 'black'],
      enumerable: true,
      writable: true,
      configurable: true,
    },
    bark: {
      value: function(){},
    }
  })
}
```
6. 组合寄生式继承
   1. 实现方式：在子类指定父类构造函数，完成属性的继承； 利用Object.create完成原型继承，由此，解决了前面的所有问题
      1. 向父类传参
      2. 父类仅执行一次
      3. 支持继承属性
      4. 支持继承方法
```js
function Animal(category) {
  this.category = category
  this.colors= ['pink','green']
}
function Dog(name){
  Animal.call(this, 'Dog')
};

Dog.prototype = Object.create(Animal);
Dog.prototype.constructor = Dog;

const dog1 = new Dog()
```
7. class 继承
```js
class Animal {
  constructor({name, category}){
    this.category = category;
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name){
    super({name, category: 'Dog'})
    this.name = name
  }
  bark(){
    console.log(this.name+': Woof!')
  }
}
const dog1 = new Dog('Max')
const dog2 = new Dog('Jell')
```
