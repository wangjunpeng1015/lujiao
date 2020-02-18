<template lang="pug">
Orders(payWayName="宝转卡订单" :payWayId="10")
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
