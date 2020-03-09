<template lang="pug">
  div
    .layout-row
      .flex(style="border-right: 1px solid #DCDFE6;padding-right: 10px")
        el-divider(content-position="left") 特点
        p(v-for="(item, index) in tds" :key="index" style="margin-bottom: 15px")
          el-tag(type="primary") {{item.key}}
          el-divider(direction="vertical")
          el-link(type="primary" style="margin-left: 20px;") {{item.value}}
    el-divider(content-position="left") 软件下载
    el-link(type="primary" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/qfjk.apk" target="_blank") 监控软件下载
  </el-popover>
</template>

<script>
export default {
  data () {
    return {
      tds: [
        {key: '微信D0', value: '支持微信支付，可D0实时到账银行卡'},
        {key: '支付宝D0', value: '支持支付宝支付，可D0实时到账银行卡'},
        {key: '不死微信/支付宝', value: '无需支付宝/微信账号'},
        {key: '任意金额', value: '可以任意金额'},
        {key: '商户进件', value: '需商户进件'},
        {key: '可自动回调', value: '安装监控软件后可自动回调'},
      ]
    }
  }
}
</script>

