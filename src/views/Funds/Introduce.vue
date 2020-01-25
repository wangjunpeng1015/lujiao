<template lang="pug">
  div
    .layout-row
      .flex(style="border-right: 1px solid #DCDFE6;padding-right: 10px")
        el-divider(content-position="left") 特点
        p(v-for="(item, index) in tds" :key="index" style="margin-bottom: 15px")
          el-tag(type="primary") {{item.key}}
          el-divider(direction="vertical")
          el-link(type="primary" style="margin-left: 20px;") {{item.value}}
      .flex(style="margin-left: 20px")
        el-divider(content-position="left") 防风控建议
        p(v-for="(item, index) in fks" :key="index" style="margin-bottom: 15px")
          el-tag(type="primary") {{item.key}}
          el-divider(direction="vertical")
          el-link(type="primary" style="margin-left: 20px;") {{item.value}}
    el-divider(content-position="left") 软件下载
    el-link(type="primary" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/zfb10.1.38.apk" target="_blank") 支付宝10.1.38
    el-link(type="primary" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/VirtualXposed_0.18.0.apk" target="_blank" style="margin: 0 20px;") VirtualXposed
    el-link(type="primary" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/com.alibill.apk" target="_blank") 监控回调APP
    el-divider(content-position="left") 文档下载
    el-link(type="primary" target="_blank" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/%E7%BB%8F%E8%B4%B9%E4%B8%8A%E7%A0%81%E6%95%99%E7%A8%8B.docx") 上码教程
    el-link(type="primary" style="margin: 0 20px;" target="_blank" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/%E9%98%B2%E9%A3%8E%E6%8E%A7%E4%BA%A7%E7%A0%81%E6%95%99%E7%A8%8B.docx") 产码教程
    el-link(type="primary" target="_blank" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/%E4%BA%91%E6%89%8B%E6%9C%BA%E6%8C%82%E7%9B%91%E6%8E%A7%E6%B5%81%E7%A8%8B.docx") 挂监控教程
  </el-popover>
</template>

<script>
export default {
  data () {
    return {
      tds: [
        {key: '小额', value: '建议金额不超过500'},
        {key: '风控小', value: '市场跑此模式的少(不好自动回调)，所以风控较少'},
        {key: '固定金额', value: '金额只能事先设置好，比如49/99/199等固定金额'},
        {key: '自动回调', value: '安装好监控软件后，可自动回调'},
        {key: '极小概率漏单', value: '特定情况下会发生漏单情况'},
        {key: '个码', value: '个码可开通此功能, 企业支付宝无法使用'},
        {key: '可24小时', value: '可24小时跑量'},
        {key: '资金直到余额', value: '资金直到支付宝余额'}
      ],
      fks: [
        {key: '班级名称', value: '设置班级名称为“杭州轻松教育有限公司”'},
        {key: '收款理由', value: '设置班级名称为“杭州轻松教育有限公司”'},
        {key: '收款金额', value: '建议不要设置整百'}
      ]
    }
  }
}
</script>

