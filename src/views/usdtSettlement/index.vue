<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row__between
    .buttons
      el-button(type='primary' @click="addVisible = true") 添加火币账号
  .wjp-content.flex.layout-column
      el-table.wjp-table(header-align='center' align='center' v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
          el-table-column(prop='name', label='账号名称', width=200)
          el-table-column(label='今日可提余额')
            el-table-column(label="trc20usdt" )
              el-table-column(prop="trc20usdt_max" label="最大提币" width="120")
              el-table-column(prop="trc20usdt_remain" label="剩余提币" width="120")
            el-table-column(label="usdterc20" )
              el-table-column(prop="usdterc20_max" label="最大提币" width="120")
              el-table-column(prop="usdterc20_remain" label="剩余提币" width="120")
            el-table-column(label="usdt" )
              el-table-column(prop="usdt_max" label="最大提币" width="120")
              el-table-column(prop="usdt_remain" label="剩余提币" width="120")
          //- el-table-column(prop='api_key', label='api_key', )
          //- el-table-column(prop='secret_key', label='secret_key',)
          el-table-column(label='spot',)
            el-table-column(prop="spot_trade" label="可用余额" width="120")
            el-table-column(prop="spot_frozen" label="冻结金额" width="120")
          el-table-column(label='otc',)
            el-table-column(prop="otc_trade" label="可用余额" width="120")
            el-table-column(prop="otc_frozen" label="冻结金额" width="120")
          //- el-table-column(prop='address', label='充币地址',)
          //-   el-table-column(prop="usdterc20" label="usdterc20" width="120")
          //-   el-table-column(prop="trc20usdt" label="trc20usdt" width="120")
          //-   el-table-column(prop="usdt" label="usdt" width="120")
          el-table-column(label='操作')
            template(slot-scope='scope')
              el-button(type='primary',size='mini' @click="getUsdtQuota(scope.row)") 当日可提余额
              el-button(type='primary',size='mini' @click="getUsdtBalance('spot',scope.row)") 查看spot余额
              el-button(type='primary',size='mini' @click="getUsdtBalance('otc',scope.row)") 查看otc余额
              el-button(type='primary',size='mini' @click="getUsdtAddress(scope.row)") 查看充币地址
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
  el-dialog(title='账号信息', :visible.sync='addVisible' :close-on-click-modal='false')
    el-form(:model='form' :rules="rules" ref="form" label-width="150px")
      el-form-item(label='账号名称' prop="name")
        el-input(v-model='form.name', autocomplete='off')
      el-form-item(label='火币api_key' prop="api_key")
        el-input(v-model='form.api_key', autocomplete='off')
      el-form-item(label='火币secret_key' prop="secret_key")
        el-input(v-model='form.secret_key', autocomplete='off')
    .dialog-footer(slot='footer')
      el-button(@click='addVisible = false') 取 消
      el-button(type='primary', @click='submit') 确 定
</template>

<script>
import {
  getUsdtAccount,
  addUsdtAccount,
  updateUsdtAccount,
  getUsdtBalance,
  getUsdtAddress,
  getUsdtQuota
} from "@/api/usdt";
import { mapGetters, mapState } from "vuex";
import { debuglog } from "util";
export default {
  components: {},
  data() {
    return {
      loading: false,
      form: {
        api_key: "",
        name: "",
        secret_key: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        api_key: [
          { required: true, message: "请输入api_key", trigger: "blur" }
        ],
        secret_key: [
          { required: true, message: "请输入secret_key", trigger: "blur" }
        ]
      },
      addVisible: false,
      tableData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 30 //当前页显示数量
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
    //添加USDT账号
    submit() {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const fn = this.form.id ? updateUsdtAccount : addUsdtAccount;
          fn({
            ...this.form,
            user_id: this.userinfo.id
          }).then(res => {
            this.$message.success("添加成功！");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取提币地址
    getUsdtAddress(data) {
      this.loading = true;
      getUsdtAddress({
        usdt_config_id: data.usdt_config_id
      })
        .then(res => {
          res.data.map(item => {
            this.$set(data, item.chain, item.address);
          });
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    //获取提币余额
    getUsdtQuota(data) {
      this.loading = true;
      getUsdtQuota({
        usdt_config_id: data.usdt_config_id
      })
        .then(res => {
          res.data.map(item => {
            this.$set(data, `${item.chain}_max`, item.maxWithdrawAmt);
            this.$set(
              data,
              `${item.chain}_remain`,
              item.remainWithdrawQuotaPerDay
            );
          });
          debugger;
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    //获取余额
    getUsdtBalance(type, data) {
      this.loading = true;
      getUsdtBalance({
        usdt_config_id: data.usdt_config_id,
        account_id: type === "spot" ? data.spot_id : data.otc_id
      })
        .then(res => {
          res.data.map(item => {
            this.$set(data, `${type}_${item.type}`, item.balance);
          });
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    getTableData() {
      this.loading = true;
      getUsdtAccount({
        id: this.userinfo.id
      })
        .then(res => {
          this.tableData = res.data;
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
