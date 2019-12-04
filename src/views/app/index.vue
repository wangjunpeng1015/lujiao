<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row
    el-input(v-model='appName',@enter="getTableData" placeholder='app名称' style="width:200px;")
    el-button(type='primary' @click="getTableData" :disabled="loading" size="mini") 搜 索
    el-button(type='primary' @click="addTableData" :disabled="loading" size="mini") 添 加
  .wjp-content.flex.layout-column
    el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
      el-table-column(prop='userName', label='商户名称')
      el-table-column(prop='appName', label='应用名称')
      el-table-column(prop='appId', label='APPID')
      el-table-column(prop='settlementStatus', label='状态',)
        template(slot-scope='scope')
          el-button(type="danger" @click="deleteApp(scope.row)") 删除
      //- el-table-column(prop='createTime', label='创建时间')
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
import { getAppList, saveApp, delApp } from "@/api/app";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      loading: false,
      type: "",
      appName: "",
      account: "",
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
    payWay() {
      return this.settings.dict && this.settings.dict.PayWay.dicts;
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    deleteApp (row) {
      console.log(row)
      delApp(row.appId).then(res => {
        console.log(res)
      })
    },
    addTableData () {
      this.$prompt('请填写应用名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        saveApp({
          appName: value,
        }).then(res => {
          this.getTableData();
        })
      })
    },
    getTableData() {
      this.loading = true;
      getAppList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
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
