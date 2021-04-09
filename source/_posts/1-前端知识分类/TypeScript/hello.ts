interface StringParam {
  length: number;
}
function test<T extends StringParam>(arg: T): T {
  console.log(arg.length);
}
test(2);
