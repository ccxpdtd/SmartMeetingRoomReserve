
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9004', // 你的后端地址
        changeOrigin: true,
      }
    }
  }
})
