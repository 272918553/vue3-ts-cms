<template>
  <div class="search">
    <!-- 输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入查询的真实姓名"
              v-model="searchForm.realname"
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              placeholder="请输入查询的电话号码"
              v-model="searchForm.cellphone"
            /> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>

    <!-- 重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

const emit = defineEmits(['queryClick', 'resetClick'])

// 定义form的数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  //1.form中的数据全部重置
  formRef.value?.resetFields()

  //2.将事件传递出去
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  color: #000;
  padding: 20px;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
