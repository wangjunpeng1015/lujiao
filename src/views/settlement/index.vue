<template lang="pug">
.orders-container.layout-column
  .wjp-content.flex.layout-column(style="margin-top:0")
      el-table.wjp-table(v-loading="loading" :data='tableData', style='width: 100%')
          el-table-column(prop='account' show-overflow-tooltip label='账号', )
          el-table-column(prop='balance' show-overflow-tooltip label='已收金额',)
            template(slot-scope='scope')
              p.red {{ scope.row.balance }} 元
          el-table-column(prop='settlementBalance' show-overflow-tooltip label='待结算金额',)
            template(slot-scope='scope')
              p.red {{ scope.row.settlementBalance }} 元
          //- el-table-column(label='状态')
          //-   template(slot-scope='scope')
          //-     p(:style="{color:scope.row.state?'green':''}") {{ scope.row.state?'开启':'关闭' }}
          el-table-column(label='操作' show-overflow-tooltip)
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
          layout="sizes, prev, pager, next,total"
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
