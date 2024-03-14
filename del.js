function _new(_constructor, ...args) {
  // 1. 创建一个新对象，并完成原型链接
  const target = Object.create(_constructor.prototype, ...args);

  // 2. 将新对象作为上下文环境，调用构造函数并传入参数
  const result = _constructor.apply(args);

  // 3. 如果构造函数有返回&是对象，则返回该返回内容， 否则返回新对象
  return result instanceof Object ? result : target;
}
