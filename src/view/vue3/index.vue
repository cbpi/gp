<template>
  <el-button type="primary" icon="el-icon-edit" @click="showVisible">新增</el-button>
  <el-table :data="state.tableData" style="width: 100%">
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
  <el-dialog :title="state.title" v-model="state.dialogTableVisible">
    <el-form label-width="100px" :model="state.formLabelAlign" ref="formLabelAlign">
      <el-form-item label="股票名称">
        <el-input v-model="state.formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="股票代码">
        <el-input v-model="state.formLabelAlign.num"></el-input>
      </el-form-item>
      <el-form-item label="2年最高值">
        <el-input v-model="state.formLabelAlign.max"></el-input>
      </el-form-item>
      <el-form-item label="最高值日期">
        <!-- <el-input v-model="formLabelAlign.date"></el-input> -->
        <el-date-picker
          v-model="state.formLabelAlign.date"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="2年最低值">
        <el-input v-model="state.formLabelAlign.min"></el-input>
      </el-form-item>
      <el-form-item label="最低值日期">
        <!-- <el-input v-model="formLabelAlign.mindate"></el-input> -->
        <el-date-picker
          v-model="state.formLabelAlign.mindate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getList, addItem, deleteById, updateById } from '@/api/api.js'
import { onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

export default {
  setup(props, context) {
    let drake = ref(null)
    const state = reactive({
      tableData: [],
      dialogTableVisible: false,
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
    })
    onMounted(() => {
      initList()
    })

    function initList() {
      getList()
        .then((result) => {
          state.tableData = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    function showVisible() {
      state.dialogTableVisible = true
      state.title = '新增'
      state.dialogTableVisible = true
    }

    function handleAdd() {
      let params = {
        name: state.formLabelAlign.name,
        num: state.formLabelAlign.num,
        max: state.formLabelAlign.max,
        min: state.formLabelAlign.min,
        date: dayjs(state.formLabelAlign.date).format('YYYY-MM-DD'),
        mindate: dayjs(state.formLabelAlign.mindate).format('YYYY-MM-DD')
      }
      addItem(params)
        .then(() => {
          ElMessage.success({
            message: '新增成功',
            type: 'success'
          })
          state.formLabelAlign.name = ''
          state.formLabelAlign.num = ''
          state.formLabelAlign.max = ''
          state.formLabelAlign.min = ''
          state.formLabelAlign.date = ''
          state.formLabelAlign.mindate = ''
          state.dialogTableVisible = false
          initList()
        })
        .catch(function(err) {
          console.log(err)
        })
    }

    function handleDelete(index, row) {
      deleteById(row._id)
        .then((result) => {
          if (result.code === 200) {
            ElMessage.success({
              message: '删除成功',
              type: 'success'
            })
            state.dialogTableVisible = false
            initList()
          } else {
            return false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    function handleEdit(index, row) {
      state.formLabelAlign.name = row.name
      state.formLabelAlign.num = row.num
      state.formLabelAlign.max = row.max
      state.formLabelAlign.min = row.min
      state.formLabelAlign.date = row.date
      state.formLabelAlign.mindate = row.mindate
      state.formLabelAlign._id = row._id
      state.title = '修改'
      state.dialogTableVisible = true
    }

    function handleUpdate() {
      let params = {
        name: state.formLabelAlign.name,
        num: state.formLabelAlign.num,
        max: state.formLabelAlign.max,
        min: state.formLabelAlign.min,
        date: dayjs(state.formLabelAlign.date).format('YYYY-MM-DD'),
        mindate: dayjs(state.formLabelAlign.mindate).format('YYYY-MM-DD')
      }
      updateById(state.formLabelAlign._id, params)
        .then((result) => {
          if (result.code === 200) {
            ElMessage.success({
              message: '修改成功',
              type: 'success'
            })
            state.dialogTableVisible = false
            initList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    function confirm() {
      if (state.title === '新增') {
        handleAdd()
      } else {
        handleUpdate()
      }
    }

    return {
      state,
      showVisible,
      handleDelete,
      handleEdit,
      handleUpdate,
      confirm
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="" scoped></style>
