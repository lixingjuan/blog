const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/app.js",

  plugins: [new HtmlWebpackPlugin()],

  externalsType: 'script',

  externals: {
    // react:  "React",
    // ⬆️ 或 ⬇️
    react: [
      'https://unpkg.com/react@17.0.2/umd/react.development.js',
      'React',
    ]
  }
};
