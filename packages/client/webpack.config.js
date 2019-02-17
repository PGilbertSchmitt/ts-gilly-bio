const path = require("path");
const fixDefaultImportPlugin = require("webpack-fix-default-import-plugin");
const tsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    extensions: [".js", ".ts", ".tsx", ".json"],
    plugins: [
      new tsConfigPathsPlugin()
    ]
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: "source-map-loader"
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new fixDefaultImportPlugin()
  ]
};