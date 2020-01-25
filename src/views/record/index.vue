<template lang="pug">
.orders-container.layout-column
    .wjp-content.flex.layout-column
        el-table.wjp-table(v-loading="loading" :data='tableData', style='width: 100%')
            el-table-column(prop='loginAccount', label='登录账号', )
            el-table-column(prop='ip', label='ip', )
            el-table-column(prop='loginPlace', label='地点', )
            el-table-column(prop='createTime', label='登录时间', )
        .page.layout-row.align-center.right
            span 每页显示
            el-pagination.statistics(
            background
            prev-text="上一页"
            next-text="下一页"
            @size-change="sizeChange"
            @current-change="getTableData"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout=" prev, pager, next,total"
            :total="totalPage")

</template>

<script>
import { getloginLog } from "@/api/user";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      loading: false,
      type: "",
      state: "",
      tableData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["userinfo"])
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      getloginLog({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {}
      })
        .then(res => {
          const { totalRecords, pageNo, pageSize, content } = res.data;
          this.totalPage = totalRecords;
          this.pageSize = pageSize;
          this.currentPage = pageNo;
          this.tableData = content;
          // this.tableData = res.data;
        })
        .catch(err => {
          this.$message.error("获取表格数据失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    sizeChange(num) {
      this.pageSize = num;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
</style>
