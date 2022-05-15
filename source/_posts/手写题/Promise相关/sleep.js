const sleep = (delay) => new Promise((resolve, reject) => setTimeout(resolve, delay));

const demo = async function () {
  console.log(1);
  await sleep(2000);
  console.log(3);
};
demo();
