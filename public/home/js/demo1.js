let money = 1
function chooseAmount(val) {
  $('#amount_val').val(val)
  money = val
}
function pay(payWayId, payWay, payWayMethod) {
  createOrder(payWayId, payWay, payWayMethod)
}
function createOrder(payWayId, payWay, payWayMethod) {
  var sign = md5('TFVO1580968457983' + money + 'e42d167a46b496c42202152620427e69');
  let param = {
    merchantNum: 'TFVO1580968457983',
    payWay: payWay,
    payWayId: payWayId,
    money: money,
    merchantOrderNo: '收银台测试订单',
    ip: '0.0.0.0',
    sign: sign
  }
  if (payWayMethod) {
    param.payWayType = payWayMethod
  }
  $.ajax({
    url: 'http://39.98.84.232:8092/backend/order/optimalPay',
    type: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: param,
    success: function (data) {
      if (data.success && data.message === '下单成功') {
        window.location.href = 'http://39.98.84.232:8092/home/pay.html?orderNo=' + data.data
        return false
      } else {
        $.alert(data.message)
        return false
      }
    }
  })
}
