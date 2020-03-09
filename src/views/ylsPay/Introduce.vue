<template lang="pug">
  div
    .layout-row
      .flex(style="border-right: 1px solid #DCDFE6;padding-right: 10px")
        el-divider(content-position="left") 特点
        p(v-for="(item, index) in tds" :key="index" style="margin-bottom: 15px")
          el-tag(type="primary") {{item.key}}
          el-divider(direction="vertical")
          el-link(type="primary" style="margin-left: 20px;") {{item.value}}
        el-divider(content-position="left") 文档
        el-link(target="_blank" type="primary" href="https://lx-assets-public-001.oss-cn-zhangjiakou.aliyuncs.com/%E4%BA%91%E9%9D%93%E5%88%B7%E5%BC%80%E5%8F%B7%E4%B8%8A%E7%A0%81%E6%B5%81%E7%A8%8B.docx") 开号上码流程
  </el-popover>
</template>

<script>
export default {
  data () {
    return {
      tds: [
        {key: '任意金额', value: '非固定金额模式，可以任意金额'},
        {key: '单笔限额', value: '单笔限额，看情况1000/5000'},
        {key: '进件', value: '开户需营业执照+支付宝账号(个码也可以)，一个营业执照下可挂多个个码'},
        {key: '自动回调', value: '无需安装监控软件，全自动回调'},
        {key: '无二次输入商户码', value: '可动态实时产码，无需用户二次输入'},
        {key: '可24小时', value: '可24小时跑量'},
        {key: '当面付', value: '账号需开通当面付，可由我们帮开（有概率开出D0）'}
      ]
    }
  }
}
</script>

