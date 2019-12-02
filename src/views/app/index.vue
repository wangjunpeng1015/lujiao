<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row
    el-input(v-model='userName',@enter="getTableData" placeholder='app名称' style="width:200px;")
    el-button(type='primary' @click="getTableData" :disabled="loading" size="mini") 搜 索
    el-button(type='primary' @click="addTableData" :disabled="loading" size="mini") 添 加
  .wjp-content.flex.layout-column
    el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
      el-table-column(prop='shopName', label='商户名称')
      el-table-column(prop='name', label='应用名称')
      el-table-column(prop='appid', label='APPID')
      el-table-column(prop='createTime', label='创建时间')
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
      tableData: [
        {name: '大润发棋牌', appid: 'QW2131s23', shopName: '香港bc集团'},
        {name: '太阳城棋牌', appid: 'DF312323', shopName: '柬埔寨bc集团'},
      ],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 15 //当前页显示数量
    };
  },
  watch: {},
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
    payWay() {
      return this.settings.dict && this.settings.dict.PayWay.dicts;
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    addTableData () {
      this.$prompt('请填写应用名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
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
            // const {
            //   totalRecords,
            //   pageNo,
            //   pageSize,
            //   totalPage,
            //   content
            // } = res.data;
            // this.totalPage = totalRecords;
            // this.pageSize = pageSize;
            // this.currentPage = pageNo;
            // this.tableData = content;
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
