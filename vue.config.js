const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  publicPath: "/",
  outputDir: "site/dist",
  assetsDir: "static",

  pages: {
    index: {
      entry: "./site/src/main.js",
      template: "site/public/index.html",
      filename: "index.html"
    }
  },

  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./site/src/main.js")
      .end();

    config.resolve.alias
      .set("@", path.join(__dirname, "./site/src"))
      .set("@vl", path.join(__dirname, "./deps/webuniversum/package"));

    const fontRule = config.module.rule('fonts');
    fontRule.uses.clear();

    fontRule
      .use("file-loader")
      .loader("file-loader")
      .tap(options => {
        const newOptions = {
          options: {
            name: "static/fonts/[name].[hash:8].[ext]".toLowerCase()
          }
        };

        return { ...options, ...newOptions };
      })
      .end();
  },

  configureWebpack: config => {
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: "site/public/",
          to: ".",
          ignore: ["index.html", ".DS_Store"]
        }
      ])
    );
  },

  devServer: {
    contentBase: path.join(__dirname, "./site/public")
  },

  pluginOptions: {
    i18n: {
      locale: "nl",
      fallbackLocale: "nl",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
