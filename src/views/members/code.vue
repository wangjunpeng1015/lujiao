<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row
      el-input(v-model='account',@keyup.enter.native="getTableData" placeholder='码商账号' style="width:200px;")
      el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
        el-table-column(prop='account', label='账号', )
        el-table-column(prop='account', label='所属代理', )
        el-table-column(prop='phone', label='手机号', )
        el-table-column(prop='ordersMoney', label='订单金额', )
        el-table-column(prop='createTime', label='创建时间',)
        el-table-column(width="100" v-if="userinfo.roleId == 1 || userinfo.roleId == 3")
          template(slot-scope='scope')
            el-button(type="danger" @click="del(scope.row.id)" size='mini') 删 除
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
import { mapGetters } from "vuex";
import { delUser } from "@/api/user";
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
  computed: {
    ...mapGetters(["userinfo"])
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    del(id) {
      this.$confirm("确定删除当前码商?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          delUser(id)
            .then(res => {
              this.getPays();
            })
            .catch(err => {})
            .finally(e => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改利率
    changeRate(data) {
      changeRate({})
        .then(res => {
          this.$set(data, "show", false);
        })
        .catch(err => {});
    },
    getTableData() {
      this.loading = true;
      getMerchants({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          account: this.account, //账号
          type: 4 //码商
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
