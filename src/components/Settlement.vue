<template lang="pug">
  el-dialog(title='申请提现', :visible.sync='visible')
    el-form(:model='form', :rules='rules', ref='form', label-width='120px')
      el-form-item(label='结算方式', prop='settlementWay')
        el-select(v-model='form.settlementWay', placeholder='结算方式' clearable)
          el-option(v-for='(item,i) in payWay' :key="i" :label='item.label', :value='item.value')
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
import { mapState } from "vuex";
import { settleCreate } from "@/api/order";
export default {
  props: ["visible"],
  computed: {
    ...mapState(["settings"]),
    payWay() {
      return this.settings.payWay;
    }
  },
  data() {
    return {
      settleWay: [
        { label: "支付宝", value: "ali" },
        { label: "微信", value: "wx" },
        { label: "银行卡", value: "bank" }
      ],
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
      }
    };
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
            this.cancel();
          })
          .catch(err => {
            this.$message.error("申请失败，请重新申请！");
          });
      }
    },
    cancel() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
