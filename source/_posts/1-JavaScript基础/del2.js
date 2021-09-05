Promise.all([
  Promise.resolve("test0"),
  Promise.reject("test1"),
  Promise.reject("test2"),
]).then((res) => {
  console.log(res);
});
