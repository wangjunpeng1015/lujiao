<template lang="pug">
.layout-column(style="overflow: auto")
  el-timeline
    el-timeline-item(timestamp="第一步" placement="top")
      el-card(header="登录支付宝开放平台, 点击进入我的开放平台")
        p(style="margin-bottom: 20px")
          el-link(type="primary")
              a(href="https://open.alipay.com/platform/home.htm" target="__blank")  https://open.alipay.com/platform/home.htm
        img(:src="img1" height="300")
    el-timeline-item(timestamp="第二步" placement="top")
      el-card(header="点击开发者中心——开发者中心概览")
        img(:src="img2" height="300")
    el-timeline-item(timestamp="第三步" placement="top")
      el-card(header="点击网页&移动应用——我的列表")
        img(:src="img3" height="300")
    el-timeline-item(timestamp="第四步" placement="top")
      el-card(header="选择已签约上线的应用点击查看详情")
        img(:src="img4" height="300")
    el-timeline-item(timestamp="第五步" placement="top")
      el-card(header="生成与配置密钥")
        p
          span 生成与配置说明参考（不要使用公钥证书）:
          el-link(type="primary")
            a(href="https://docs.open.alipay.com/291/105971/" target="__blank") https://docs.open.alipay.com/291/105971/
        p 在应用信息中配置好后，将参数填入通道参数配置中即可
    el-timeline-item(timestamp="第六步" placement="top")
      el-card(header="获取应用appid以及商户pid")
        p
          span 获取pid:
          el-link(type="primary")
            a(href="https://openhome.alipay.com/platform/accountSetting.htm" target="__blank") https://openhome.alipay.com/platform/accountSetting.htm
        img(:src="img5" height="300")
        p
          span 获取appid:
        img(:src="img6" height="300")
</template>

<script>
export default {
  name: 'aliPid',
  data () {
    return {
      img1: require('@/assets/img/f2fkey1.png'),
      img2: require('@/assets/img/f2fkey2.png'),
      img3: require('@/assets/img/f2fkey3.png'),
      img4: require('@/assets/img/f2fkey4.png'),
      img5: require('@/assets/img/f2fkey5.png'),
      img6: require('@/assets/img/f2fkey6.png'),
    }
  }
}
</script>


