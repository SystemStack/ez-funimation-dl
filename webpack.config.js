const nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    filename: "index.js",
    libraryTarget: "this",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        loader: "ts-loader"
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: [nodeExternals()],
};
