<template lang="pug">
el-dialog(title="添加商户", :visible.sync='visible' width="30%"  :append-to-body="true")
    el-form(ref="form" :model='form' :rules="rules" label-width="80px")
        el-form-item(label='账号', prop="account")
            el-input(v-model='form.account')
        el-form-item(label='密码', prop="userPassword")
            el-input(v-model='form.userPassword')
        el-form-item(label='手机号', prop="phone")
            el-input(v-model='form.phone')
        el-form-item(label='姓名', prop="userName")
            el-input(v-model='form.userName')
    .dialog-footer(slot='footer')
        el-button(@click='cancel') 取 消
        el-button(type='primary', :disaled='loading' @click='add') 确 定
</template>

<script>
import { validPassword, validPhone } from "@/utils/validate";
import { mapGetters } from "vuex";
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
    ...mapGetters(["userinfo"])
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (validPassword(this.form.userPassword)) {
          callback();
        } else {
          callback(new Error("密码包含 数字,英文,字符中的两种以上，长度6-20"));
        }
      }
    };
    const validPhones = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (validPhone(this.form.phone)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      loading: false,
      form: {
        account: "",
        userName: "",
        userPassword: "",
        phone: ""
      },
      rules: {
        account: [{ required: true, trigger: "blur", message: "请输入账号" }],
        userName: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        userPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validPhones, trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    add() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let params = {
            ...this.form,
            roleIds: [2],
            parentAccount: this.userinfo.id
          };
          this.$store
            .dispatch("user/register", params)
            .then(() => {
              this.$message.success("注册成功！");
              this.cancel();
            })
            .catch(() => {
              this.$message.error("注册失败！");
            })
            .finally(_ => {
              this.loading = false;
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
