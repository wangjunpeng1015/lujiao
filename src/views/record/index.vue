<template lang="pug">
.orders-container
    .wjp-content
        el-table.wjp-table(v-loading="loading" :data='tableData', style='width: 100%', height='250')
            el-table-column(fixed prop='id', label='id', width='50')
            //- el-table-column(prop='name', label='订单号', )
            el-table-column(prop='loginAccount', label='登录账号', )
            el-table-column(prop='ip', label='ip', )
            el-table-column(prop='loginPlace', label='地点', )
            el-table-column(prop='createTime', label='登录时间', )
        //- .page.layout-row.align-center.right
        //-     span 每页显示
        //-     el-pagination.statistics(
        //-     background
        //-     prev-text="上一页"
        //-     next-text="下一页"
        //-     @size-change="sizeChange"
        //-     @current-change="getTableData"
        //-     :current-page.sync="currentPage"
        //-     :page-size="pageSize"
        //-     layout=" prev, pager, next,total"
        //-     :total="totalPage")
    
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
      tableData: []
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
      getloginLog()
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          this.$message.error("获取表格数据失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
</style>
