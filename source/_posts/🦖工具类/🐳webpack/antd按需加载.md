## create-ract-app
1. 运行 `npm run eject`, 暴露出配置
2. 在package.json 里， 
```json
 "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "style": "css"
        }
      ]
    ]
  }
```
3. 安装 antd 和 babel-plugin-import

```bash
yarn add antd
yarn add babel-plugin-import
```

TODO:. 我这边有个疑问，我不运行 `yarn run eject`, 在根目录的 .babelrc 里面写配置为什么不行？

官方的解释，有时间试一下
- 注意样式必须加载 less 格式，一个常见的问题就是引入了多份样式，less 的样式被 css 的样式覆盖了。
  - 如果你在使用 babel-plugin-import 的 style 配置来引入样式，需要将配置值从 'css' 改为 true，这样会引入 less 文件。
  - 如果你是通过 'antd/dist/antd.css' 引入样式的，改为 antd/dist/antd.less。

## vue-cli

1. 安装babel-plugin-import `yarn add babel-plugin-import`
2. 根目录babel.config.js
```javascript
  module.exports = {
	// presets: ["@vue/app", "@vue/cli-plugin-babel/preset"],
	presets: ["@vue/app"],
	plugins: [
		[
			"import",
			{
				libraryName: "ant-design-vue",
				libraryDirectory: "es",
				style: true
			}
		],
	]
};

```

3.  根目录main.js

```javascript
import { message, notification } from "ant-design-vue";
Vue.component(Button.name, Button);
```