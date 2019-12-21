<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row.align-center
    el-input(v-model='account',@keyup.enter.native="getTableData" placeholder='商户账号' style="width:200px;")
    el-input(v-model='minRate',@keyup.enter.native="getTableData" placeholder='最小利率' style="width:100px;")
    div -
    el-input(v-model='maxRate',@keyup.enter.native="getTableData" placeholder='最大利率' style="width:100px;")
    el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
          el-table-column(prop='account', label='账号', )
          el-table-column(prop='userName', label='商户姓名', )
          el-table-column(label='支付回调', )
            template(slot-scope='scope')
              el-input(v-if="scope.row.show" v-model='scope.row.returnUrl',@blur="changeUrl(scope.row)" placeholder='支付回调' style="width:100px;")
              span(v-else @click.stop="$set(scope.row,'show',true)") {{ scope.row.returnUrl||'localhost:8080' }}
          el-table-column(prop='phone', label='手机号', )
          el-table-column(prop='ordersMoney', label='订单金额', )
          el-table-column(prop='createTime', label='创建时间',)
          el-table-column(label='操作',)
            template(slot-scope='scope')
              el-button(size="mini" type='primary' @click="edit(scope.row)") 编辑
              el-button(size="mini" type='danger' @click="del(scope.row)") 删除
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
  drawer(:visible.sync="drawerVisible" :data="chooseMerchants")
</template>

<script>
import { getMerchants, changeUrl } from "@/api/members";
import { delUser } from "@/api/user";
import drawer from "@/views/members/merchants/drawer";
export default {
  components: {
    drawer
  },
  data() {
    return {
      drawerVisible: false,
      chooseMerchants: {},
      loading: false,
      account: "", //
      minRate: "", //
      maxRate: "", //
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
    edit(data) {
      this.chooseMerchants = data;
      this.drawerVisible = true;
    },
    del(data) {
      this.$confirm(`确定删除商户 ${data.account}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser(data.id)
            .then(res => {
              this.$message.success("删除成功！");
            })
            .catch(err => {
              this.$message.error("删除失败！");
            })
            .finally(_ => {
              this.getTableData();
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
    changeUrl(data) {
      this.$set(data, "show", false);
      if (data.oldreturnUrl === data.returnUrl) {
        return;
      }
      this.loading = true;
      changeUrl({
        id: data.id,
        returnUrl: data.returnUrl
      })
        .then(res => {
          this.$message.success("修改回调成功！");
        })
        .catch(err => {
          this.$message.error("修改回调失败！");
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
          minRate: this.minRate, //
          maxRate: this.maxRate //
        }
      })
        .then(res => {
          if (res.success) {
            const { totalRecords, pageNo, pageSize, content } = res.data;
            this.totalPage = totalRecords;
            this.pageSize = pageSize;
            this.currentPage = pageNo;
            content.map(item => {
              item.oldreturnUrl = item.returnUrl;
            });
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
