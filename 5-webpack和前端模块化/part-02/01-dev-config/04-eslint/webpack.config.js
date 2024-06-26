const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/app.js',

  devServer: {

    client: {
      // true, 表示有eslint 错误则直接浏览器遮罩
      overlay: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        /**
         *  !! 之前
         *  先用eslint-loader 做检查
         *  再用babel-loader 编译
         */
        // use: ['babel-loader', 'eslint-loader' ],

        /**
         *  !! 现在
         *  eslint-loader 已弃用，改用 eslint-webpack-plugin
         */

        use: ['babel-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app.html',
    }),

    new EslintWebpackPlugin(),
  ],
};
