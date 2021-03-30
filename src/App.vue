<!--
 * @Author: your name
 * @Date: 2021-02-19 15:45:50
 * @LastEditTime: 2021-03-03 16:55:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\src\App.vue
-->
<template>
  <el-button type="primary" icon="el-icon-edit" @click="showVisible">新增</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="股票名称"> </el-table-column>
    <el-table-column prop="num" label="股票代码"> </el-table-column>
    <el-table-column label="两年最高值">
      <template #default="scope">
        <span style="color: #e00000;font-weight: bold">{{ scope.row.max }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="最高值日期"> </el-table-column>
    <el-table-column label="两年最低值">
      <template #default="scope">
        <span style="color: rgb(13 165 45);font-weight: bold">{{ scope.row.min }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="mindate" label="最低值日期"> </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @confirm="handleDelete(scope.$index, scope.row)"
        >
          <template #reference>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="title" v-model="dialogTableVisible">
    <el-form label-width="100px" :model="formLabelAlign" ref="formLabelAlign">
      <el-form-item label="股票名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="股票代码">
        <el-input v-model="formLabelAlign.num"></el-input>
      </el-form-item>
      <el-form-item label="2年最高值">
        <el-input v-model="formLabelAlign.max"></el-input>
      </el-form-item>
      <el-form-item label="最高值日期">
        <!-- <el-input v-model="formLabelAlign.date"></el-input> -->
        <el-date-picker
          v-model="formLabelAlign.date"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="2年最低值">
        <el-input v-model="formLabelAlign.min"></el-input>
      </el-form-item>
      <el-form-item label="最低值日期">
        <!-- <el-input v-model="formLabelAlign.mindate"></el-input> -->
        <el-date-picker
          v-model="formLabelAlign.mindate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getList, addItem, deleteById, updateById } from '@/api/api.js'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      dialogTableVisible: false,
      tableData: [],
      formLabelAlign: {
        name: '',
        num: '',
        max: '',
        min: '',
        date: '',
        mindate: '',
        _id: ''
      },
      title: ''
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    showVisible() {
      this.title = '新增'
      this.dialogTableVisible = true
      this.$refs['formLabelAlign'].resetFields()
    },
    handleAdd() {
      let params = {
        name: this.formLabelAlign.name,
        num: this.formLabelAlign.num,
        max: this.formLabelAlign.max,
        min: this.formLabelAlign.min,
        date: dayjs(this.formLabelAlign.date).format('YYYY-MM-DD'),
        mindate: dayjs(this.formLabelAlign.mindate).format('YYYY-MM-DD')
      }
      addItem(params)
        .then(() => {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.formLabelAlign.name = ''
          this.formLabelAlign.num = ''
          this.formLabelAlign.max = ''
          this.formLabelAlign.min = ''
          this.formLabelAlign.date = ''
          this.formLabelAlign.mindate = ''
          this.dialogTableVisible = false
          this.getAll()
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    getAll() {
      getList()
        .then((result) => {
          this.tableData = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleDelete(index, row) {
      deleteById(row._id)
        .then((result) => {
          if (result.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.dialogTableVisible = false
            this.getAll()
          } else {
            return false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleEdit(index, row) {
      this.formLabelAlign.name = row.name
      this.formLabelAlign.num = row.num
      this.formLabelAlign.max = row.max
      this.formLabelAlign.min = row.min
      this.formLabelAlign.date = row.date
      this.formLabelAlign.mindate = row.mindate
      this.formLabelAlign._id = row._id
      this.title = '修改'
      this.dialogTableVisible = true
    },
    handleUpdate() {
      let params = {
        name: this.formLabelAlign.name,
        num: this.formLabelAlign.num,
        max: this.formLabelAlign.max,
        min: this.formLabelAlign.min,
        date: dayjs(this.formLabelAlign.date).format('YYYY-MM-DD'),
        mindate: dayjs(this.formLabelAlign.mindate).format('YYYY-MM-DD')
      }
      updateById(this.formLabelAlign._id, params)
        .then((result) => {
          console.log(result)
          if (result.code === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogTableVisible = false
            this.getAll()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    confirm() {
      if (this.title === '新增') {
        this.handleAdd()
      } else {
        this.handleUpdate()
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-date-editor.el-input {
  width: 100% !important;
}
</style>
