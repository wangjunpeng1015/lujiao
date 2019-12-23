var frontUrl = window.origin
const ddPayWay = {
    //当面付款
    5: (data) => {
        const { qrUrl } = JSON.parse(data.payContent)
        window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
    },
    //(跳转)个人付款-用户手输金额
    6: (data) => {
        // const amount = data.payMoney
        const { qrUrl } = JSON.parse(data.payContent)
        window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
        window.location.href = url
        // $.modal({
        //     title: '注意！',
        //     text: `
        //           <span>1. 请输入<b>准确金额:${amount}</b></span><br/>
        //           <span style="color:red">否则无法到账！!!</span>
        //           <span>如遇无法支付提示'暂不支持此方式':<br/>
        //       1.请截图保存该页面<br/>
        //       2.打开支付宝扫一扫<br/>
        //       3.点击右上角相册选择保存的二维码支付</span><br/>
        //       <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        //         `,
        //     buttons: [
        //         {
        //             text: '支付',
        //             onClick: function () {
        //                 window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
        //                 window.location.href = url
        //             }
        //         }
        //     ]
        // })
    },
    //个人付款-自动生成金额
    7: (data) => {
        // let orderNo = data.orderNum
        const { qrUrl } = JSON.parse(data.payContent)
        let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + encodeURIComponent(qrUrl, 'UTF-8')
        window.location.href = url
        // $.modal({
        //     title: '注意！',
        //     text: `
        //     <span>此方法在某些机型、支付版版本上会出现“<b>暂不支持此种方式，请在支付宝内打开操作</b>”</span><br/>
        //     <span>如果无法支付:<br/>
        //     1.请截图保存该页面<br/>
        //     2.打开支付宝扫一扫<br/>
        //     3.点击右上角相册选择保存的二维码支付</span><br/>
        //     <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        // `,
        //     buttons: [
        //         {
        //             text: '跳转支付',
        //             onClick: function () {
        //                 let url = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + encodeURIComponent(qrUrl, 'UTF-8')
        //                 window.location.href = url
        //             }
        //         },
        //         {
        //             text: '取消',
        //             onClick: function () {
        //             }
        //         }
        //     ]
        // })
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
        let url = 'alipays://platformapi/startapp?appId=20000067&url=' + frontUrl + '/home/hb.html?' + escape(params)
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
        vant.Dialog.alert({
            message: '该方式不支付跳转，请打开微信扫一扫'
        })
        // $.modal({
        //     title: '注意！',
        //     text: `
        //   1.请截图保存该页面<br/>
        //   2.<span style="color:red">打开微信扫一扫</span><br/>
        //   3.点击右上角相册选择保存的二维码支付</span><br/>
        //   <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        // `,
        //     buttons: [
        //         {
        //             text: '确认已支付',
        //             onClick: function () {

        //             }
        //         }
        //     ]
        //     // <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrurl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        // })
    },
    17: (data) => {
        const { qrUrl } = JSON.parse(data.payContent)
        vant.Dialog.alert({
            message: '该方式不支付跳转，请打开云闪付扫一扫'
        })
        // $.modal({
        //     title: '注意！',
        //     text: `
        //       1.请截图保存该页面<br/>
        //       2.<span style="color:red">打开云闪付扫一扫</span><br/>
        //       3.点击右上角相册选择保存的二维码支付</span><br/>
        //       <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrUrl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        //     `,
        //     buttons: [
        //         {
        //             text: '若已支付，请点击此处',
        //             onClick: function () {

        //             }
        //         }
        //     ]
        //     // <img id="qrcode" src='https://tool.oschina.net/action/qrcode/generate?data=${encodeURIComponent(qrurl)}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967'/>
        // })
    },
    //支付宝扫码点单
    18: (data) => {
        const { qrUrl } = JSON.parse(data.payContent)
        window.location.href = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=' + qrUrl
    }
}