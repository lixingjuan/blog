const axios = require("axios");
const fs = require("fs");

const demo = async () => {
  const { data } = await axios.get("http://127.0.0.1:7001/juejin");
  console.log(data);
  fs.writeFileSync("./source/_posts/like.md", data);
};

(async () => {
  await demo();
})();
