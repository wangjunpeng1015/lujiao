<template lang="pug">
.orders-container
    .wjp-tools.layout-row
        el-select(v-model='type', placeholder='结算方式' clearable @change="getTableData")
          el-option(v-for='item in settings.payWay', :key='item.value', :label='item.label', :value='item.value')
        el-input(v-model='userName',@enter="getTableData" placeholder='姓名' style="width:200px;")
        el-input(v-model='account',@enter="getTableData" placeholder='结算账号' style="width:200px;")
        el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
    .wjp-content
        el-table.wjp-table(v-loading="loading" :data='tableData', style='width: 100%', height='250')
            el-table-column(prop='account', label='账号', )
            el-table-column(prop='userName', label='姓名', )
            el-table-column(prop='settlementWay', label='结算方式', )
            el-table-column(prop='settlementMoney', label='结算金额',)
            el-table-column(prop='poundage', label='手续费',)
            el-table-column(prop='settlementIR', label='利率',)
            el-table-column(prop='createTime', label='创建时间',)
            el-table-column(prop='settlementStatus', label='状态',)
                template(slot-scope='scope')
                    span(:class="[scope.row.settlementStatus?'green':'red']") {{ scope.row.settlementStatus?'成功':'失败' }}
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
import { debounce } from "lodash";
import { getSettlementList } from "@/api/order";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      loading: false,
      type: "",
      userName: "",
      account: "", //
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
      this.loading = true;
      getSettlementList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          userName: this.userName, //姓名
          settlementWay: this.type, //支付方式
          account: this.account //账号
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
