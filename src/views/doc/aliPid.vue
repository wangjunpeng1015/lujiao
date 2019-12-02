<template lang="pug">
.layout-column(style="overflow: auto")
  el-timeline
    el-timeline-item(timestamp="第一步" placement="top")
      el-card(header="登录支付宝官网")
        p
          span 登录支付宝:
          el-link(type="primary")
            a(href="https://openhome.alipay.com/platform/keyManage.htm?keyType=partner" target="__blank") https://openhome.alipay.com/platform/keyManage.htm?keyType=partner
    el-timeline-item(timestamp="第二步" placement="top")
      el-card(header="打开查看PID地址")
        img(:src="img")
    el-timeline-item(timestamp="第二步" placement="top")
      p 复制PID
</template>

<script>
export default {
  name: 'aliPid',
  data () {
    return {
      img: require('@/assets/img/pid1.png')
    }
  }
}
</script>

