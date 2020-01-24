<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row__between
    div
      //- el-button(type='primary' @click="settlement") 申请结算
    .buttons
      el-select(size="mini" v-model='accountId', placeholder='被结算人账号' filterable,clearable @change="getTableData")
        el-option(v-for='(item,i) in accounts', :key='i', :label='item.account', :value='item.id')
      el-date-picker(size="mini" v-model='time', type='daterange', value-format="yyyy-MM-dd",align='right', unlink-panels, range-separator='至', start-placeholder='开始日期', end-placeholder='结束日期' @change="getTableData")
      el-button(size="mini" type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" :data='tableData', style='width: 100%')
          el-table-column(prop='byClearingAccount' show-overflow-tooltip label='结算人', )
          el-table-column(prop='initiatorAccount' show-overflow-tooltip label='被结算人', )
          el-table-column(label='结算方式' show-overflow-tooltip)
            template(slot-scope='scope')
              p {{filterDic(scope.row.settlementTypeDictId)}}
          el-table-column(prop='settlementMoney', label='结算金额' show-overflow-tooltip)
          el-table-column(label='状态' show-overflow-tooltip)
            template(slot-scope='scope')
              p(:class="colorState(scope.row)") {{ scope.row.settlementStatus }}
          el-table-column(prop='createTime', label='创建时间' show-overflow-tooltip)
          el-table-column(label='操作',width='250')
            template(slot-scope='scope')
              div(v-if="userinfo.roleId ==3||scope.row.initiatorId == userinfo.id")
                el-button(v-if="showBtn(scope.row)" type='primary' @click="accept(scope.row)") 确认{{ userinfo.roleId==3?'结算':'收到' }}
                el-button(v-if="showRefuse(scope.row)" type='warning' @click="refuse(scope.row)") 拒 绝
                el-button(v-if="userinfo.roleId == 1" type='danger' @click="del(scope.row.id)") 删 除
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
          layout="sizes, prev, pager, next,total"
          :total="totalPage")
  //- SettleModal(:visible.sync="visible")

</template>

<script>
import { getSettlementList, delRecord, goAccept, refuse } from "@/api/order";
import { getSettlementUser } from "@/api/user";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  components: {},
  data() {
    return {
      // visible: false,
      loading: false,
      accountId: "", //
      accounts: [],
      tableData: [],
      time: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  watch: {},
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
    payWay() {
      return this.settings.dict.SettlementType.dicts;
    }
  },
  mounted() {
    this.getTableData();
    this.getSettlementUser();
  },
  methods: {
    //同意收款、付款
    accept(data) {
      this.$confirm(
        `确认${this.userinfo.roleId == 3 ? "结算" : "收到"} ${
          data.settlementMoney
        }元?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.loading = true;
          goAccept(data.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "结算成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "结算失败！"
              });
            })
            .finally(_ => {
              this.loading = false;
              this.getTableData();
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消结算"
          });
        });
    },
    //拒绝申请
    refuse(data) {
      this.$confirm(`确认拒绝当前申请？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          refuse(data.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "拒绝成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "拒绝失败！"
              });
            })
            .finally(_ => {
              this.loading = false;
              this.getTableData();
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消拒绝"
          });
        });
    },
    filterDic(val) {
      return this.payWay.find(n => n.id == val).dictValueDisplayName;
    },
    colorState(data) {
      let cls = "";
      switch (data.settlementStatus) {
        case "拒绝结算":
          cls = "red";
          break;
        case "结算成功":
          cls = "green";
          break;
        default:
          cls = "orange";
          break;
      }
      return cls;
    },
    //是否显示确认按钮
    showBtn(data) {
      if (data.settlementStatus != "拒绝结算") {
        //如果都同意
        if (data.byClearingNotarize && data.initiatorNotarize) {
          return false;
        }
        //是代理
        if (this.userinfo.roleId === 3) {
          return !data.byClearingNotarize;
        } else {
          return data.byClearingNotarize;
        }
      }
    },
    //是否显示拒绝按钮
    showRefuse(data) {
      return (
        this.userinfo.roleId == 3 &&
        !data.byClearingNotarize &&
        data.settlementStatus != "拒绝结算"
      );
    },
    getTableData() {
      this.loading = true;
      getSettlementList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          queryId: this.accountId,
          minTime: (this.time && this.time[0]) || "",
          maxTime: (this.time && this.time[1]) || ""
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
    //获取被算人
    getSettlementUser() {
      getSettlementUser()
        .then(res => {
          this.accounts = res.data;
        })
        .catch(err => {
          this.$message.error("获取被结算人失败！");
        });
    },
    del(id) {
      this.$confirm("是否删除改记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delRecord(id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "删除失败！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
