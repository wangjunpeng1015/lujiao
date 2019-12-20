<template lang="pug">
el-dialog(:title="form.id?'修改通道':'添加通道'", :visible.sync='visible' width="30%")
    el-form(ref="form" :model='form' :rules="rules")
        .layout-row__between
            el-form-item(label='通道', prop="payWayDictId")
                el-select(v-model='form.payWayDictId', placeholder='通道' clearable)
                    el-option(v-for='(item,i) in payWay' :key="i" :label='item.dictValueDisplayName', :value='item.id')
            el-form-item(label='利率', prop="channelRate")
                el-input(v-model='form.channelRate')
    .dialog-footer(slot='footer')
        el-button(@click='cancel') 取 消
        el-button(type='primary', @click='addChannel') 确 定
</template>

<script>
import { addChannel } from "@/api/agent";
import { mapState } from "vuex";
export default {
  props: {
    id: {
      default() {
        return "0";
      },
      type: String
    },
    visible: {
      default() {
        return false;
      },
      type: Boolean
    },
    form: {
      default() {
        return {};
      },
      type: Object
    }
  },
  computed: {
    ...mapState(["settings"]),
    payWay() {
      if (this.settings.dict) {
        return this.settings.dict.PayWay.dicts;
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      rules: {
        payWayDictId: [
          { required: true, message: "请选择通道", trigger: "blur" }
        ],
        channelRate: [
          { required: true, message: "请填写利率", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    //添加通道
    addChannel() {
      addChannel({
        ...this.form,
        proxyId: this.id
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
</style>
