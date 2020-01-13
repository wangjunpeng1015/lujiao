<template lang="pug">
.merchant-settting
  .merchant-info
    el-divider(content-position="left") 我的信息
    el-card(shadow="hover")
      el-row(:gutter="20")
        el-col(:span="6")
          .layout-row
            span 账号:
            span(style="margin-left: 10px;") {{userinfo.account}}
        el-col(:span="6")
          .layout-row
            span 用户名:
            span(style="margin-left: 10px;") {{userinfo.userName}}
        el-col(:span="6")
          .layout-row
            span UID:
            span(style="margin-left: 10px;") {{userinfo.uid}}
        el-col(:span="6")
          .layout-row
            span 密钥:
            span(style="margin-left: 10px;") {{userinfo.secretKey}}
  .merchant-setting(style="margin-top: 20px")
    el-divider(content-position="left") 我的配置
    el-row(:gutter="20")
      el-col(:span="24")
        el-card(header="设置" shadow="hover")
          el-form(:form="settlement" label-width="200px" label-position="left")
            el-form-item(label="下发模式:" prop="type")
              el-switch(v-model="settlement.type" active-text="USDT单笔实时结算" inactive-text="普通结算")
              div(v-show="!settlement.type")
                span 普通结算模式，系统只做记录与双方确认功能，双方线下结算
              div(v-show="settlement.type")
                span USDT单笔实时结算可每笔充值金额，实时到账商户电子钱包。需在
                el-link(type="primary" href="./#/usdtSettlement/index") USDT结算配置
                span 配置好钱包地址
            el-form-item(label="码商USDT余额预警:" prop="min" v-show="settlement.type")
              el-input(type="number" v-model="settlement.min" placeholder="码商USDT低于多少的时候，通知商户预警")
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: 'MerchantSetting',
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      settlement: {
        type: true,
        min: ''
      }
    }
  }
}
</script>
