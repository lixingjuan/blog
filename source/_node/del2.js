// const person = {
//   name: "小红",
//   sayName: () => {
//     console.log(this);
//   }
// };
// person.sayName();

// var scope = "global scope";
// function checkscope() {
//   var scope = "local scope";
//   function f() {
//     console.log(this);
//     return scope;
//   }
//   return f();
// }
// checkscope();

function a() {
  b();
}

function b() {
  c();
}

function c() {
  // console.log(arguments.callee.caller);
  console.log(c.caller);
}
a();
