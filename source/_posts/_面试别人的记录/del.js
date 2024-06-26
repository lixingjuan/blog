async function async1() {
  console.log(1);
  const res = await async2();
  console.log(2);
}

async function async2() {
  console.log(3);
}

Promise.resolve().then((resolve) => {
  console.log(4);
  setTimeout(() => {
    console.log(5);
    resolve(6);
  }, 0);
  Promise.reject();
  console.log(7);
});

setTimeout(() => {
  console.log(8);
});

async1();
console.log(9);
// 1, 3, 9, 4, 7, 2, 8, 5
// 1
3;
9;
4;
7;
2;
