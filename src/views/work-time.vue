<template>
  <div class="users-page">
    <el-card>
      <el-form ref="searchForm" :rules="{}" :model="searchForm" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="规则编号:">
              <el-input v-model="searchForm.id" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="使用状态:">
              <el-select v-model="searchForm.email" placeholder="请选择">
                <el-option :value="0">关闭</el-option>
                <el-option :value="1">运行中</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" v-show="expanded">
            <el-form-item label="调用次数:">
              <el-input v-model="searchForm.id" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" v-show="expanded">
            <el-form-item label="更新日期">
              <el-input v-model="searchForm.id" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-button type="primary" @click="onBtnSearch">查询</el-button>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="text" @click="expanded = !expanded">{{expanded ? '收起' : '展开'}}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary">
        <i class="el-icon-plus" /> 新建</el-button>
      <el-button>批量操作</el-button>
      <el-dropdown>
        <el-button>更多操作</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>删除</el-dropdown-item>
          <el-dropdown-item>批量审阅</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-alert title="" type="info" :closable="false" show-icon>
        <div>
          <span>已选择 8 项 服务调用总计 2817 万</span>
          <el-button type="text">清空</el-button>
        </div>
      </el-alert>
      <StandardTable :tableData="users" :total="total">
        <el-table-column width="50" type="selection"></el-table-column>
        <el-table-column label="工号" prop="worker.id"></el-table-column>
        <el-table-column label="姓名" prop="worker.name"></el-table-column>
        <el-table-column label="工时" prop="workingTime"></el-table-column>
        <el-table-column label="工厂" prop="worker.factory.name"></el-table-column>
        <el-table-column label="电子标签" prop="worker.eleTag.id"></el-table-column>
        <el-table-column label="部门" prop="worker.department.name"></el-table-column>
        <el-table-column label="产线" prop="worker.productionLine.name"></el-table-column>
        <el-table-column label="班组" prop="worker.classesTeam.name"></el-table-column>
        <el-table-column label="岗位属性" prop="worker.property"></el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">配置</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">订阅警报</el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </StandardTable>
    </el-card>
  </div>
</template>

<script>
import StandardTable from '@/components/StandardTable'
import { getList } from '@/api/work-time'

export default {
  name: 'WorkingTime',
  components: { StandardTable },
  data() {
    return {
      searchForm: {
        id: '',
        email: ''
      },
      users: [],
      total: 0,
      expanded: false
    }
  },
  methods: {
    resetQuery() {
      this.$refs.searchForm.resetFields()
    },
    onBtnSearch() {
      this.$router.push({
        query: {
          ...this.$route.query,
          q: JSON.stringify(this.searchForm)
        }
      })
    },
    loadData({ current, size, query }) {
      getList({
        current,
        rowCount: size,
        query,
        'sort[workerId]': 'desc',
        'searchPhrase[statisticalDate]': '2017-12-01 14:32:02'
      }).then(res => {
        this.users = res.rows
        this.total = res.total
      })
    }
  },
  mounted() {
    const current = parseInt(this.$route.query.current, 10) || 0
    const size = parseInt(this.$route.query.size, 10) || 10
    const query = this.$route.query.q || ''
    this.loadData({ current, size, query })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    const current =
      parseInt(to.query.current, 10) || parseInt(from.query.current, 10) || 0
    const size =
      parseInt(to.query.size, 10) || parseInt(from.query.size, 10) || 10
    const query = to.query.q || from.query.q || ''
    this.loadData({ current, size, query })
    // const a =
    //   to.query.current !== undefined ? to.query.current : from.query.current;
    // console.log(a);
    // next({
    //   query: {
    //     ...to.query,
    //     current:
    //       to.query.current !== undefined
    //         ? to.query.current
    //         : from.query.current,
    //     size: to.query.size !== undefined ? to.query.size : from.query.size,
    //   },
    // });
    next()
  }
}
</script>

<style>
.page-body {
  background-color: white;
  padding: 10px;
}
</style>
