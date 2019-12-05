const host = location.host
const baseUrl = 'http://' + host + '/backend'
const frontUrl = 'http://' + host
let isInPay = false
let orderNo = ''
const payWay = {
    //当面付款
    5: (data) => {
        const { qrUrl } = JSON.parse(data.payContent)
        window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
    },
    //(跳转)个人付款-用户手输金额
    6: (data) => {
        const amount = data.payMoney
        const { qrUrl } = JSON.parse(data.payContent)
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
    },
    //个人付款-自动生成金额
    7: (data) => {
        let orderNo = data.orderNum
        const { qrUrl } = JSON.parse(data.payContent)
        $.modal({
            title: '注意！',
            text: `
            <span>此方法在某些机型、支付版版本上会出现“<b>暂不支持此种方式，请在支付宝内打开操作</b>”</span><br/>
            <span>如果无法支付:<br/>
            1.请截图保存该页面<br/>
            2.打开支付宝扫一扫<br/>
            3.点击右上角相册选择保存的二维码支付</span><br/>
            <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        `,
            buttons: [
                {
                    text: '跳转支付',
                    onClick: function () {
                        let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + encodeURIComponent(qrUrl, 'UTF-8')
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
    },
    //(跳转)个人转账-自动生成金额备注
    8: (data) => {
        const { orderNum, payMoney } = data
        const { pId } = JSON.parse(data.payContent)
        const params = JSON.stringify({
            amount: payMoney,
            remark: orderNum,
            pId
        })
        let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/home/zhuanzhang.html?' + escape(params)
        window.location.href = url
    },
    //(跳转)个人红包-自动生成金额备注
    9: (data) => {
        const { orderNum, payMoney } = data
        const { pId, myId } = JSON.parse(data.payContent)
        const params = JSON.stringify({
            amount: payMoney,
            remark: orderNum,
            pId,
            myId
        })
        let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/home/zhuanzhang.html?' + escape(params)
        window.location.href = url
    },
    //(跳转)支付宝银行卡-隐藏卡号
    10: (data) => {
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
    },
    11: (data) => {
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
                    text: '确认已支付',
                    onClick: function () {

                    }
                }
            ]
            // <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrurl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        })
    },
    17: (data) => {
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
    },
    //支付宝扫码点单
    18: (data) => {
        const { qrUrl } = JSON.parse(data.payContent)
        window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
    }
}

function getUserParam(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
function createOrder() {
    let data = new FormData()
    data.append('userId', getUserParam('id'))
    data.append('money', getUserParam('amount'))
    data.append('payWay', getUserParam('type'))
    $.ajax({
        type: "POST",
        url: `${baseUrl}/order/optimalPay`,
        processData: false,//告诉jquery 不要处理发送的数据
        contentType: false,//不要设置content-Type
        data,
        error: function (XHR, textStatus, errorThrown) {
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
            try {
                //开始倒计时
                data = data.data.data
                getOrderStatus(data.orderNum)
                countdown();
                $('#orderNo').text(data.orderNum)
                $('#orderno').val(data.orderNum)
                document.getElementById('orderno').select()
                document.execCommand('copy');
                payWay[data.payWayDictId](data)
            } catch (err) {
                $.toast(data.message);
            }
        },
    })
}
// 检测订单状态 payStatusDictId
function getOrderStatus(orderNo) {
    let siv = setInterval(() => {
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
    }, 5000);
}
function countdown() {
    if (!isInPay) {
        isInPay = true
        let fiveMinsTime = 60 * 5
        let siv = setInterval(function () {
            fiveMinsTime = fiveMinsTime - 1
            $('#countdown').text(fiveMinsTime + '秒')
            if (fiveMinsTime == 0) {
                clearInterval(siv)
            }
        }, 1000)
        return true
    } else {
        $.alert('您有尚未完成订单，请稍后再试或刷新页面')
        return false
    }
}
//1.创建订单
createOrder();
// https://qr.alipay.com/fkx03562pfglokkqkpg3afa?t=1574131936724
// $('.ali-methods').on('click', function () {
//     $.showPreloader('订单创建中...请稍后')
//     let buttons1 = [
//         {
//             text: '请选择支付通道',
//             label: true
//         },
//     ];
//     let buttons2 = [
//         {
//             text: '取消',
//         }
//     ];
//     getPayWay('ali', function (menu) {
//         $.hidePreloader();
//         const ids = Object.keys(payWay)
//         menu.map(item => {
//             if (ids.includes(String(item.id))) {
//                 buttons1.push({
//                     text: item.dictValueDisplayName,
//                     onClick: function () {
//                         payWay[item.id]();
//                     }
//                 })
//             }
//         })
//         let groups = [buttons1, buttons2];
//         $.actions(groups);
//     })
//     return;
// })

// $('.wx-methods').on('click', function () {
//     $.toast("暂无可用通道");
// })

// $('.b-methods').on('click', function () {
//     $.toast("通道开发中...敬请期待");
// })

