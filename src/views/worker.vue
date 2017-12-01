<template>
  <div class="users-page">
    <el-card>
      <el-form ref="searchForm" :rules="{}" :model="searchForm" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12">
            <el-form-item label="规则编号:">
              <el-input v-model="searchForm.id" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="使用状态:">
              <el-select v-model="searchForm.email" placeholder="请选择">
                <el-option :value="0">关闭</el-option>
                <el-option :value="1">运行中</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" v-show="expanded">
            <el-form-item label="调用次数:">
              <el-input v-model="searchForm.id" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" v-show="expanded">
            <el-form-item label="更新日期">
              <el-input v-model="searchForm.id" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-button type="primary" @click="onBtnSearch">查询</el-button>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="text" @click="expanded = !expanded">{{expanded ? '收起' : '展开'}}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="dialogVisible = true">
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
        <el-table-column label="工号" prop="id"></el-table-column>
        <el-table-column label="电子标签" prop="eleTag.id"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="照片" prop="photoUrl"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="工厂" prop="factory.name"></el-table-column>
        <el-table-column label="部门" prop="department.name"></el-table-column>
        <el-table-column label="产线" prop="productionLine.name"></el-table-column>
        <el-table-column label="班组" prop="classesTeam.name"></el-table-column>
        <el-table-column label="岗位属性" prop="property"></el-table-column>
        <el-table-column label="在岗年限" prop="onGuardYear"></el-table-column>
        <el-table-column label="在职状态" prop="workerStatus"></el-table-column>
        <el-table-column label="骨干" prop="backBone"></el-table-column>
        <el-table-column label="手机号" prop="telephone"></el-table-column>
        <el-table-column label="应急联系电话" prop="emergencyTelephone"></el-table-column>
        <el-table-column label="邮箱" prop="emailAddress"></el-table-column>
        <el-table-column label="特长" prop="specialty"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">配置</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">订阅警报</el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </StandardTable>
    </el-card>
    <el-dialog title="添加员工信息" width="80%" :visible.sync="dialogVisible">
      <el-form :model="editWorker" label-width="120px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12">
            <el-form-item label="员工照片">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="editWorker.imageUrl" :src="editWorker.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="工号">
              <el-input v-model="editWorker.id" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="电子标签">
              <el-input v-model="editWorker.eleTag.id" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="姓名">
              <el-input v-model="editWorker.name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="性别">
              <el-select v-model="editWorker.sex" placeholder="">
                <el-option value="男">男</el-option>
                <el-option value="女">女</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="出生年月">
              <el-date-picker v-model="editWorker.birth" type="date" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="工厂">
              <el-select v-model="editWorker.factory.id" placeholder="">
                <el-option v-for="factory in factories" :key="factory.id" :value="factory.id" :label="factory.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="部门">
              <el-select v-model="editWorker.department.id" placeholder="">
                <el-option v-for="department in departments" :key="department.id" :value="department.id" :label="department.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="产线">
              <el-select v-model="editWorker.productionLine.id" placeholder="">
                <el-option v-for="line in lines" :key="line.id" :value="line.id" :label="line.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="班组">
              <el-select v-model="editWorker.classesTeam.id" placeholder="">
                <el-option v-for="classesTeam in classesTeams" :key="classesTeam.id" :value="classesTeam.id" :label="classesTeam.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="岗位属性">
              <el-input v-model="editWorker.property" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="入职时间">
              <el-date-picker v-model="editWorker.entrytime" type="date" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="在职状态">
              <el-input v-model="editWorker.workerStatus" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="骨干">
              <el-input v-model="editWorker.backBone" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="手机号">
              <el-input v-model="editWorker.telephone" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="应急联系电话">
              <el-input v-model="editWorker.emergencyTelephone" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="邮箱">
              <el-input v-model="editWorker.emailAddress" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="特长">
              <el-input v-model="editWorker.specialty" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="备注">
              <el-input v-model="editWorker.remark" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import StandardTable from '@/components/StandardTable'
import { getList } from '@/api/worker'
import { getUserMetaData } from '@/api/users'

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
      expanded: false,
      dialogVisible: false,
      editWorker: {
        eleTag: {},
        factory: {},
        department: {},
        productionLine: {},
        classesTeam: {}
      },
      factories: [],
      lines: []
    }
  },
  computed: {
    departments() {
      const selectFactory = this.factories.find(factory => {
        return factory.id === this.editWorker.factory.id
      })
      return selectFactory ? selectFactory.departments || [] : []
    },
    classesTeams() {
      const selectLine = this.lines.find(line => {
        return line.id === this.editWorker.productionLine.id
      })
      return selectLine ? selectLine.classesTeams || [] : []
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
    },
    loadUserMetaData() {
      getUserMetaData().then(res => {
        this.factories = res.factories
        this.lines = res.lines
      })
    },
    handleEdit(index, row) {
      this.editWorker = row
      this.dialogVisible = true
      this.loadUserMetaData()
    },
    handleAvatarSuccess(res, file) {
      this.editWorker.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted() {
    const current = parseInt(this.$route.query.current, 10) || 0
    const size = parseInt(this.$route.query.size, 10) || 10
    const query = this.$route.query.q || ''
    this.loadData({ current, size, query })
  }
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  //   const current =
  //     parseInt(to.query.current, 10) || parseInt(from.query.current, 10) || 0
  //   const size =
  //     parseInt(to.query.size, 10) || parseInt(from.query.size, 10) || 10
  //   const query = to.query.q || from.query.q || ''
  //   this.loadData({ current, size, query })
  //   // const a =
  //   //   to.query.current !== undefined ? to.query.current : from.query.current;
  //   // console.log(a);
  //   // next({
  //   //   query: {
  //   //     ...to.query,
  //   //     current:
  //   //       to.query.current !== undefined
  //   //         ? to.query.current
  //   //         : from.query.current,
  //   //     size: to.query.size !== undefined ? to.query.size : from.query.size,
  //   //   },
  //   // });
  //   next()
  // }
}
</script>

<style>
.page-body {
  background-color: white;
  padding: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 136px;
  height: 176px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
