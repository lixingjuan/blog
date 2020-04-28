## 🍓 Reflect对象
### 基本
- 定义：ES6 为了操作对象而提供的新 API，类似Proxy;
- 作用1：将Object对象的一些明显属于语言内部的方法（如Object.defineProperty），放到Reflect对象上，使用时从Reflect对象获取；
- 作用2：修改某些Object方法的返回结果，让其变得更合理，如不能修改属性时，返回false而非报错
- 作用3：让Object操作都变成函数行为；
- 作用4：不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为；

### 方法
- Reflect.ownKeys(target)：返回对象的所有属性；
- Reflect.has(target, name)：判断对象target里面是否有属性name,返回布尔值；
- Reflect.isExtensible(target):判断对象target是否可扩展,返回布尔值；？？？不是很明白扩展
- Reflect.getPrototypeOf(target)：用于读取对象的__proto__属性，若参数非对象，会报错（Object.getPrototypeOf会将这个参数转为对象，然后再运行）
- Reflect.construct(target, args)：用于调用构造函数【若参数traget非函数，会报错】
- Reflect.preventExtensions(target)：让一个对象变为不可扩展,它返回一个布尔值，表示是否操作成功
- Reflect.get(target, name, receiver)：查找并返回target对象的name属性，如果没有该属性，则返回undefined。
- Reflect.deleteProperty(obj, name)：用于删除对象ovj的name属性,它返回一个布尔值，表示是否操作成功
- Reflect.apply(target, thisArg, args)：用于绑定this对象后执行给定函数
- Reflect.setPrototypeOf(target, prototype)：用于设置目标对象的原型（prototype）
- Reflect.defineProperty(target, name, desc)：用来为对象定义属性
- Reflect.set(target, name, value, receiver)：设置target对象的name属性等于value
- Reflect.getOwnPropertyDescriptor(target, name)：用于得到指定属性的描述对象