<template lang="pug">
el-dialog(title="添加通道", :visible.sync='visible' width="30%" ,:close-on-click-modal='false',:append-to-body="true",:before-close='cancel')
    el-form(ref="form" :model='form' :rules="rules")
        .layout-row__between
            el-form-item(label='通道', prop="proxyOpenPayWayDictId" )
                el-select(v-model='form.proxyOpenPayWayDictId', placeholder='通道' clearable)
                    el-option(v-for='(item,i) in channel' :key="i" :label="item.value", :value='item.id')
            el-form-item(label='利率', prop="interestRate")
                el-input(v-model='form.interestRate')
        .layout-row__between
            el-form-item(label='备注', prop="remark")
                el-input(v-model='form.remark')
    .dialog-footer(slot='footer')
        el-button(@click='cancel') 取 消
        el-button(type='primary',:loading="loading", @click='addMerchantChannel') 确 定
</template>

<script>
import { addMerchantChannel } from "@/api/members";
import { getMerchantChannel } from "@/api/agent";
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
    ...mapState(["settings"])
  },
  data() {
    return {
      loading: false,
      channel: [],
      form: {
        proxyOpenPayWayDictId: "",
        interestRate: "",
        remark: ""
      },
      rules: {
        proxyOpenPayWayDictId: [
          { required: true, message: "请选择通道", trigger: "blur" }
        ],
        interestRate: [
          { required: true, message: "请填写利率", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.form = {
          proxyOpenPayWayDictId: "",
          interestRate: "",
          remark: ""
        };
        this.getMerchantChannel();
      }
    }
  },
  methods: {
    //获取开通通道
    getMerchantChannel() {
      getMerchantChannel(this.id)
        .then(res => {
          this.channel = res.data;
        })
        .catch(err => {
          this.$message.error("获取代理通道失败");
        })
        .finally(_ => {});
    },
    //添加通道
    addMerchantChannel() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
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
              this.loading = false;
              this.cancel();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
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
