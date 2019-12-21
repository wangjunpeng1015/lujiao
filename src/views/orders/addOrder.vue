<template lang="pug">
el-dialog(title='添加订单', :close-on-click-modal="false",:visible.sync='visible' )
  el-form(:model='form' :rules="rules" ref="form" label-width="100px")
    el-form-item(label='商户账号', prop="merchantNum")
      el-select(v-model='form.merchantNum', placeholder='请选择收款通道方式'  @change="getAllchannel" style='width:200px')
        el-option(v-for='item in merchants', :key='item.id', :label='item.account', :value='item.merchantNumber')
    el-form-item(label='收款方式', prop="payWay")
      el-select(v-model='form.payWay', placeholder='请选择收款通道方式' style='width:200px' ,:disabled="loading")
        el-option(v-for='item in channels', :key='item.value', :label='item.label', :value='item.value')
    el-form-item(label='金额', prop="money")
      el-input(v-model='form.money' style='width:200px')
  .dialog-footer(slot='footer')
    el-button(@click='cancel') 取 消
    el-button(type='primary', @click='submitForm') 确 定
</template>

<script>
import md5 from "js-md5";
import { channelToPayWay } from "@/utils";
import { getAllchannel } from "@/api/agent";
import { mapGetters, mapState } from "vuex";
import { createOrder } from "@/api/order";
import { getMerchants } from "@/api/members";
export default {
  props: {
    visible: {
      default() {
        return false;
      },
      type: Boolean
    },
    payWay: {
      default() {
        return [];
      },
      type: Array
    }
  },
  computed: {
    ...mapGetters(["userinfo"]),
    ...mapState(["settings"]),
    channels() {
      return channelToPayWay(
        this.payWay,
        this.settings.dict.PayWay.dicts,
        this.settings.payWay
      );
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getMerchants();
      }
    }
  },
  data() {
    return {
      loading: false,
      channel: [],
      merchants: [],
      form: {
        merchantNum: "",
        payWay: "",
        money: ""
      },
      rules: {
        payWay: [
          { required: true, message: "请选择支付方式", trigger: "blur" }
        ],
        money: [{ required: true, message: "请填写订单金额", trigger: "blur" }],
        merchantNum: [
          { required: true, message: "请选择商户", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    getMerchants() {
      getMerchants({
        pageNo: 1,
        pageSize: 1000,
        param: {}
      })
        .then(res => {
          if (res.success) {
            const { content } = res.data;
            this.merchants = content;
          } else {
            this.$message.error("获取商户数据失败！");
          }
        })
        .catch(err => {
          this.$message.error("获取商户数据失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    //查询通道
    getAllchannel(merchantNum) {
      this.loading = true;
      let merchant = this.merchants.find(
        item => item.merchantNumber == merchantNum
      );
      getAllchannel({
        pageNo: 1,
        pageSize: 100,
        param: {
          account: merchant.account,
          maxRate: "",
          minRate: ""
        }
      })
        .then(res => {
          this.channel = res.data.content;
        })
        .catch(err => {
          this.$message.error("获取通道失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    cancel() {
      this.$refs.form.resetFields();
      this.$emit("finish");
      this.$emit("update:visible", false);
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let merchant = this.merchants.find(
            item => item.merchantNumber == this.form.merchantNum.merchantNum
          );
          //商户号+支付金额+商户秘钥
          const sign = md5(
            this.form.merchantNum + this.form.money + this.form.secretKey
          );
          createOrder({
            ...this.form,
            sign,
            ip: returnCitySN.cip
          })
            .then(res => {
              this.$message.success("订单创建成功！");
              this.cancel();
            })
            .catch(err => {
              this.$message.error("订单创建失败！");
            })
            .finally(_ => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
