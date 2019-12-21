<template lang="pug">
el-dialog(title="添加通道", :visible.sync='visible' width="30%")
    el-form(ref="form" :model='form' :rules="rules")
        .layout-row__between
            el-form-item(label='通道', prop="proxyOpenPayConfigId")
                el-select(v-model='form.proxyOpenPayConfigId', placeholder='通道' clearable)
                    el-option(v-for='(item,i) in payWay' :key="i" :label='item.dictValueDisplayName', :value='item.id')
            el-form-item(label='利率', prop="interestRate")
                el-input(v-model='form.interestRate')
    .dialog-footer(slot='footer')
        el-button(@click='cancel') 取 消
        el-button(type='primary', @click='addMerchantChannel') 确 定
</template>

<script>
import { toDicChannel } from "@/utils";
import { addMerchantChannel } from "@/api/members";
import { getAllchannel } from "@/api/agent";
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    id: {
      default() {
        return 0;
      },
      type: Number
    },
    visible: {
      default() {
        return false;
      },
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["userinfo"]),
    ...mapState(["settings"]),
    payWay() {
      console.log(toDicChannel(this.channel, this.settings.dict.PayWay.dicts));
      return toDicChannel(this.channel, this.settings.dict.PayWay.dicts);
    }
  },
  data() {
    return {
      channel: [],
      form: {
        proxyOpenPayConfigId: "",
        interestRate: ""
      },
      rules: {
        proxyOpenPayConfigId: [
          { required: true, message: "请选择通道", trigger: "blur" }
        ],
        interestRate: [
          { required: true, message: "请填写利率", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getAllchannel();
  },
  methods: {
    //获取代理开通通道
    getAllchannel() {
      getAllchannel({
        pageNo: 1,
        pageSize: 100,
        param: { proxyAccount: this.userinfo.account, minRate: "", maxRate: "" }
      })
        .then(res => {
          this.channel = res.data.content;
        })
        .catch(err => {
          this.$message.error("获取代理通道失败");
        })
        .finally(_ => {});
    },
    //添加通道
    addMerchantChannel() {
      addMerchantChannel({
        ...this.form,
        merchantId: this.id
      })
        .then(res => {
          this.$message.success("添加通道成功！");
        })
        .catch(err => {
          this.$message.error("添加通道失败！");
        })
        .finally(_ => {
          this.cancel();
        });
    },
    cancel() {
      this.$emit("finish");
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
