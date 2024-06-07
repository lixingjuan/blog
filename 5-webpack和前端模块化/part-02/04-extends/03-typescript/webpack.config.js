const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  plugins: [
    new HtmlWebpackPlugin()
  ],

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist', )
  }
};
