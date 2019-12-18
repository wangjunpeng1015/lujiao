<template lang="pug">
.register-container
  el-form.login-form(ref='form', :model='form', :rules='loginRules',label-width="90px" auto-complete='on', label-position='left')
    .title-container.center
      h3.title 自助申请商户
    el-form-item(label="用户类型"  prop='roleIds')
      el-select(style="width: 100%" v-model="form.roleIds")
        el-option(v-for='(item,i) in roles' :key="i" :label="item.roleName" :value="item.id")
    el-form-item(label="账号"  prop='account')
      el-input(v-model='form.account', placeholder='账号', name='account', type='text',  auto-complete='on')
    el-form-item(label="密码"  prop='userPassword')
      el-input(v-model='form.userPassword', placeholder='密码', type="password" name='userPassword', auto-complete='on')
    el-form-item(label="手机号"  prop='phone')
      el-input(v-model='form.phone', placeholder='手机号',  name='phone', auto-complete='on')
    //- el-form-item(label="真实姓名"  prop='userName')
    //-   el-input(v-model='form.userName', placeholder='真实姓名', name='userName', type='text', , auto-complete='on')
    //- el-form-item(label="您的域名"  prop='webSiteDomain')
    //-   el-input(v-model='form.webSiteDomain', placeholder='用于成功后回调', name='webSiteDomain', type='text', , auto-complete='on')
    //- el-form-item(label="手机号"  prop='phone')
    //-   el-input(v-model='form.phone', placeholder='手机号', name='phone', type='text',  auto-complete='on')
    //- el-form-item(label="结算方式" prop='settlementWay')
    //-   el-select(v-model='form.settlementWay', placeholder='请选择结算方式' style="width:100%")
    //-     el-option(v-for='item in payWay', :key='item.value', :label='item.label', :value='item.value')
    //- el-form-item(label="结算账号"  prop='settlementAccount')
    //-   el-input(v-model='form.settlementAccount', placeholder='结算账号', name='settlementAccount', type='text', , auto-complete='on')
    el-form-item(label="邀请人账号"  prop='parentAccount' v-if="form.roleIds == 3")
      el-input(v-model='form.parentAccount', placeholder='邀请人账号(可不填)', name='parentAccount', type='text',  auto-complete='on')
    .tips.right
      router-link(to='/login') 商户登录
    .btn
        .wrap-btn
        el-button(:loading='loading', type='primary', @click.native.prevent='handleRegister') 注 册

</template>

<script>
import { getRoles } from "@/api/user";
import { validPassword, validPhone } from "@/utils/validate";
export default {
  name: "register",
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
      roles: [],
      payWay: [
        {
          value: "支付宝",
          label: "支付宝"
        },
        {
          value: "微信",
          label: "微信"
        },
        {
          value: "银行卡",
          label: "银行卡"
        }
      ],
      form: {
        roleIds: "",
        account: "",
        userPassword: "",
        phone: "",
        parentAccount: ""
      },
      loginRules: {
        roleIds: [
          { required: true, trigger: "change", message: "请选择用户类型" }
        ],
        account: [{ required: true, trigger: "blur", message: "请输入账号" }],
        userPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validPhones, trigger: "blur" }]
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
  computed: {},
  mounted() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      getRoles().then(res => {
        this.roles = res.data;
      });
    },
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let params = {
            ...this.form
          };
          params.roleIds = [params.roleIds];
          this.$store
            .dispatch("user/register", params)
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
