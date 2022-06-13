const { defineConfig } = require("@vue/cli-service");

const BRANCH_CONTENT = process.env.VUE_APP_BRANCH_CONTENT;

const osloBlobProxy = {
  "/assets/oslo/": {
    target: "https://raw.githubusercontent.com",
    ws: false,
    https: true,
    changeOrigin: true,
    Headers: {
      'Cache-Control': 'no-store',
    },
    pathRewrite: {
      "/assets/oslo/": `/Informatievlaanderen/data.vlaanderen.be-generated/dev/`
    }
  }
}

const proxyGithubApi = {
  "/github/": {
    target:"https://api.github.com",
    ws: false,
    https: true,
    changeOrigin: true,
    Headers: {
      'Cache-Control': 'no-store',
    },
    pathRewrite: {
      "/github/": `/orgs/Informatievlaanderen/`
    }
  }
}

const proxyWiki = {
  "/wiki/": {
    target: "https://raw.githubusercontent.com",
    ws: false,
    https: true,
    changeOrigin: true,
    Headers: {
      'Cache-Control': 'no-store',
    },
    pathRewrite: {
      "/wiki/": `/wiki/`
    }
  }
}

const proxyLocale = {
  "/assets/locales/": {
    target: "https://raw.githubusercontent.com",
    ws: false,
    https: true,
    changeOrigin: true,
    Headers: {
      'Cache-Control': 'no-store',
    },
    pathRewrite: {
      "/assets/locales/": `/Informatievlaanderen/base-registries-content/${BRANCH_CONTENT}/locales/`
    }
  },
}

const proxyApi = {
  "/basisregisters-api/v1/": {
    target: "https://api.basisregisters.vlaanderen",
    ws: false,
    https: true,
    changeOrigin: true,
    Headers: {
      'Cache-Control': 'no-store',
    },
    pathRewrite: {
      "/basisregisters-api/v1/": `/v1/`
    }
  },
}

const proxyApiV2 = {
  "/basisregisters-api/v2/": {
    target: "https://api.basisregisters.vlaanderen",
    ws: false,
    https: true,
    changeOrigin: true,
    Headers: {
      'Cache-Control': 'no-store',
    },
    pathRewrite: {
      "/basisregisters-api/v2/": `/v2/`
    }
  },
}

const proxyDocs = {
  "/docs": {
    target: "https://docs.basisregisters.vlaanderen.be",
    https: true,
    changeOrigin: true,
    Headers: {
      'Cache-Control': 'no-store',
    }
  },
}

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
    plugins: [],
  },
  devServer: {
    open: false,
    hot: true,
    liveReload: false,
    compress:false,
    https: false,
    allowedHosts: ["localhost:1235"],
    host: "localhost",
    port: 8080,
    proxy: {
      ...proxyLocale,
      ...proxyApi,
      ...proxyApiV2,
      ...proxyWiki,
      ...osloBlobProxy,
      ...proxyGithubApi,
      ...proxyDocs
    }
  }
});
