import "./app.css";
import "./input.js";

const button = document.createElement("button");
button.innerHTML = "点我增加一个方块";

button.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("square");
  document.body.appendChild(div);
});

document.body.appendChild(button);

// !! 实现js文件热替换需要这个
// ？？ react tsx文件怎么处理？
if (module.hot) {
  module.hot.accept("./input.js", () => {
    console.log("热替换的回调函数");
  });
}
