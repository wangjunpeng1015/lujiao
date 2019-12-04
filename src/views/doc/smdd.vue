<template lang="pug">
.layout-column(style="overflow: auto")
  h1
    p(style="margin-bottom: 10px") 借助支付宝“扫码点单”小程序，只需开通商家收款码即可开通
    p(style="margin-bottom: 10px") 备注号对应桌号
  el-timeline
    el-timeline-item(timestamp="第一步" placement="top")
      el-card(header="在支付宝搜索“扫码点单”小程序进行开通")
        img(:src="img1" height="300")
    el-timeline-item(timestamp="第二步" placement="top")
      el-card(header="进入商品管理，添加对应价格商品")
        img(:src="img2" height="200")
    el-timeline-item(timestamp="第三步" placement="top")
      el-card(header="添加完毕以后点击点单码生成二维码(生成后商品维护变化后点单二维码不会改变，无需再次生成)")
        img(:src="img3" height="200")
    el-timeline-item(timestamp="第四步" placement="top")
      el-card(header="选择自行答应，选择需要桌号")
        img(:src="img4" height="300")
    el-timeline-item(timestamp="第五步" placement="top")
      el-card(header="此处桌号的作用即为对应备注号，桌号可修改，例如01桌对应二维码1.png，对应标识号1")
        img(:src="img5" height="300")
    el-timeline-item(timestamp="第六步" placement="top")
      el-card(header="保存二维码、配置生成的二维码以及收款金额")
</template>

<script>
export default {
  name: 'aliPid',
  data () {
    return {
      img1: require('@/assets/img/smdd1.png'),
      img2: require('@/assets/img/smdd2.png'),
      img3: require('@/assets/img/smdd3.png'),
      img4: require('@/assets/img/smdd4.png'),
      img5: require('@/assets/img/smdd5.png')
    }
  }
}
</script>

