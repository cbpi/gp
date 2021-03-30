/*
 * @Author: your name
 * @Date: 2021-02-19 15:45:50
 * @LastEditTime: 2021-02-22 11:24:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import { ElMessage, ElMessageBox } from 'element-plus'
const plugins = [ElMessage, ElMessageBox]

const app = createApp(App)
installElementPlus(app)
plugins.forEach((plugin) => {
  app.use(plugin)
})
app.mount('#app')
