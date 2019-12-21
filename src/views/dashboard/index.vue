<template lang="pug">
.dashboard-container.layout-column(style="overflow: auto")
  el-divider(content-position="left") 收款数据
  .layout-row__between
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 累计收款金额
          .money {{(amountData.all.amount / 10000).toFixed(6)}} 万
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.all.orders}}笔
        .layout-column
          div 成功率
          div.num {{amountData.all.successRate * 100}}%
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 本月收款金额
          .money {{(amountData.thisMonth.amount/10000).toFixed(6)}} 万
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.thisMonth.orders}}笔
        .layout-column
          div 成功率
          div.num {{amountData.thisMonth.successRate * 100}}%
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 昨日收款金额
          .money {{(amountData.yesterday.amount/10000).toFixed(6)}} 万
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.yesterday.orders}}笔
        .layout-column
          div 成功率
          div.num {{amountData.yesterday.successRate * 100}}%
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 今日收款金额
          .money {{(amountData.today.amount/10000).toFixed(6)}} 万
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{amountData.today.orders}}笔
        .layout-column
          div 成功率
          div.num {{amountData.today.successRate * 100}}%
    el-card(shadow="hover")
      div(slot="header")
        .layout-row__between
          div 总结算金额
          .money {{amountData.settlement.amount || 0}} 元
      .card-item.layout-row__between
        .layout-column
          div 已结算金额
          div.num {{amountData.settlement.hasBeenSettled || 0}}
        .layout-column
          div 待结算金额
          div.num {{amountData.settlement.forThe || 0}}
  el-divider(content-position="left") 昨日通道数据
  .layout-row
    el-card(shadow="hover" v-for="(item, index) in payList" v-show="item.name")
      div(slot="header")
        .layout-row__between
          div {{item.name}}
          .money {{item.amount}} 元
      .card-item.layout-row__between
        .layout-column
          div 订单数
          div.num {{item.num}}笔
        .layout-column
          div 成功率
          div.num {{item.rate}}%
  .layout-column__between(v-if="userinfo.roleId===1")
    el-divider(content-position="left") 昨日代理数据
    el-table(:data="proxyList" :stripe="true" border)
      el-table-column(label="代理名称" prop="name")
      el-table-column(label="金额" prop="amount")
      el-table-column(label="订单数量" prop="orders")
      el-table-column(label="成功率" prop="successRate")
  .layout-column__between
    el-divider(content-position="left") 昨日商户数据
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
export default {
  name: "Dashboard",
  components: {
    DatePicker,
    SettleModal
  },
  data() {
    return {
      amountData: {
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
      body: []
    };
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
    payList () {
      return [
        {
          name: '微信个码',
          amount: this.amountData.payWay['wx-个码'].amount || 0,
          num: this.amountData.payWay['wx-个码'].orders,
          rate: this.amountData.payWay['wx-个码'].successRate * 100
        },
        {
          name: '支付宝个码',
          amount: this.amountData.payWay['alipay-个码'].amount || 0,
          num: this.amountData.payWay['alipay-个码'].orders,
          rate: this.amountData.payWay['alipay-个码'].successRate * 100
        },
        {
          name: '当面付',
          amount: this.amountData.payWay['alipay-当面付原生'].amount || 0,
          num: this.amountData.payWay['alipay-当面付原生'].orders,
          rate: this.amountData.payWay['alipay-当面付原生'].successRate * 100
        },
        {
          name: '云闪付',
          amount: this.amountData.payWay['云闪付'].amount || 0,
          num: this.amountData.payWay['云闪付'].orders,
          rate: this.amountData.payWay['云闪付'].successRate * 100
        },
        {
          name: '个人红包',
          amount: this.amountData.payWay['alipay-个人红包'].amount || 0,
          num: this.amountData.payWay['alipay-个人红包'].orders,
          rate: this.amountData.payWay['alipay-个人红包'].successRate
        },
      ]
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
          this.amountData = res.data
        })
        .catch(err => {});
    },
    getBody() {
      // 昨日
      getBody({dayNum: 1}).then(res => {
        let proxy = res.data.proxy
        let merchant = res.data.merchant
        for (let key in proxy) {
          let name = key
          this.proxyList.push({
            name: key,
            amount: proxy[key].amount || 0,
            successRate: proxy[key].successRate * 100 + '%',
            orders: proxy[key].orders
          })
        }
        for (let item in merchant) {
          let name = item
          this.merchantList.push({
            name: item,
            amount: merchant[item].amount || 0,
            successRate: merchant[item].successRate * 100 + '%',
            orders: merchant[item].orders
          })
        }
      })

      // getBody({
      //   dayNum: dayjs(this.time[1]).diff(this.time[0], "day")
      // })
      //   .then(res => {
      //     this.body = res.data;
      //     this.setOption(res.data);
      //   })
      //   .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>

.dashboard-container {
  >>> .iconfont {
    width: 70px;
  }
  >>> .el-card{
    background: repeating-linear-gradient(to right, #4d83be, #334e9b);
    color: #fff;
    .el-card__header{
      border-bottom: none;
    }
  }
  .card-table{
    .el-card__body{
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
    color: #67C23A;
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
    color: #E6A23C;
    font-weight: 500;
  }
}
</style>
