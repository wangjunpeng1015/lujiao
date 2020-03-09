<template lang="pug">
.layout-column(style="overflow: auto")
  h1 IOS
  br
  el-card(header="1.用数据线将手机和电脑连接。打开iTunes，在左上角点击手机标识，如下图：" style="overflow: initial;")
    img(:src="img1" width="349")
  el-card(header="2.在摘要中不断单击”序列号“，如下图：" style="overflow: initial;")
    img(:src="img2" width="349")
  el-card(header="3.直到变为”UDID“为止，如下图：" style="overflow: initial;")
    img(:src="img3" width="349")
  br
  h1 方式二:
  br
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
  data() {
    return {
      img1: require("@/assets/img/udid-1.png"),
      img2: require("@/assets/img/udid-2.png"),
      img3: require("@/assets/img/udid-3.png")
    };
  }
};
</script>

