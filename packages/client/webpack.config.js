const path = require("path");
const fixDefaultImportPlugin = require("webpack-fix-default-import-plugin");
const tsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve('../server/public/dist'),
    filename: "bundle.js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    extensions: [".js", ".ts", ".tsx", ".json", ".scss"],
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
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: true,
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new fixDefaultImportPlugin(),
  ]
};