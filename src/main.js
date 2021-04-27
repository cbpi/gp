import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import installElementPlus from './plugins/element'
import { ElMessage, ElMessageBox } from 'element-plus'
const plugins = [ElMessage, ElMessageBox]

const app = createApp(App)
installElementPlus(app)
plugins.forEach((plugin) => {
  app.use(plugin)
})
app.use(router)
app.mount('#app')
