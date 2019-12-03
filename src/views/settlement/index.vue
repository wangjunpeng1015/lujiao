<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row__between
    div
      el-button(type='primary' @click="settlement") 结 算
    div
      el-select(v-model='type', placeholder='支付方式' clearable @change="getTableData")
        el-option(v-for='(item,i) in settleWay', :key='i', :label='item.label', :value='item.value')
      el-input(v-model='userName',@enter="getTableData" placeholder='姓名' style="width:200px;")
      el-input(v-model='account',@enter="getTableData" placeholder='结算账号' style="width:200px;")
      el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
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
  el-dialog(title='结算方式', :visible.sync='visible')
    el-form(:model='form', :rules='rules', ref='form', label-width='120px')
      el-form-item(label='结算方式', prop='settlementWay')
        el-select(v-model='form.settlementWay', placeholder='结算方式' clearable)
          el-option(v-for='(item,i) in settleWay' :key="i" :label='item.label', :value='item.value')
      el-form-item(label='金额', prop='settlementMoney')
        el-input(v-model='form.settlementMoney',placeholder='请输入金额' style="width:200px")
      //结算方式配置
      div( v-if="form.settlementWay=='ali'",)
        el-form-item(label='支付宝账号',prop='aliAccount')
          el-input(v-model='form.aliAccount',placeholder='请输入支付宝账号')
      div( v-if="form.settlementWay=='wx'")
        el-form-item(label='微信账号',prop='wxAccount')
          el-input(v-model='form.wxAccount',placeholder='请输入微信账号')
      div( v-if="form.settlementWay=='bank'")
        el-form-item(label='银行卡号',prop='bankAccount')
          el-input(v-model='form.bankAccount',placeholder='请输入银行卡号')
        el-form-item(label='真实姓名',prop='name')
          el-input(v-model='form.name',placeholder='请输入真实姓名')
        el-form-item(label='银行名称',prop='bank')
          el-input(v-model='form.bank',placeholder='请输入银行名称')
        el-form-item(label='开户行所在地',prop='address')
          el-input(v-model='form.address',placeholder='请输入开户行所在地')
    .dialog-footer(slot='footer')
      el-button(@click='cancel') 取 消
      el-button(type='primary', @click='sure') 确定结算

    
</template>

<script>
import { debounce } from "lodash";
import { getSettlementList, settleCreate } from "@/api/order";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      settleWay: [
        { label: "支付宝", value: "ali" },
        { label: "微信", value: "wx" },
        { label: "银行卡", value: "bank" }
      ],
      visible: false,
      loading: false,
      form: {
        settlementWay: "",
        aliAccount: "",
        wxAccount: "",
        bankAccount: "",
        settlementMoney: "",
        bank: "",
        name: "",
        address: ""
      },
      rules: {
        settlementWay: [
          { required: true, message: "请选择添加结算方式", trigger: "change" }
        ],
        aliAccount: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" }
        ],
        wxAccount: [
          { required: true, message: "请输入微信卡号", trigger: "blur" }
        ],
        bankAccount: [
          { required: true, message: "请输入卡号", trigger: "blur" }
        ],
        settlementMoney: [
          { required: true, message: "请输入金额", trigger: "blur" }
        ],
        bank: [{ required: true, message: "请输入银行名称", trigger: "blur" }],
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        address: [
          { required: true, message: "请输入开户所在地址", trigger: "blur" }
        ]
      },
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
    payWay() {
      return this.settings.dict && this.settings.dict.PayWay.dicts;
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    sure() {
      const way = this.form.settlementWay;
      let valide = ["settlementWay", "settlementMoney"];
      if (way == "bank") {
        valide = [...valide, "bankAccount", "name", "bank", "address"];
      } else if (way == "ali") {
        valide = [...valide, "aliAccount"];
      } else {
        valide = [...valide, "wxAccount"];
      }
      let pass = [];
      this.$refs.form.validateField(valide, err => {
        pass.push(!err);
      });
      if (pass.every(n => n)) {
        let params = {
          settlementWay: this.form.settlementWay,
          settlementMoney: this.form.settlementMoney,
          settlementConfig: {}
        };
        valide.map(v => {
          if (v != "settlementWay" && v != "settlementMoney") {
            params.settlementConfig[v] = this.form[v];
          }
        });
        params.settlementConfig = JSON.stringify(params.settlementConfig);
        settleCreate(params)
          .then(res => {
            this.$message.success("申请成功，将在一个工作日内审核");
            this.visible = false;
          })
          .catch(err => {
            this.$message.error("申请失败，请重新申请！");
          });
      }
    },
    cancel() {
      this.visible = false;
    },
    settlement() {
      this.visible = true;
      this.$refs.form.resetFields();
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
