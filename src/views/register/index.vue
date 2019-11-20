<template lang="pug">
.register-container
  el-form.login-form(ref='form', :model='form', :rules='loginRules',label-width="90px" auto-complete='on', label-position='left')
    .title-container.center
      h3.title 自助申请商户
    el-form-item(label="结算方式" prop='settlementWay')
      el-select(v-model='form.settlementWay', placeholder='请选择结算方式' style="width:100%")
        el-option(v-for='item in payWay', :key='item.value', :label='item.label', :value='item.value')
    el-form-item(label="账号"  prop='account')
      el-input(v-model='form.account', placeholder='账号', name='account', type='text',  auto-complete='on')
    el-form-item(label="密码"  prop='pwd')
      el-input(v-model='form.pwd', placeholder='密码', type="password" name='pwd', auto-complete='on')
    el-form-item(label="真实姓名"  prop='realName')
      el-input(v-model='form.realName', placeholder='Username', name='realName', type='text', , auto-complete='on')
    el-form-item(label="您的域名"  prop='webSiteDomain')
      el-input(v-model='form.webSiteDomain', placeholder='用于成功后回调', name='webSiteDomain', type='text', , auto-complete='on')
    el-form-item(label="手机号"  prop='phone')
      el-input(v-model='form.phone', placeholder='手机号', name='phone', type='text',  auto-complete='on')
    el-form-item(label="邀请人-ID"  prop='pId')
      el-input(v-model='form.pId', placeholder='邀请人-ID', name='pId', type='text',  auto-complete='on')
    .tips.right
      router-link(to='/login') 商户登录
    .btn
        .wrap-btn
        el-button(:loading='loading', type='primary', @click.native.prevent='handleRegister') 注 册
    
</template>

<script>
import { validUsername } from "@/utils/validate";
export default {
  name: "register",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error("Please enter the correct user name"));
    //   } else {
    //     callback();
    //   }
    // };
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error("The password can not be less than 6 digits"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      form: {
        settlementWay: "0",
        account: "",
        pwd: "",
        realName: "",
        webSiteDomain: "",
        phone: "",
        pId: ""
      },
      loginRules: {
        settlementWay: [
          { required: true, trigger: "blur", message: "请选择结算方式" }
        ],
        account: [{ required: true, trigger: "blur", message: "请输入账号" }],
        pwd: [{ required: true, trigger: "blur", message: "请输入密码" }],
        realName: [
          { required: true, trigger: "blur", message: "请输入真实姓名" }
        ],
        webSiteDomain: [
          { required: true, trigger: "blur", message: "请输入域名" }
        ],
        phone: [{ required: true, trigger: "blur", message: "请输入手机号" }]
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
  computed: {
    payWay() {
      return this.$store.state.settings.payWay;
    }
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/register", this.form)
            .then(() => {
              this.loading = false;
              this.$router.push("/login");
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

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.register-container {
  height: 100%;
  background: url("../../assets/img/bg-01.jpg") 100% 100%/100% 100% no-repeat;
  .title-container .title {
    margin-bottom: 40px;
    font-size: 30px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    >>> .el-form-item__label {
      color: #fff;
    }
  }
  .btn {
    position: relative;
    z-index: 1;
    border-radius: 50px;
    overflow: hidden;
    &:hover .wrap-btn {
      left: 0;
    }
    .wrap-btn {
      border: none;
      position: absolute;
      z-index: -1;
      width: 300%;
      height: 100%;
      background: -webkit-linear-gradient(
        right,
        #00dbde,
        #fc00ff,
        #00dbde,
        #fc00ff
      );
      top: 0;
      left: -80%;
      transition: all 0.4s;
    }
    button {
      border: none;
      outline: none;
      padding: 0 10px;
      background: transparent;
      width: 100%;
      height: 50px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
