/*
 * @Author: your name
 * @Date: 2021-02-23 15:29:45
 * @LastEditTime: 2021-03-03 14:51:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\api\api.js
 */
import request from '@/http/http.js'

/*  获取列表
 *
 */
export function getList(query) {
  return request({
    url: '/api/list',
    method: 'get',
    params: query
  })
}

/*  新增
 *
 */
export function addItem(data) {
  return request({
    url: '/api/create',
    method: 'post',
    data
  })
}

/*  删除
 *
 */
export function deleteById(id) {
  return request({
    url: `/api/deleteByid/${id}`,
    method: 'delete'
  })
}

/*  修改
 *
 */
export function updateById(id, data) {
  return request({
    url: `/api/updateByid/${id}`,
    method: 'post',
    data
  })
}
