function Foo() {
  this.name = "bar";
}
Foo.prototype.getName = function() {
  console.log(this);
  return this.name + 1;
};
let foo = new Foo();
let getName = foo.getName;

console.log(foo.getName());
console.log(getName.call(Foo));
console.log(Foo.name);
