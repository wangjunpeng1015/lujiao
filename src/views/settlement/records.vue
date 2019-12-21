<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row__between
    div
      el-button(type='primary' @click="settlement") 申请结算
    .buttons
      el-select(v-model='type', placeholder='支付方式' clearable @change="getTableData")
        el-option(v-for='(item,i) in payWay', :key='i', :label='item.label', :value='item.value')
      el-input(v-model='account',@keyup.enter.native="getTableData" placeholder='结算账号' style="width:200px;")
      el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
          el-table-column(prop='account', label='账号', )
          el-table-column(label='结算方式', )
            template(slot-scope='scope')
              span {{ filterDic(scope.row.settlementWay) }}
          el-table-column(prop='settlementMoney', label='结算金额',)
          el-table-column(prop='poundage', label='手续费',)
          el-table-column(prop='settlementIR', label='利率',)
          el-table-column(prop='createTime', label='创建时间',)
          el-table-column(label='状态',)
              template(slot-scope='scope')
                el-button(v-if="scope.row.myState" type='primary' @click="accept(scope.row)") 确认
                span(v-else :class="[scope.row.youState?'green':'orange']") {{ scope.row.youState?'交易完成':'等待对方确认' }}
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
  SettleModal(:visible.sync="visible")
    
</template>

<script>
import SettleModal from "@/components/Settlement";
import { getSettlementList } from "@/api/order";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  components: {
    SettleModal
  },
  data() {
    return {
      visible: false,
      loading: false,
      type: "",
      // userName: "",
      account: "", //
      tableData: [],
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
      return this.settings.payWay;
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //同意收款、付款
    accept(data) {},
    filterDic(val) {
      return this.payWay.find(n => n.value == val).label;
    },
    settlement() {
      this.visible = true;
    },
    getTableData() {
      this.loading = true;
      getSettlementList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          // userName: this.userName, //姓名
          settlementWay: this.type, //支付方式
          account: this.account //账号
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
