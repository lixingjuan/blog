function getString() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("hello world!");
    }, 2000);
  });
}

async function helloWorld() {
  let string = await getString();
  console.log(string);
}

export default helloWorld;
