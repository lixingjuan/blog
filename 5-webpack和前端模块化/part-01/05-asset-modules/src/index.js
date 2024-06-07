import helloWorld from "./hello-world";
import imgSrc from "./assets/icon.png";
import img2Src from "./assets/carrot.svg";
import exampleTxt from "./assets/example.txt";
import img3Src from "./assets/carrot.jpg";

helloWorld();

const body = document.querySelector("body");
body.style.display = "grid";
body.style.gridTemplateColumns = "1fr 1fr";

const creatH3 = (innerText) => {
  const h3 = document.createElement("h3");
  h3.innerText = innerText;
  document.body.appendChild(h3);
};

creatH3(`type: "asset/resource" 的效果`);

const img = document.createElement("img");
img.src = imgSrc;
document.body.appendChild(img);

creatH3(`type: "asset/inline" 的效果`);

const img2 = document.createElement("img");
img2.src = img2Src;
document.body.appendChild(img2);

creatH3(`type: "asset/source", 加载txt文件 的效果`);

const block = document.createElement("div");
block.style.cssText =
  "width: 200px; height: 100px; background-color: aliceblue;";
block.textContent = exampleTxt;
document.body.appendChild(block);

creatH3(`type: "asset" 的效果`);

const img3 = document.createElement("img");
img3.src = img3Src;
document.body.appendChild(img3);
