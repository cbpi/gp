/*
 * @Author: your name
 * @Date: 2021-02-19 16:52:24
 * @LastEditTime: 2021-02-24 17:44:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\server\db.js
 */
// 引入mongoose模块
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认生成端口号的名字，如这里会生成一个peopleinfo的库
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://localhost:27017/test')

const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed drake'))
