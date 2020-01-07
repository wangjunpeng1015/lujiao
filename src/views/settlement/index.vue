<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row__between
    div
    .buttons
      //- el-select(v-model='type', placeholder='支付方式' clearable @change="getTableData")
      //-   el-option(v-for='(item,i) in payWay', :key='i', :label='item.label', :value='item.value')
      //- el-input(v-model='account',@keyup.enter.native="getTableData" placeholder='结算账号' style="width:200px;")
      el-button(type='primary' @click="getTableData" :disabled="loading") 刷 新
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
          el-table-column(prop='account', label='账号', )
          el-table-column(prop='balance', label='已收金额',)
            template(slot-scope='scope')
              p.red {{ scope.row.balance }} 元
          el-table-column(prop='settlementBalance', label='待结算金额',)
            template(slot-scope='scope')
              p.red {{ scope.row.settlementBalance }} 元
          //- el-table-column(label='状态')
          //-   template(slot-scope='scope')
          //-     p(:style="{color:scope.row.state?'green':''}") {{ scope.row.state?'开启':'关闭' }}
          el-table-column(label='操作')
              template(slot-scope='scope')
                el-button(type='primary',size='mini' @click="settlement(scope.row)") 申请结算
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
  SettleModal(@finish="getTableData" :visible.sync="visible" :data='settlementData')
    
</template>

<script>
import SettleModal from "@/components/Settlement";
import { getSettlement } from "@/api/order";
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
      settlementData: {},
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
      return this.settings.dict.SettlementType.dicts;
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //同意收款、付款
    accept(data) {},
    // filterDic(val) {
    //   return this.payWay.find(n => n.id == val).dictValueDisplayName;
    // },
    settlement(data) {
      this.settlementData = data;
      this.visible = true;
    },
    getTableData() {
      this.loading = true;
      getSettlement({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          // userName: this.userName, //姓名
          // settlementWay: this.type, //支付方式
          // account: this.account //账号
        }
      })
        .then(res => {
          if (res.success) {
            const { totalRecords, pageNo, pageSize, content } = res.data;
            this.totalPage = totalRecords;
            this.pageSize = pageSize;
            this.currentPage = pageNo;
            content.map(item => {
              item.successTotalAmount = item.successTotalAmount || 0;
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
