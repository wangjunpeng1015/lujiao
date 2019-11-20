<template lang="pug">
.dashboard-container
  .box-card.layout-row__between
    el-card
      .title 订单总数
      .num 0
      .unit 笔
      .field
        span 当前时间
        span {{ new Date() }}
    el-card
      .title 商户数量
      .num 0
      .unit 位
      .field
        span 当前版本
        span {{ new Date() }}
    el-card
      .title 总计余额
      .num 0
      .unit 元
      .field
        span 推荐好友
        span {{ new Date() }}
    el-card
      .title 结算余额
      .num 0
      .unit 元
      .field
        span 程序购买
        span {{ new Date() }}
  .wjp-title
    h3 收益查询
  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
