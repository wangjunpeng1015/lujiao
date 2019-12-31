<template lang="pug">
.layout-column(style="overflow: auto")
  #doc1
    h1.line.layout-row
      span(style="margin-right: 10px;align-self:center") 1.
      el-tag(size="small" style="align-self:center") 创建订单
    h1.line 地址: http://39.99.177.97:8097/backend/order/optimalPay
    p.line 用户在商户应用选择对应方式、金额后，应用跳转到网页进行支付
    p.line 支付页面: http://39.99.177.97/home/pay.html?orderNo={orderNo}
    p.line 方式：POST
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
    p.line 用户支付成功后，由支付系统向商户应用发送post请求通知
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
          paramName: "merchantNum",
          exp: "UID",
          type: "String",
          desc: "商户UID",
          isRequired: "是"
        },
        {
          paramName: "merchantOrderNo",
          exp: "商户系统订单号",
          type: "String",
          desc: "商户系统订单号",
          isRequired: "是"
        },
        {
          paramName: "sign",
          exp: "签名",
          type: "String",
          desc: "md5(商户号+支付金额+商户秘钥)",
          isRequired: "是"
        },
        {
          paramName: "money",
          exp: "充值金额",
          type: "String",
          desc: "用户充值的金额",
          isRequired: "是"
        },
        {
          paramName: "payWay",
          exp: "支付方式",
          type: "String",
          desc: "支付方式(支付通道账户类型) ali/wx",
          isRequired: "是"
        },
        {
          paramName: "ip",
          exp: "用户IP",
          type: "String",
          desc: "非必填",
          isRequired: "否"
        },
        {
          paramName: "remark",
          exp: "自定义数据",
          type: "String",
          desc: "自定义数据（回调的时候返回）",
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
          paramName: "merchantOrderNo",
          exp: "商户订单号",
          type: "String",
          desc: "商户订单号"
        },
        {
          paramName: "status",
          exp: "支付状态",
          type: "String",
          desc: "SuccessPay=成功 FailurePay=失败"
        },
        {
          paramName: "actualAmount",
          exp: "支付金额",
          type: "String",
          desc: "支付金额"
        },
        {
          paramName: "sign",
          exp: "签名",
          type: "String",
          desc: "md5(orderNo+merchantOrderNo+actualAmount+商户秘钥)"
        },
        {
          paramName: "remark",
          exp: "商户创建订单时候传得备注",
          type: "String",
          desc: "商户创建订单时候传得备注"
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


