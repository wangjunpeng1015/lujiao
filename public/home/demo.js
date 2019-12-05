// 全局变量
// const baseUrl = location.hostname + ':8092/backend'
const host = location.host
const baseUrl = 'http://' + host + '/backend'
// const frontUrl = 'http://192.168.8.110:9528'
const frontUrl = 'http://' + host
let isInPay = false
let orderNo = ''
let fiveMinsTime
// 选择金额
function chooseAmount(num) {
  $('#amount_val').val(num)
}

// 获取参数
function getUserParam(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

// 验证金额
function validateAmount() {
  if ($('#amount_val').val() === "") {
    $.alert('请先输入或选择充值金额')
    return false
  } else {
    return true
  }
}

// 获取可用通道列表
function getPayWay(value, callback) {
  $.ajax({
    type: "get",
    // url: `${baseUrl}/payConfig/findPay?value=${value}&id=${getUserParam('id')}`,
    url: `${baseUrl}/payConfig/findPay?value=${value}`,
    error: function (XHR, textStatus, errorThrown) {

    },
    success: function (data, textStatus) {
      callback(data.data)
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  })
}

// 获取可用通道列表
function getway(way) {
  if (!validateAmount()) {
    return false;
  }
  $.showPreloader('查找可用通道中...请稍后')
  let buttons1 = [
    {
      text: '请选择支付通道',
      label: true
    },
  ];
  let buttons2 = [
    {
      text: '取消',
    }
  ];
  getPayWay(way, function (menu) {
    $.hidePreloader();
    const ids = Object.keys(payWay)
    menu.map(item => {
      if (ids.includes(String(item.id))) {
        buttons1.push({
          text: item.dictValueDisplayName,
          onClick: function () {
            payWay[item.id]();
          }
        })
      }
    })
    let groups = [buttons1, buttons2];
    $.actions(groups);
  })
  return;
}

// 创建订单
function createOrder(id, callback) {
  $.showPreloader('订单创建中...请稍后')
  let data = new FormData()
  // data.append('userId', getUserParam('id'))
  data.append('money', $('#amount_val').val())
  data.append('payWayDictId', id)
  $.ajax({
    type: "POST",
    url: `${baseUrl}/order/optimalPay`,
    processData: false,//告诉jquery 不要处理发送的数据
    contentType: false,//不要设置content-Type
    data,
    error: function (XHR, textStatus, errorThrown) {
      $.hidePreloader();
      $.modal({
        title: '注意！',
        text: `
          <span>订单创建中失败，请从平台重新打开！</span>
        `,
        buttons: [
          {
            text: '确定',
            onClick: function () {

            }
          }
        ]
      })
    },
    success: function (data, textStatus) {
      $.hidePreloader();
      try {
        orderNo = data.data.data.orderNum
        callback(data.data.data)
      } catch (err) {
        $.toast(data.message);
      }
    },
  })
}

// 检测订单状态 payStatusDictId
function getOrderStatus(orderNum) {
  let siv = setInterval(() => {
    if (fiveMinsTime == 0) {
      clearInterval(siv)
    } else {
      $.ajax({
        type: "POST",
        url: `${baseUrl}/order/findOrderNum`,
        data: { orderNum: orderNo },
        success: function (data, textStatus) {
          if (data.data.payStatusDictId !== 1) {
            clearInterval(siv)
            $('#time').css('display', 'none')
            $('#status-fail').css('display', 'none')
            $('#status-success').css('display', 'block')
          }
          // clearInterval(siv)
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      })
    }
  }, 5000);
}

// 订单倒计时
function countdown() {
  if (!isInPay) {
    isInPay = true
    $('#status').removeClass('none')
    fiveMinsTime = 60 * 5
    let siv = setInterval(function () {
      fiveMinsTime = fiveMinsTime - 1
      $('#countdown').text(fiveMinsTime + '秒')
      if (fiveMinsTime == 0) {
        clearInterval(siv)
      }
    }, 1000)
    getOrderStatus()
    return true
  } else {
    $.alert('您有尚未完成订单，请稍后再试或刷新页面')
    return false
  }
}

// 格式化时间
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const payWay = {
  //当面付款
  5: () => {
    createOrder('5', function (data) {
      if (!countdown()) {
        return false
      }
      const { qrUrl } = JSON.parse(data.payContent)
      window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
    })
  },
  //(跳转)个人付款-用户手输金额
  6: () => {
    createOrder('6', function (data) {
      if (!countdown()) {
        return false
      }
      const orderNum = data.orderNum
      const amount = data.payMoney
      const { qrUrl } = JSON.parse(data.payContent)
      setTimeout(() => {
        $.hidePreloader();
        $('#orderNo').val(orderNum)
        document.getElementById('orderNo').select()
        document.execCommand('copy');
      }, 700)
      $.modal({
        title: '注意！',
        text: `
              <span>1. 请输入<b>准确金额:${amount}</b></span><br/>
              <span style="color:red">否则无法到账！!!</span>
              <span>如遇无法支付提示'暂不支持此方式':<br/>
          1.请截图保存该页面<br/>
          2.打开支付宝扫一扫<br/>
          3.点击右上角相册选择保存的二维码支付</span><br/>
          <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
            `,
        buttons: [
          {
            text: '支付',
            onClick: function () {
              window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
              window.location.href = url
            }
          }
        ]
      })
    })
  },
  //(跳转)个人付款-自动生成金额
  7: () => {
    createOrder('7', function (data) {
      if (!countdown()) {
        return false
      }
      const { qrUrl } = JSON.parse(data.payContent)
      $.modal({
        title: '注意！(demo金额都为0.01)',
        text: `
          <span>此方法在某些机型、支付版版本上会出现“<b>暂不支持此种方式，请在支付宝内打开操作</b>”</span><br/>
          <span>如果无法支付:<br/>
          1.请截图保存该页面<br/>
          2.打开支付宝扫一扫<br/>
          3.点击右上角相册选择保存的二维码支付</span><br/>
          <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        `,
        // <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrurl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        buttons: [
          {
            text: '跳转支付',
            onClick: function () {
              let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
              window.location.href = url
            }
          },
          {
            text: '取消',
            onClick: function () {
            }
          }
        ]
      })
    })
  },
  //(跳转)个人转账-自动生成金额备注
  8: () => {
    createOrder('8', function (data) {
      if (!countdown()) {
        return false
      }
      const { orderNum, payMoney } = data
      const { pId } = JSON.parse(data.payContent)
      const params = JSON.stringify({
        amount: payMoney,
        remark: orderNum,
        pId
      })
      let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/home/zhuanzhang.html?' + escape(params)
      console.log(url)
      window.location.href = url
    })
  },
  //(跳转)个人红包-自动生成金额备注
  9: () => {
    createOrder('9', function (data) {
      if (!countdown()) {
        return false
      }
      const { orderNum } = data
      const { pId, myId } = JSON.parse(data.payContent)
      const params = JSON.stringify({
        amount: $('#amount_val').val(),
        remark: orderNum,
        pId,
        myId
      })
      let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/home/hb.html?' + escape(params)
      window.location.href = url
    })
  },
  //(跳转)支付宝银行卡-隐藏卡号
  10: () => {
    createOrder('10', function (data) {
      if (!countdown()) {
        return false
      }
      const { payMoney } = data
      const {
        mark,
        bankName,
        name,
        cardIndex
      } = JSON.parse(data.payContent)
      let params = JSON.stringify({
        amount: payMoney,
        mark,
        bankName,
        name,
        cardIndex
      })

      let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/home/fly.html?' + escape(params)
      window.location.href = url
    })
  },
  11: () => {
    createOrder('11', function (data) {
      if (!countdown()) {
        return false
      }
      const { qrUrl } = JSON.parse(data.payContent)
      $.modal({
        title: '注意！',
        text: `
          1.请截图保存该页面<br/>
          2.<span style="color:red">打开微信扫一扫</span><br/>
          3.点击右上角相册选择保存的二维码支付</span><br/>
          <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        `,
        buttons: [
          {
            text: '若已支付，请点击此处',
            onClick: function () {

            }
          }
        ]
        // <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrurl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
      })
    })
  },
  17: () => {
    createOrder('17', function (data) {
      if (!countdown()) {
        return false
      }
      const { qrUrl } = JSON.parse(data.payContent)
      $.modal({
        title: '注意！',
        text: `
          1.请截图保存该页面<br/>
          2.<span style="color:red">打开云闪付扫一扫</span><br/>
          3.点击右上角相册选择保存的二维码支付</span><br/>
          <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        `,
        buttons: [
          {
            text: '若已支付，请点击此处',
            onClick: function () {

            }
          }
        ]
        // <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrurl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
      })
    })
  },
  //支付宝扫码点单
  18: () => {
    createOrder('18', function (data) {
      if (!countdown()) {
        return false
      }
      const { qrUrl } = JSON.parse(data.payContent)
      window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
    })
  }
}




function orderState() {
  let siv = setInterval(() => {
    $.ajax({
      type: "POST",
      url: `${baseUrl}/order/create`,
      data:
        JSON.stringify(
          {
            money: $('#amount_val').val(),
            payWay
          }),
      error: function (XHR, textStatus, errorThrown) {

      },
      success: function (data, textStatus) {

        clearInterval(siv)
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    })
  }, 1000);
}


// https://qr.alipay.com/fkx03562pfglokkqkpg3afa?t=1574131936724
$('.ali-methods').on('click', function () {
  getway('ali')
})
$('.wx-methods').on('click', function () {
  getway('wx')
})
$('.cloud-methods').on('click', function () {
  getway('cloud')
})

$('.b-methods').on('click', function () {
  $.toast("通道开发中...敬请期待");
  return;
  // getway('other')
})



