<template lang="pug">
  .login-container
    #login
    div(style="margin-top: -200px;position: relative;z-index: 999")
      .title-container
        .title
          span.title-bg {{name}}
          span 支付
        .sub-title 一个以技术驱动的支付团队
      el-form.login-form(ref="loginForm" :model="loginForm" :rules="loginRulels" auto-complete="on")
        el-form-item(prop="account")
          span.svg-container
            svg-icon(icon-class="user")
          el-input(
            ref="account"
            v-model="loginForm.account"
            placeholder="请输入账号"
            name="account"
            type="text"
            tabindex="1"
            auto-complete="on"
            @keyup.enter.native.native="handleLogin"
          )
        el-form-item(prop="password")
          span.svg-container
            svg-icon(icon-class="password")
          el-input(
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native.native="handleLogin"
          )
          span.show-pwd(@click="showPwd")
            svg-icon(:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'")
        .submit-btn
          el-button(
            :loading="loading"
            type="primary"
            style="background: #ffa900;height:47px"
            @click.native.prevent="handleLogin"
          ) 登 录
</template>

<script>
import Particle from "zhihu-particle";
export default {
  name: "Login",
  data() {
    return {
      name: window.location.search.includes('n=9') ? '玖玖' : '77',
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {
    new Particle(document.getElementById("login"));
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", { ...this.loginForm, type: "admin" })
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  background: url('../../assets/img/new-bg.jpg') no-repeat 100% 100%;
  background-size: cover;
  position: relative;
  #login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      color: #000;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.type /deep/ .el-form-item__content {
  display: flex;
  .el-select {
    width: 100%;
  }
  .el-input {
    width: 100%;
  }
}
.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background-color: $bg;
  // background: url("../../assets/img/bg-01.jpg") 100% 100%/100% 100% no-repeat;
  overflow: hidden;

  .login-form {
    background: #2884f6;
    padding: 6px;
    position: relative;
    max-width: 80%;
    margin: 0 auto;
    overflow: hidden;
    z-index: 100;
    display: flex;
    border-radius: 6px;
    .submit-btn{
      padding-left: 13px;
      box-sizing: border-box;
      border-left: 1px dashed #fff;
      position: relative;
      &:before, &:after{
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 100%;
        left: -10px;
      }
      &:before{
        top: -20px;
      }
      &:after{
        bottom: -20px;
      }
    }
    /deep/ .el-form-item{
      flex: 1;
      margin:0 10px;
      background: #fff;
      .el-form-item__content{
        display: flex;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    // color: $dark_gray;
    height: 47px;
    color: #409eff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 30px;
    .sub-title{
      margin-top: 32px;
      color: rgba(54,63,84,.6);
      font-size: 24px;
      text-align: center;
    }

    .title {
      font-size: 32px;
      // color: $light_gray;
      color: #363f54;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      span{
        font-size: 32px;
      }
      .title-bg{
        position: relative;
      }
      .title-bg:before{
        content: "";
        display: inline-block;
        position: absolute;
        width: 100%;
        background: rgba(255,169,0,.8);
        height: 30%;
        top: 45%;
        left: -6px;
        z-index: -1;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
