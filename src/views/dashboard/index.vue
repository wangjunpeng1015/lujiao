<template lang="pug">
.dashboard-container.layout-column(style="overflow: auto")
  .layout-row__between
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 累计入金
          .money {{amountData.all.amount}}
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.all.orders}}笔
        .layout-column
          div 成功率
          div.num {{(amountData.all.successRate * 100).toFixed(2)}}%
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 本月入金
          .money {{amountData.thisMonth.amount}}
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.thisMonth.orders}}笔
        .layout-column
          div 成功率
          div.num {{(amountData.thisMonth.successRate * 100).toFixed(2)}}%
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 昨日入金
          .money {{amountData.yesterday.amount}}
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.yesterday.orders}}笔
        .layout-column
          div 成功率
          div.num {{(amountData.yesterday.successRate * 100).toFixed(2)}}%
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 今日入金
          .money {{amountData.today.amount}}
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.today.orders}}笔
        .layout-column
          div 成功率
          div.num {{(amountData.today.successRate * 100).toFixed(2)}}%
  //- el-divider(content-position="left") 昨日通道数据
  //- el-table(:data="payWayList" :stripe="true" border)
  //-   el-table-column(label="通道名称" prop="name")
  //-   el-table-column(label="订单金额" prop="amount")
  //-   el-table-column(label="订单数量" prop="orders")
  //-   el-table-column(label="成功率" prop="successRate")
  el-divider(content-position="left")
    el-select(v-model="dayNum" size="mini" @change="getBody")
      el-option(label="昨日数据" :value="1")
      el-option(label="今日实时数据" :value="0")
  el-collapse(v-model="activeNames")
    el-collapse-item(title='代理数据', name='1' v-if="userinfo.roleId===1")
      el-table(:data="proxyList" :stripe="true" border)
        el-table-column(label="代理名称" prop="name")
        el-table-column(label="金额" prop="amount")
        el-table-column(label="订单数量" prop="orders")
        el-table-column(label="成功率" prop="successRate")
    el-collapse-item(title='商户数据', name='2' v-if="userinfo.roleId === 3 || userinfo.roleId ===1")
      el-table(:data="merchantList" :stripe="true" border)
        el-table-column(label="商户名称" prop="name")
        el-table-column(label="金额" prop="amount")
        el-table-column(label="订单数量" prop="orders")
        el-table-column(label="成功率" prop="successRate")
  SettleModal(:visible.sync="visible")
</template>

<script>
import echarts from "echarts";
import { drawLine } from "@/utils/echarts";
import DatePicker from "@/components/DatePicker";
import SettleModal from "@/components/Settlement";
import { getHead, getBody } from "@/api/index";
import { mapGetters, mapState } from "vuex";
import dayjs from "dayjs";
import { uniqBy, sortBy } from "lodash";
let line;
const NAME_MAP = {
  'alipay-当面付原生': '当面付',
  'alipay-yls': '云靓刷',
  'alipay-轻松经费': '经费',
  'alipay-个码': '支付宝个码',
  'alipay-转账码(自动金额)': '支付宝转账码',
  'wx-个码': '微信个码',
  'alipay-飞行转卡': '支付宝转卡',
  '钱方通道-H5': '钱方H5'
}
export default {
  name: "Dashboard",
  components: {
    DatePicker,
    SettleModal
  },
  data() {
    return {
      activeNames: ["1", "2"],
      amountData: {
        payWay: {
          "alipay-当面付原生": {},
          "alipay-个码": {},
          "wx-个码": { amount: 0 },
          云闪付: {},
          "alipay-个人红包": {}
        },
        all: {
          amount: 0,
          successRate: 0,
          orders: 0
        },
        yesterday: {
          amount: 0,
          successRate: 0,
          orders: 0
        },
        today: {
          amount: 0,
          successRate: 0,
          orders: 0
        },
        payWay: {},
        thisMonth: {
          amount: 0,
          successRate: 0,
          orders: 0
        },
        settlement: {
          amount: null,
          hasBeenSettled: null,
          forThe: null
        }
      },
      merchantList: [],
      proxyList: [],
      visible: false,
      version: "1.0.0",
      time: [
        dayjs()
          .subtract(0, "day")
          .format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      ],
      nowTime: new dayjs().format("YYYY-MM-DD HH:mm:ss"),
      list: {
        orders: 0,
        merchants: 0,
        code_merchants: 0,
        merchant_num: 0,
        aggregate: 0,
        settlementSuccessMoney: 0,
        successRate: {}
      },
      dayNum: 0,
      body: [],
      payWayList: []
    };
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
    payList() {
      return [
        {
          name: "微信个码",
          amount: this.amountData.payWay["wx-个码"].amount || 0,
          num: this.amountData.payWay["wx-个码"].orders,
          rate: this.amountData.payWay["wx-个码"].successRate * 100
        },
        {
          name: "支付宝个码",
          amount: this.amountData.payWay["alipay-个码"].amount || 0,
          num: this.amountData.payWay["alipay-个码"].orders,
          rate: this.amountData.payWay["alipay-个码"].successRate * 100
        },
        {
          name: "当面付",
          amount: this.amountData.payWay["alipay-当面付原生"].amount || 0,
          num: this.amountData.payWay["alipay-当面付原生"].orders,
          rate: this.amountData.payWay["alipay-当面付原生"].successRate * 100
        },
        {
          name: "云闪付",
          amount: this.amountData.payWay["云闪付"].amount || 0,
          num: this.amountData.payWay["云闪付"].orders,
          rate: this.amountData.payWay["云闪付"].successRate * 100
        },
        {
          name: "个人红包",
          amount: this.amountData.payWay["alipay-个人红包"].amount || 0,
          num: this.amountData.payWay["alipay-个人红包"].orders,
          rate: this.amountData.payWay["alipay-个人红包"].successRate
        }
      ];
    },
    hasPermission() {
      return !!this.userinfo.roles.filter(n => n.id == 1 || n.id == 2).length;
    }
  },
  created() {
    this.getHead();
    this.getBody();
  },
  methods: {
    getHead() {
      getHead()
        .then(res => {
          this.amountData = res.data;
          let payWays = res.data.payWay
          for (let key in payWays) {
            if (payWays[key].orders !== 0) {
              this.payWayList.push({
                name: NAME_MAP[key],
                amount: payWays[key].amount,
                successRate: (payWays[key].successRate * 100).toFixed(2) + '%',
                orders: payWays[key].orders
              })
            }
          }
        })
        .catch(err => {});
    },
    getBody() {
      // 昨日
      getBody({ dayNum: this.dayNum }).then(res => {
        let proxy = res.data.proxy;
        let merchant = res.data.merchant;
        this.proxyList = []
        this.merchantList = []
        for (let key in proxy) {
          let name = key;
          if (proxy[key].orders !== 0) {
            this.proxyList.push({
              name: key,
              amount: proxy[key].amount || 0,
              successRate: (proxy[key].successRate * 100).toFixed(2) + "%",
              orders: proxy[key].orders
            });
          }
        }
        for (let item in merchant) {
          let name = item;
          if (merchant[item].orders !== 0) {
            this.merchantList.push({
              name: item,
              amount: merchant[item].amount || 0,
              successRate: (merchant[item].successRate * 100).toFixed(2) + "%",
              orders: merchant[item].orders
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  >>> .iconfont {
    width: 70px;
  }
  >>> .el-card {
    background: repeating-linear-gradient(to right, #4d83be, #334e9b);
    color: #fff;
    .el-card__header {
      border-bottom: none;
    }
  }
  .card-table {
    .el-card__body {
      padding: 5px;
    }
  }
  .title {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
    height: 22px;
  }
  .num {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: #67c23a;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 38px;
    height: 38px;
  }
  .field {
    padding-top: 9px;
    margin-top: 8px;
    border-top: 1px solid #e8e8e8;
    box-sizing: border-box;
    span:nth-of-type(2) {
      margin-left: 10px;
    }
  }
  .el-card {
    width: 100%;
  }
  .line {
    height: 300px;
  }
  .rate {
    margin-top: 20px;
    label {
      font-size: 24px;
      display: inline-block;
      width: 300px;
    }
    span {
      font-size: 24px;
    }
  }
  .money {
    margin-left: 15px;
    font-size: 18px;
    color: #e6a23c;
    font-weight: 500;
  }
}
</style>
