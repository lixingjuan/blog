const path = require("path");
// 构造函数或者类，大写命名
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const toml = require("toml");
const yaml = require("yaml");
const json5 = require("json5");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext]",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "app.html",
      inject: "body",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        /**
         * 1. 此处支持字符串/数组
         * 2. 顺序从后向前
         * 3. !! 先使用css-loader使得打包没有问题，可识别css文件
         *    再使用style-loader将css放置页面上
         */
        // use: ["style-loader", "css-loader", "less-loader"],

        /**
         * !! 使用 MiniCssExtractPlugin 中的一个loader插件替代 style-loader
         * 此时执行 npx webpack 对项目打包后，再去查看dist文件夹，会发现
         *  1. !! 多了main.css文件
         *  2. app.html 引用该文件（HtmlWebpackPlugin的功劳）
         */
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },

      {
        test: /\.(csv|tsv)$/,
        use: "csv-loader",
      },

      {
        test: /\.xml$/,
        use: "xml-loader",
      },

      {
        test: /\.toml$/,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },

      {
        test: /\.yaml$/,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },

      {
        test: /\.json5$/,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },

  optimization: {
    splitChunks: {
      // 将node_modules 中的文件都打包到一个文件中
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
