setTimeout(() => console.log(1), 3000);

async function async1() {
  console.log(2);
  const res = await async2();
  console.log(res);
}

async function async2() {
  setTimeout(() => console.log(3), 3000);
  return 4;
}

Promise.resolve().then(() => {
  console.log(4);
});

setTimeout(() => {
  console.log(5);
});

async1();
console.log(6);
