<template lang="pug">
.layout-column(style="overflow: auto")
  el-timeline
    el-timeline-item(timestamp="第一步" placement="top")
      el-card(header="登录支付宝官网")
        p
          span 登录支付宝:
          el-link(type="primary")
            a(href="https://www.alipay.com" target="__blank") https://www.alipay.com
    el-timeline-item(timestamp="第二步" placement="top")
      el-card(header="点击我要付款")
        img(:src="img1")
    el-timeline-item(timestamp="第三步" placement="top")
      el-card(header="点击转账到银行卡")
        img(:src="img2")
    el-timeline-item(timestamp="第四步" placement="top")
      el-card(header="选择银行卡")
        img(:src="img3")
    el-timeline-item(timestamp="第五步" placement="top")
      el-card(header="鼠标右键查看源文件")
        img(:src="img4")
    el-timeline-item(timestamp="第五步" placement="top")
      el-card(header="复制cardId")
        img(:src="img5")
</template>

<script>
export default {
  name: 'cardId',
  data () {
    return {
      img1: require('@/assets/img/card1.png'),
      img2: require('@/assets/img/card2.png'),
      img3: require('@/assets/img/card3.png'),
      img4: require('@/assets/img/card4.png'),
      img5: require('@/assets/img/card5.png'),
    }
  }
}
</script>

