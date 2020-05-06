Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

Function.method("bind2", function(context, ...args) {
  // 这里this 指向 sayName
  return () => {
    this.apply(context, args);
  };
});

const sayName = function(age) {
  console.log(this.name);
  this.age = age;
  console.log(this.age);
};
const Person = {
  name: "lixingjuan"
};

const sayPersonName = sayName.bind2(Person, 18);
const a = new sayPersonName();
