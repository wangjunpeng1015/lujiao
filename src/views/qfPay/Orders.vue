<template lang="pug">
Orders(payWayName="钱方订单" ,:payWayId="26" ,:isQF="true")
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
