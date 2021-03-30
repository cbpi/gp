/*
 * @Author: your name
 * @Date: 2021-02-19 16:52:24
 * @LastEditTime: 2021-03-03 14:22:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\server\api.js
 */
'use strict'
const db = require('./db')
const Shares = require('../models/shares')
const express = require('express')
const router = express.Router()

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建
router.post('/api/create', (req, res) => {
  let sharesParam = new Shares({
    name: req.body.name,
    num: req.body.num,
    max: req.body.max,
    min: req.body.min,
    date: req.body.date,
    mindate: req.body.mindate
  })
  sharesParam.save((err) => {
    if (err) {
      res.send(err)
    } else {
      console.log(sharesParam)
      res.status(200).send({ code: 200, message: 'Success' })
    }
  })
})

//获取
router.get('/api/list', (req, res) => {
  Shares.find((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.status(200).send({ code: 200, data })
    }
  })
})

// 删除
router.delete('/api/deleteByid/:id', (req, res) => {
  // 查找所有人物信息的方法
  Shares.findOneAndRemove({ _id: req.params.id }, function(err, res) {
    if (err) {
      res.send(err)
    } else {
    }
  })
  res.status(200).send({ code: 200, message: 'Success' })
})

// 更新
router.post('/api/updateByid/:id', (req, res) => {
  Shares.findByIdAndUpdate(
    {
      _id: req.params.id
    },
    {
      name: req.body.name,
      num: req.body.num,
      max: req.body.max,
      min: req.body.min,
      date: req.body.date,
      mindate: req.body.mindate
    },
    {
      new: true
    },
    function(err, res) {
      if (err) {
        console.log('Error:' + err)
      } else {
        console.log('Res:' + res)
      }
    }
  )
  res.status(200).send({ code: 200, message: 'Success' })
})

module.exports = router
