const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./app.js",

  output: {
    clean: true,
  },

  devServer: {
    /* !! 指向当前服务的物理路径 */
    static: path.resolve(__dirname, "./dist"),

    /* !! 响应头 Content-Encoding: gzip， 默认compress为true */
    compress: false,

    /* 端口号 */
    port: 3000,

    /* !! 增加响应头字段 */
    headers: {
      "X-Access-Token": "hello, I'm token",
    },

    proxy: {
      "/api": "http://localhost:9000",
    },

    // 由于默认配置的自签名证书，所以浏览器会提示不安全
    // https: true,
    // http2: true,

    /**
     * 如果我们的应用是一个spa 单页面应用，当路由到 /some 时候，在浏览器刷新就会报错
     * 是因为浏览器会把该路由当作是静态资源地址去请求
     */
    // historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: "/404.html",
        },
      ],
    },
  },

  devtool: "eval-source-map",

  plugins: [new HtmlWebpackPlugin()],
};
