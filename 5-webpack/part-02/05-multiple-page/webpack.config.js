const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  /* !! 为对象，会打包出 app1.js 和 app2.js 两个js文件 */
  // entry: {
  //   app1: "./src/app1.js",
  //   app2: "./src/app2.js"
  // },

  /* !! 为数组，将这两个文件打入一个包中, 顺序即为代码的顺序 */
  // entry: ["./src/app1.js", "./src/app2.js"],

  /* !! 利用dependOn 抽离公共包 */
  entry: {
    main1: {
      import: ["./src/demo1.js", "./src/demo2.js"],
      // value 指的是 自定义的包的文件名
      dependOn: 'lodash',
      filename: "chanel1/[name].js"
    },
    main2: {
      import: "./src/demo3.js",
      // value 指的是 自定义的包的文件名
      dependOn: 'lodash',
      filename: "chanel2/[name].js"
    },
    // key 可以自定义
    lodash: {
      import: "lodash",
      filename: "common/lodash"
    }
  },


  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
   },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'app1',
      template: './src/app.html',
      chunks: ['main1'],
      filename: 'chanel1/app1.html',
    }),

    new HtmlWebpackPlugin({
      title: 'app2',
      template: './src/app.html',
      chunks: ['main2'],
      filename: 'chanel1/app2.html'
    }),
  ],
};
