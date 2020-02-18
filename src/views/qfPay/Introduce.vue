<template lang="pug">
  div
    .layout-row
      .flex(style="border-right: 1px solid #DCDFE6;padding-right: 10px")
        el-divider(content-position="left") 特点
        p(v-for="(item, index) in tds" :key="index" style="margin-bottom: 15px")
          el-tag(type="primary") {{item.key}}
          el-divider(direction="vertical")
          el-link(type="primary" style="margin-left: 20px;") {{item.value}}
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      tds: [
        { key: "任意金额", value: "实时产码" },
        { key: "单笔限额", value: "单笔限额，看情况2w/5w" },
        { key: '同城收款', value: '可实现任意订单同城收款'},
        { key: '不卡钱', value: '只卡单笔'},
        {
          key: "聚合码",
          value:
            "需要商户进件"
        },
        { key: "自动回调", value: "无需安装监控软件，全自动回调" },
        { key: "无二次输入", value: "可动态实时产码，无需用户二次输入" },
      ]
    };
  }
};
</script>

