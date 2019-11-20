<template lang="pug">
.orders-container
    .wjp-tools.layout-row
        el-select(v-model='type', placeholder='支付方式' clearable @change="getTableData")
          el-option(v-for='item in settings.payWay', :key='item.value', :label='item.label', :value='item.value')
        el-select(v-model='state', placeholder='支付状态' @change="getTableData")
          el-option(v-for='item in status', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
        el-input(v-model='orderNo',@enter="getTableData" placeholder='订单号' style="width:200px;")
        el-button(type='primary' @click="getTableData") 搜 索
    .wjp-content
        el-table.wjp-table(:data='tableData', style='width: 100%', height='250')
            el-table-column(fixed prop='id', label='id', width='50')
            //- el-table-column(prop='name', label='订单号', )
            el-table-column(prop='orderNum', label='商户订单号', )
            el-table-column(prop='webSite', label='网站', )
            el-table-column(prop='orderName', label='名称', )
            el-table-column(prop='money', label='金额',)
            el-table-column(prop='payWay', label='方式',)
            el-table-column(prop='createTime', label='创建时间',)
            el-table-column(prop='endTime', label='结束时间',)
            el-table-column(prop='payStatusDictValue', label='状态',)
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
import { getOrdersList } from "@/api/order";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      type: "",
      state: "",
      orderNo: "", //搜索订单号
      states: [],
      tableData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 15 //当前页显示数量
    };
  },
  watch: {},
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
    status() {
      return this.settings.dict && this.settings.dict.PayStatus.dicts;
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      getOrdersList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          userId: this.userinfo.id, //商户id
          orderNum: this.orderNo, //订单号
          payWay: this.type, //支付方式
          upayStatus: "", //支付状态
          minMoney: "", //最小金额
          maxMoney: "" //最大金额
        }
      })
        .then(res => {
          if (res.success) {
            const {
              totalRecords,
              pageNo,
              pageSize,
              totalPage,
              content
            } = res.data;
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
