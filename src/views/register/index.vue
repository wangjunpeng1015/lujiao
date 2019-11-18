<template lang="pug">
.register-container
  el-form.login-form(ref='form', :model='form', :rules='loginRules', auto-complete='on', label-position='left')
    .title-container.center
      h3.title 自助申请商户
    el-form-item(label="结算方式" prop='username')
      el-select(v-model='form.type', placeholder='请选择结算方式' style="width:100%")
        el-option(v-for='item in options', :key='item.value', :label='item.label', :value='item.value')
    el-form-item(label="账号"  prop='username')
      el-input(v-model='form.username', placeholder='Username', name='username', type='text', tabindex='1', auto-complete='on')
    el-form-item(label="密码"  prop='password')
      el-input(v-model='form.password', placeholder='Password', type="password" name='password', auto-complete='on')
    el-form-item(label="真实姓名"  prop='username')
      el-input(v-model='form.username', placeholder='Username', name='username', type='text', tabindex='1', auto-complete='on')
    el-form-item(label="QQ"  prop='username')
      el-input(v-model='form.username', placeholder='Username', name='username', type='text', tabindex='1', auto-complete='on')
    el-form-item(label="邀请人-ID"  prop='username')
      el-input(v-model='form.username', placeholder='Username', name='username', type='text', tabindex='1', auto-complete='on')
    .btn
        .wrap-btn
        el-button(:loading='loading', type='primary', @click.native.prevent='handleRegister') 注 册
    
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      options: [
        {
          value: "0",
          label: "支付宝"
        },
        {
          value: "1",
          label: "微信"
        },
        {
          value: "3",
          label: "银行卡"
        }
      ],
      form: {
        type: "0",
        username: "admin",
        password: "111111"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
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
