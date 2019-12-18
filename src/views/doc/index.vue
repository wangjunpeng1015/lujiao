<template lang="pug">
.layout-column(style="overflow: auto")
  #doc1
    h1.line.layout-row
      span(style="margin-right: 10px;align-self:center") 1.
      el-tag(size="small" style="align-self:center") 发起支付请求
    h1.line 地址: http://pay.z-deer.com/backend/order/optimalPay
    p.line 用户在商户应用选择对应方式、金额后，应用跳转到网页进行支付
    h1.line 参数说明:
    el-table(:data="createOrderParams" style="width: 100%" border stripe)
      el-table-column(prop="paramName" label="参数名")
      el-table-column(prop="exp" label="含义")
      el-table-column(prop="isRequired" label="是否必填")
      el-table-column(prop="type" label="类型")
      el-table-column(prop="desc" label="说明")

    h1.line.layout-row(style="margin-top: 20px;margin-bttom: 10px")
      span(style="margin-right: 10px;align-self:center") 1.
      el-tag(size="small" style="align-self:center") 异步通知
    p.line 用户支付成功或失败过后，由支付系统向商户应用发送post请求通知
    p.line 方式: POST
    h1.line 参数说明:
    el-table(:data="notifyParams" style="width: 100%" border stripe)
      el-table-column(prop="paramName" label="参数名")
      el-table-column(prop="exp" label="含义")
      el-table-column(prop="type" label="类型")
      el-table-column(prop="desc" label="说明")
</template>

<script>
export default {
  name: "doc",
  data() {
    return {
      createOrderParams: [
        {
          paramName: "type",
          exp: "支付类型",
          type: "String",
          desc: "1=支付宝 2=微信",
          isRequired: "是"
        },
        {
          paramName: "uid",
          exp: "商户ID",
          type: "String",
          desc: "商户应用的用户ID",
          isRequired: "是"
        },
        {
          paramName: "userId",
          exp: "自定义用户id",
          type: "String",
          desc: "商户应用的用户ID",
          isRequired: "是"
        },
        {
          paramName: "addData",
          exp: "自定义附加数据",
          type: "String",
          desc: "商户应用的附加数据",
          isRequired: "否"
        },
        {
          paramName: "amount",
          exp: "支付金额",
          type: "Number",
          desc: "支付金额",
          isRequired: "是"
        },
        {
          paramName: "goodsName",
          exp: "商品名称",
          type: "String",
          desc: "商品名称",
          isRequired: "否"
        }
      ],
      notifyParams: [
        {
          paramName: "orderNo",
          exp: "支付订单号",
          type: "String",
          desc: "支付订单号"
        },
        {
          paramName: "status",
          exp: "支付状态",
          type: "String",
          desc: "success=成功 fail=失败"
        },
        {
          paramName: "price",
          exp: "支付金额",
          type: "String",
          desc: "支付金额"
        },
        {
          paramName: "type",
          exp: "支付类型",
          type: "String",
          desc: "1=支付宝 2=微信"
        },
        {
          paramName: "userId",
          exp: "自定义用户名",
          type: "String",
          desc: "商户网站/APP的用户ID"
        },
        {
          paramName: "uid",
          exp: "商户ID",
          type: "String",
          desc: "商户应用的用户ID"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 16px;
}
.line {
  margin-bottom: 10px;
}
</style>


