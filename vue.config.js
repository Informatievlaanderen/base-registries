const path = require("path");

module.exports = {
  publicPath: "/",
  outputDir: "site/dist",
  assetsDir: "static",
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./site/src/main.js")
      .end();
    config.resolve.alias.set("@", path.join(__dirname, "./site/src"));
  },
  devServer: {
    contentBase: path.join(__dirname, "./site/public")
  }
};
