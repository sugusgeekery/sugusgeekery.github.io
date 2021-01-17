module.exports = {
  // 基本路径
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: "hotpick-supplier-web",
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: "index.html",
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: false,
  // 公共资源路径
  publicPath: "./",
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // Babel 显式转译列表
  transpileDependencies: [],
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  // webpack 配置
  // chainWebpack: config => {
  //   config.module
  //     .rule("css")
  //     .test(/\.css$/)
  //     .oneOf("vue")
  //     .resourceQuery(/\?vue/)
  //     .use("px2rem")
  //     .loader("px2rem-loader")
  //     .options({
  //       remUnit: 75
  //     });
  // },
  // webpack-dev-server 相关配置
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8050,
    hot: false,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: null
  },
  // 多页面配置
  pages: {
    index: {
      // page 的入口
      entry: "src/main",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "好品供应商",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  }
};
