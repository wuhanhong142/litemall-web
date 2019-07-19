<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="姓名" prop="name"/>
      <el-table-column align="center" label="电话" prop="phone"/>
      <el-table-column align="center" label="邀请码" prop="code"/>
      <el-table-column align="center" label="创建时间" prop="addTime"/>
      <el-table-column align="center" label="修改时间" prop="updateTime"/>
      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleReply(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="replyFormVisible" :title="title">
      <el-form ref="replyForm" :model="replyForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input :disabled="title == '查看'" v-model="replyForm.name"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input :disabled="title == '查看'" v-model="replyForm.phone"/>
        </el-form-item>
        <el-form-item label="邀请码" prop="phone">
          <el-input :disabled="true" v-model="replyForm.phone"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyFormVisible = false">取消</el-button>
        <el-button v-if="title != '查看'" type="primary" @click="reply">确定</el-button>
      </div>
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { list, create, update, del } from '@/api/busiUser'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        phone: undefined
      },
      downloadLoading: false,
      replyForm: {
        id: '',
        name: '',
        phone: '',
        code: ''
      },
      replyFormVisible: false,
      title: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleAdd() {
      this.title = '新增'
      this.replyFormVisible = true
      this.clear()
    },
    handleReply(row) {
      this.title = '修改'
      this.replyFormVisible = true
      this.clear()
      for (const key in this.replyForm) {
        this.replyForm[key] = row[key]
      }
    },
    handleEdit(row) {
      this.title = '查看'
      this.replyFormVisible = true
      this.clear()
      for (const key in this.replyForm) {
        this.replyForm[key] = row[key]
      }
    },
    handleDel(row) {
      del({ id: row.id }).then(res => {
        this.$message.success('删除成功')
        this.handleFilter()
      })
    },
    reply() {
      if (!this.checkPhone(this.replyForm.phone)) {
        return false
      }
      this.replyForm.code = this.replyForm.phone
      if (this.title === '新增') {
        create(this.replyForm).then(res => {
          this.replyFormVisible = false
          this.handleFilter()
        }).catch(err => {
          this.$message.error(err.data.errmsg)
        })
      } else if (this.title === '修改') {
        update(this.replyForm).then(res => {
          this.replyFormVisible = false
          this.handleFilter()
        }).catch(err => {
          this.$message.error(err.data.errmsg)
        })
      }
    },
    clear() {
      this.replyForm.id = ''
      this.replyForm.name = ''
      this.replyForm.phone = ''
    },
    checkPhone(phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        this.$message.error('手机号码有误，请重填')
        return false
      }
      return true
    }
  }
}
</script>
