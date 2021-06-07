## 浏览器渲染react

html

```html
<body>
  <h2>我收藏的文章</h2>
  <div id="app"></div>
</body>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="../babel/likes.js"></script>
```

开启babel

```bash
npx babel --watch react --out-dir ./babel --presets react-app/prod
```

reace/likes.js

```js
"use strict";

const e = React.createElement;

class ReactButton extends React.Component {
  state = { liked: false, juejinList: [] };

  componentDidMount() {
    this.handleQuery();
  }

  handleQuery = () => {
    const param = {
      key_word: "vue",
      id_type: 0,
      cursor: "0",
      limit: 20,
      search_type: 0
    };

    axios.post("http://localhost:4001/", param).then(res => {
      this.setState({ juejinList: res.data });
    });
  };

  render() {
    if (this.state.liked) {
      return "我被点击";
    }

    return (
      <div>
        {/* <button onClick={this.handleQuery}>点我</button> */}
        <h2>掘金收藏</h2>
        <ul>
          {this.state.juejinList.map(it => (
            <li>
              <a href="it.url">{it.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const domContainer = document.querySelector("#app");
ReactDOM.render(e(ReactButton), domContainer);

```



## 快速搭建服务器
```js
/* 提供接口,用于查询掘金/git/公众号 等我收集的文章，fs写入本地 */

const Koa = require("koa");
const axios = require("axios");
let ejs = require("ejs"),
  people = ["geddy", "neil", "alex"],
  html = ejs.render('<%= people.join(", "); %>', { people: people });
console.log(html);

const app = new Koa();

app.use(async ctx => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", false);
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set(
    "Access-Control-Allow-Headers",
    "x-requested-with, accept, origin, content-type"
  );

  const searchUrl = "https://apinew.juejin.im/search_api/v1/search";
  const { data } = await axios.post(`${searchUrl}`, {
    key_word: "vue",
    id_type: 0,
    cursor: "0",
    limit: 20,
    search_type: 0
  });

  const articleList = data.data
    .map(it => {
      const { result_model } = it;
      const { article_info } = result_model;
      if (article_info) {
        const { title, link_url } = article_info;
        return { title, url: link_url };
      }
      return "";
    })
    .filter(it => it);

  let template = ejs.compile(str, options);
  template(data);
  // => 输出渲染后的 HTML 字符串

  ejs.render(str, data, options);
  // => 输出渲染后的 HTML 字符串

  ejs.renderFile(filename, data, options, function(err, str) {
    // str => 输出渲染后的 HTML 字符串
  });

  ctx.body = articleList;
});

app.listen(4001);

```