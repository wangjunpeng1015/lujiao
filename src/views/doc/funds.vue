<template lang="pug">
  div(style="overflow:auto")
    el-timeline
      el-timeline-item(placement="top")
          el-card(header="配置注意事项：")
            ul
              li.li 添加收款通道备注请一定按照 收款班级-收款原由 的格式填写，以方便查找订单进行手动回调
              li.li 每个班级每天只能生成5个收款码，但班级可以创建多个
              img(:src="img3" width="30%")
              li.li 如果确定用户是否收到款项：
                p(style="margin-top:10px") 在经费小程序中查看对应班级
                p(style="margin-top:10px") 点击收支明细
                p(style="margin-top:10px") 选择对应的收款理由
                p(style="margin-top:10px") 点击收款情况栏
      el-timeline-item(placement="top")
        el-card(header="一、开通轻松经费")
          ul
            li.li 在支付宝中搜索轻松经费开通
            li.li 点击创建班级，发起收款
      el-timeline-item(placement="top")
        el-card(header="二、创建收款码")
          ul
            li.li 填入班级名称、人均金额(即收款金额)、收款理由保存
            li.li 点击创建班级，发起收款
            li.li 保存当前收款码（记住金额，配置的时候需要使用）
            li.li 可以创建多个班级，每个班级每天可发起5次收款
            li.li 如需添加更多收款码，可以点击页面收款，选择活动报名收款，依次填写保存即可

            img(:src="img1" width="40%" style="margin-right: 10px")
            img(:src="img2" width="40%")
      el-timeline-item(placement="top")
        el-card(header="三、配置通道")
          ul
            li.li 依次添加账号、编辑、添加通道填写即可
            li.li 注意金额一定要和二维码匹配！！！
</template>

<script>
export default {
  name: 'cardId',
  data () {
    return {
      img1: require('@/assets/img/jf1.jpeg'),
      img2: require('@/assets/img/jf2.jpeg'),
      img3: require('@/assets/img/jf3.png')
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
