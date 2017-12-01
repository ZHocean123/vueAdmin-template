<template>
  <div>
    <el-table :data="tableData">
      <slot></slot>
    </el-table>
    <el-pagination class="table-page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: () => 0
    }
  },
  name: 'StandardTable',
  data() {
    return {}
  },
  computed: {
    current() {
      return parseInt(this.$route.query.current, 10) || 0
    },
    pageSize() {
      return parseInt(this.$route.query.size, 10) || 10
    }
  },
  methods: {
    handleSizeChange(size) {
      // this.$router.push({
      //   query: JSON.stringify({ ...this.$route.query, size })
      // })
    },
    handleCurrentChange(current) {
      // this.$router.push({
      //   query: JSON.stringify({ ...this.$route.query, current })
      // })
    }
  },
  mounted() {
    // this.total = parseInt(this.$route.query.total, 10) || 0;
    // this.current = parseInt(this.$route.query.current, 10) || 0;
    // this.pageSize = parseInt(this.$route.query.size, 10) || 10;
    // this.$router.replace({
    //   query: {
    //     current: this.current,
    //     size: this.pageSize,
    //     ...this.$route.query
    //   }
    // })
  }
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  //   next({
  //     query: {
  //       current: this.current,
  //       size: this.pageSize,
  //       ...to.query
  //     }
  //   })
  // }
}
</script>

<style scoped>
.table-page {
  margin-top: 10px;
  float: right;
}
</style>
