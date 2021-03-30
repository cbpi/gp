/*
 * @Author: your name
 * @Date: 2021-02-19 16:52:33
 * @LastEditTime: 2021-03-03 14:23:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\models\peopleinfo.js
 */

// 引入mongoose模块
const mongoose = require('mongoose')

/************** 定义 股票 Schema **************/
const SharesSchema = mongoose.Schema({
  name: String,
  num: String,
  max: String,
  min: String,
  date: String,
  mindate: String
})

const Shares = mongoose.model('Shares', SharesSchema)

module.exports = Shares
