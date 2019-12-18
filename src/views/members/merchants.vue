<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row
      el-input(v-model='account',@keyup.enter="getTableData" placeholder='商户账号' style="width:200px;")
      el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
          el-table-column(prop='account', label='账号', )
          el-table-column(prop='userName', label='商户姓名', )
          el-table-column(prop='phone', label='手机号', )
          el-table-column(prop='ordersMoney', label='订单金额', )
          el-table-column(label='利率',)
            template(slot-scope='scope')
                el-input(v-if="scope.row.show" v-model='scope.row.merchantInterestRate',@blur="changeRate(scope.row)" placeholder='利率' style="width:100px;")
                span(v-else @click.stop="$set(scope.row,'show',true)") {{ scope.row.merchantInterestRate }}
          el-table-column(prop='createTime', label='创建时间',)
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
import { getMerchants, changeRate } from "@/api/members";
export default {
  components: {},
  data() {
    return {
      loading: false,
      account: "", //
      tableData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.getTableData();
  },
  methods: {
    //修改利率
    changeRate(data) {
      this.loading = true;
      changeRate({
        userId: data.id,
        interestRate: data.merchantInterestRate
      })
        .then(res => {
          this.$message.success("修改利率成功！");
        })
        .catch(err => {
          this.$message.error("修改利率失败！");
        })
        .finally(_ => {
          this.loading = false;
          this.getTableData();
        });
    },
    getTableData() {
      this.loading = true;
      getMerchants({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          account: this.account, //账号
          type: 1 //商户
        }
      })
        .then(res => {
          if (res.success) {
            const { totalRecords, pageNo, pageSize, content } = res.data;
            this.totalPage = totalRecords;
            this.pageSize = pageSize;
            this.currentPage = pageNo;
            this.tableData = content;
          } else {
            this.$message.error("获取表格数据失败！");
          }
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
    },
    //设置排序
    sortChange(column) {
      this.tld_asc = column.order;
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
