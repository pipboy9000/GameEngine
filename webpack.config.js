const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "js/main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  watch: true,
  devtool: "source-map",
  mode: "development"
};
