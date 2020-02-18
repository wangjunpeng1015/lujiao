<template lang="pug">
Orders(payWayName="支付宝扫码订单" :payWayId="6")
</template>

<script>
import Orders from "@/views/orders/index";
export default {
  components: {
    Orders
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
</style>
