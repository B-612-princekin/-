const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 解决开发过程中的跨域(打包之后不能用)
  devServer: {
      proxy: "https://suggest.taobao.com/",
    },
  transpileDependencies: true,
  publicPath:'./'
})
