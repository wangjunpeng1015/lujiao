<template lang="pug">
.layout-column(style="overflow: auto")
  el-timeline
    el-timeline-item(timestamp="第一步" placement="top")
      el-card(header="打开支付宝APP搜索“蚂蚁金服商家平台”点击进入")
        img(:src="img1" height="300")
    el-timeline-item(timestamp="第二步" placement="top")
      el-card(header="点击右上方开通支付图标")
        img(:src="img2" height="300")
    el-timeline-item(timestamp="第三步" placement="top")
      el-card(header="点击立即签约")
        img(:src="img3" height="300")
    el-timeline-item(timestamp="第四步" placement="top")
      el-card(header="填写信息 门头照自行解决，如去美团外卖中商家信息找别的店铺照片")
        img(:src="img4" height="300")
</template>

<script>
export default {
  name: 'aliPid',
  data () {
    return {
      img1: require('@/assets/img/f2f1.png'),
      img2: require('@/assets/img/f2f2.png'),
      img3: require('@/assets/img/f2f3.png'),
      img4: require('@/assets/img/f2f4.png'),
    }
  }
}
</script>

