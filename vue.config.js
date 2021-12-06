module.exports = {
  // 关闭ESLint的规则
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211', // 后台地址
        // pathRewrite: { '^/api': '' }, // 路径重写
      },
    },
  },
}
