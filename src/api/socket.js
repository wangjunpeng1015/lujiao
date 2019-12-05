import Vue from 'vue'
let websock = null
let reTime = 5
const EventBus = new Vue();
Vue.prototype.$websock = websock
Vue.prototype.$eventBus = EventBus
const socketUrl = process.env.NODE_ENV === 'production' ? 'ws://103.143.80.128:8092' : 'ws://192.168.8.105:8092'
// 初始化weosocket

function initWebSocket(account) {
    // ws地址 -->这里是你的请求路径
    let ws = `${socketUrl}/backend/`
    websock = new WebSocket(ws)
    // websock = new WebSocket('ws://localhost:9999')
    websock.onmessage = function (e) {
        const data = JSON.parse(e.data)
        const keys = Object.keys(data)
        EventBus.$emit(keys[0], data[keys[0]])
    }
    websock.onclose = function (e) {
        websocketclose(e)
    }
    websock.onopen = function () {
        websocketOpen()
        reTime = 5
    }
    // 连接发生错误的回调方法
    websock.onerror = function () {
        if (reTime > 0) {
            console.log('WebSocket尝试重新连接---' + reTime)
            setTimeout(() => {
                initWebSocket(account)
            }, 3000)
        }
        reTime--
    }
}

// 实际调用的方法
function sendSock(agentData) {
    if (websock.readyState === websock.OPEN) {
        // 若是ws开启状态
        websocketsend(agentData)
    } else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData)
        }, 1000)
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData)
        }, 1000)
    }
}

// 数据发送
function websocketsend(agentData) {
    websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose(e) {
    console.log('socket连接关闭 (' + e.code + ')')
}

// 创建 websocket 连接
function websocketOpen(e) {
    console.log('socket连接成功')
}
EventBus.$on('wsSend', (key, data) => {
    sendSock({ key: data })
})
// 将方法暴露出去
export {
    initWebSocket
}
