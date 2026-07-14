const path = require("path");
// 构造函数或者类，大写命名
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    // 输入文件名
    filename: "bundle.js",
    /**
     * 输出路径, 必须是绝对路径
     * 1. __dirname, 当前文件 webpack.config.js, 所在的物理路径
     * 2. 基于__dirname, 找到 './dist'
     * */
    path: path.resolve(__dirname, "./dist"),

    // 每次打包清除上次没用的
    clean: true,

    // 生成的静态资源的名称
    assetModuleFilename: "images/[contenthash][ext]",
  },

  mode: "development",

  devtool: "inline-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      // 打包文件的入口文件所使用的模版html
      template: "index.html",
      // 打包文件的入口文件名
      filename: "app.html",
      // script标签放在html文件的body
      inject: "body",
    }),
  ],

  // 热更新
  devServer: {
    static: "./dist",
  },

  module: {
    rules: [
      {
        test: /\.png$/,
        type: "asset/resource",
        // generator配置的文件名称的优先级高于 output.assetModuleFilename
        generator: {
          filename: "images/lxj.[contenthash][ext]",
        },
      },

      {
        test: /\.svg$/,
        type: "asset/inline",
      },

      {
        test: /\.txt$/,
        type: "asset/source",
      },

      {
        test: /\.jpg$/,
        type: "asset",
        /**
         * 此类型会在 "asset/resource", 和 "asset/inline"中做选择
         * 默认情况下，
         *  若资源大雨8k, 则生成文件，
         *  小于等于8k, 则生成base64
         */
        // 解析器
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024,
          },
        },
      },
    ],
  },
};
