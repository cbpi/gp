/*
 * @Author: your name
 * @Date: 2021-02-22 11:14:34
 * @LastEditTime: 2021-02-22 11:32:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\vue.config.js
 */
// vue.config.js
module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  //baseUrl: '/ss/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
