<template lang="pug">
.layout-column(style="overflow: auto")
  el-timeline
    el-timeline-item(placement="top")
      el-card(header="一、邀请商户注册或者帮助商户注册")
        ul
          li.li 邀请码可在管理系统首页头部查看
    el-timeline-item(placement="top")
      el-card(header="二、上码")
        ul
          li.li 点击菜单中支付通道配置
          li.li 点击添加账号
          li.li 根据自己的码类型来添加收款账号以及当日收款限额，保存
          li.li 找到表格中刚刚添加的账号，点击编辑按钮
          li.li 在弹窗中添加该账号下的收款方式
          li.li 按照表单内容依次填写保存
    el-timeline-item(placement="top")
      el-card(header="三、配置商户可用通道")
        ul
          li.li 点击商户管理(需要商户正确通过邀请码先注册才能有商户数据)
          li.li 点击编辑按钮
          li.li 点击添加通道
          li.li 在弹窗中配置通道以及利率保存
    el-timeline-item(placement="top")
      el-card(header="四、安装收款监控APP")
        ul
          li.li 使用后台账号密码登录即可(需要先打开支付宝、微信收款通知，测试转账一笔发现有通知栏消息即正常)
          li.li 注意不要关闭该APP，否则无法确认是否到账，只能在系统手动补单
    el-timeline-item(placement="top")
      el-card(header="五、对接商户")
        ul
          li.li 可根据菜单中帮助文档-商户API文档对接
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

<style scoped>
.li {
  margin: 5px 0;
  margin-left: 20px;
  list-style: decimal;
}
</style>


