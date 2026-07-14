/** break: 仅停掉离他最近的一层循环 */
const demo1 = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 1) {
        break;
      }
      console.log("demo1", { i, j });
    }
  }
};
demo1();

/** return: 停掉所有层的循环 */
const demo2 = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 1) {
        return;
      }
      console.log("demo2", { i, j });
    }
  }
};
demo2();

/** continue: 本层本轮循环 不再执行 */
const demo3 = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 1) {
        continue;
      }
      console.log("demo3", { i, j });
    }
  }
};
demo3();
