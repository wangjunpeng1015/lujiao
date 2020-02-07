<template lang="pug">
el-dialog(title='添加订单',:visible.sync='visible' @close="cancel")
  el-form(:model='form' :rules="rules" ref="form" label-width="100px")
    el-form-item(label='商户账号', prop="merchantNum")
      el-select(v-model='form.merchantNum', placeholder='请选择收款通道方式'  @change="getAllchannel" style='width:200px')
        el-option(v-for='(item,i) in merchants', :key='i', :label='item.userAccount', :value='item.merchantNumber')
    el-form-item(label='收款方式', prop="payWay")
      el-select(v-model='form.payWay', placeholder='请选择收款通道方式' style='width:200px' ,:disabled="loading")
        el-option(v-for='item in settings.payWay', :key='item.value', :label='item.label', :value='item.value')
    el-form-item(label='金额', prop="money")
      el-input(type="number", v-model='form.money' style='width:200px')
  .dialog-footer(slot='footer')
    el-button(@click='cancel') 取 消
    el-button(type='primary',:loading="creatLoading" @click='submitForm') 确 定
</template>

<script>
import dayjs from "dayjs";
import md5 from "js-md5";
import { channelToPayWay } from "@/utils";
import { getAllchannel } from "@/api/agent";
import { mapGetters, mapState } from "vuex";
import { createOrder, getMerchants } from "@/api/order";
export default {
  props: {
    visible: {
      default() {
        return false;
      },
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["userinfo"]),
    ...mapState(["settings"])
    // channels() {
    //   return channelToPayWay(
    //     this.payWay,
    //     this.settings.dict.PayWay.dicts,
    //     this.settings.payWay
    //   );
    // }
  },
  watch: {
    visible(val) {
      if (val) {
        console.log(this.payWay);
        this.getMerchants();
      }
    }
  },
  data() {
    return {
      loading: false,
      creatLoading: false,
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
      this.loading = true;
      getMerchants()
        .then(res => {
          if (res.success) {
            this.merchants = res.data;
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
          this.creatLoading = true;
          let merchant = this.merchants.find(
            item => item.merchantNumber == this.form.merchantNum
          );
          //商户号+支付金额+商户秘钥
          const sign = md5(
            this.form.merchantNum + this.form.money + merchant.secretKey
          );
          createOrder({
            ...this.form,
            merchantOrderNo: "default",
            sign,
            ip: returnCitySN.cip || "0.0.0.0"
          })
            .then(res => {
              this.$message.success("订单创建成功！");
              this.cancel();
            })
            .catch(err => {
              this.$message.error("订单创建失败！");
            })
            .finally(_ => {
              this.creatLoading = false;
            });
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
