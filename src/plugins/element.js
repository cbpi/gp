/*
 * @Author: your name
 * @Date: 2021-02-19 17:13:25
 * @LastEditTime: 2021-02-24 17:50:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\src\plugins\element.js
 */
import {
  ElDatePicker,
  ElButton,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElPopconfirm,
  ElDialog
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app.use(ElButton)
  app.use(ElTabPane)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElInputNumber)
  app.use(ElPopconfirm)
  app.use(ElDialog)
  app.use(ElDatePicker)
}
