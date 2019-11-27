const baseUrl = 'http://192.168.8.105:8092/backend'
const frontUrl = 'http://192.168.8.110:9528'

const payWay = {
    //当面付款
    5: (data) => {
        createOrder('支付宝', function (data) {

        })
    },
    //(跳转)个人付款-用户手输金额
    6: (data) => {
        let orderNo = data.orderNum
        $.modal({
            title: '注意！',
            text: `
              <span>1. 请输入<b>准确金额</b></span><br/>
              <span>2. 请在备注中输入订单号:<b>${orderNo}</b><br/>
              (已复制订单号，直接在支付宝中粘贴即可)</span><br/>
              <span style="color:red">否则可能无法到账！!!</span>
            `,
            buttons: [
                {
                    text: '支付',
                    onClick: function () {
                        // 辉：无
                        // let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=https://qr.alipay.com/fkx03502qacq8cbmglhjdea?t=1574131918077'
                        let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + data.qrcode
                        // 鹏：0.01
                        // let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=https://qr.alipay.com/fkx089790ri7t8y4qu8tde4'
                        window.location.href = url
                    }
                }
            ]
        })
    },
    //(跳转)个人付款-自动生成金额
    7: () => {
        createOrder('支付宝', function (data) {
            // let qrurl = 'https://qr.alipay.com/fkx089790ri7t8y4qu8tde4'
            // let qrurl = 'https://qr.alipay.com/fkx03936zlrnefzbooeiwe8'
            let qrurl = 'https://qr.alipay.com/bax02107ixjtebepd3j740d1'
            $.modal({
                title: '注意！(demo金额都为0.01)',
                text: `
          <span>此方法在某些机型、支付版版本上会出现“<b>暂不支持此种方式，请在支付宝内打开操作</b>”</span><br/>
          <span>如果无法支付:<br/>
          1.请截图保存该页面<br/>
          2.打开支付宝扫一扫<br/>
          3.点击右上角相册选择保存的二维码支付</span><br/>
          <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(data.qrcode)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        `,
                // <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrurl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
                buttons: [
                    {
                        text: '跳转支付',
                        onClick: function () {
                            // 辉：无
                            // let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=HTTPS://QR.ALIPAY.COM/FKX03295LG3MONLF40T42A?t=1574131918077'
                            // 鹏：0.01
                            let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + data.qrcode
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
        createOrder('支付宝', function (data) {
            $.hidePreloader();
            let uid = '2088502115132635'
            let amount = $('#amount_val').val()
            let remark = 'EU39135'
            // 坑：支付宝中只能拿到url中第一个参数
            // todo：需要在此处创建订单，在支付宝url中获取订单信息
            // let url = 'alipays://platformapi/startapp?appId=20000067&url=http://192.168.0.103:5500/zhuanzhang.html?uid=' + uid + '&amount=' + amount + '&remark=' + remark
            params = JSON.stringify({
                amount,
                uid,
                remark
            })
            let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/home/zhuanzhang.html?' + escape(params)
            window.location.href = url
        })
    },
    //(跳转)个人红包-自动生成金额备注
    9: () => {
        setTimeout(function () {
            $.hidePreloader();
            let amount = $('#amount_val').val()
            // 坑：支付宝中只能拿到url中第一个参数
            // todo：需要在此处创建订单，在支付宝url中获取订单信息
            // let url = 'alipays://platformapi/startapp?appId=20000067&url=http://192.168.0.103:5500/zhuanzhang.html?uid=' + uid + '&amount=' + amount + '&remark=' + remark
            let url = 'alipays://platformapi/startapp?appId=20000067&url=http://192.168.8.104:5500/hb.html?amount=' + amount
            window.location.href = url
        }, 1000);
    },
    //(跳转)支付宝银行卡-隐藏卡号
    10: () => {
        setTimeout(function () {
            $.hidePreloader();
            let cardIndex = '1607121556258423195'
            let params = {
                amount: getUserParam('amount'),
                cardIndex
            }
            let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/fly.html?amount=' + escape(params)
            window.location.href = url
        }, 1000);
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
// function getPayWay(value, callback) {
//     $.ajax({
//         type: "get",
//         url: `${baseUrl}/payConfig/findPay?value=${value}&id=${getUserParam('id')}`,
//         error: function (XHR, textStatus, errorThrown) {

//         },
//         success: function (data, textStatus) {
//             callback(data.data)
//         },
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//         }
//     })
// }
function createOrder() {
    let data = new FormData()
    data.append('userId', getUserParam('id'))
    data.append('money', getUserParam('amount'))
    data.append('payWay', getUserParam('type'))
    $.ajax({
        type: "POST",
        url: `${baseUrl}/order/create`,
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
            //开始倒计时
            countdown();
            $('#orderNo').text(data.data.orderNum)
            $('#orderno').text(data.data.orderNum)
            document.getElementById('orderno').select()
            document.execCommand('copy');
            payWay[data.data.payWayDictId](data.data)
        },
    })
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
function countdown() {
    $('#status').removeClass('none')
    // let time = new Date().getTime()
    let fiveMinsTime = 60 * 5
    let siv = setInterval(function () {
        fiveMinsTime = fiveMinsTime - 1
        $('#countdown').text(fiveMinsTime + '秒')
        if (fiveMinsTime == 0) {
            clearInterval(siv)
        }
    }, 1000)
}
//1.创建订单
// createOrder();
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

