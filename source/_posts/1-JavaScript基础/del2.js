async function a() {
  console.log(await Promise.resolve(1));
}

async function b() {
  console.log(await 2);
}

async function c() {
  console.log(3);
}

a();
b();
c();
