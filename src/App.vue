<template>
  <div><router-view></router-view></div>
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
