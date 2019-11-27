<template lang="pug">
.dashboard-container
  el-row.box-card(type="flex" justify="center" align="middle" :gutter="20")
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6" )
      el-card
        .title 订单总数
        .num {{ list.orders }}
        .unit 笔
        .field
          span 当前时间
          span {{ nowTime }}
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6")
      el-card
        .title 商户数量
        .num {{ list.merchants }}
        .unit 位
        .field
          span 当前版本
          span {{ version }}
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6")
      el-card
        .title 总计余额
        .num {{ list.aggregate }}
        .unit 元
        .field
          span(@click="copy") 推荐好友  
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6")
      el-card
        .title 结算余额
        .num {{ list.settlementMoney }}
        .unit 元
        .field
          span 程序购买
          span {{ }}
  .wjp-title
    el-divider(content-position='left') 收益查询
  .wjp-tools.layout-row.align-center.justify-end
    Date-picker.time-picker(@change="getBody" ,:date.sync="time")
  el-row(type="flex" justify="center" align="middle")
    el-col.layout-row.align-center(:md="24" :lg="8" :xl="8")
      svg.iconfont(aria-hidden='true')
        use(xlink:href='#icon-zhifubao')
      .money {{ aliSum}} ￥
    el-col.layout-row.align-center(:md="24" :lg="8" :xl="8")
      svg.iconfont(aria-hidden='true')
        use(xlink:href='#icon-weixin')
      .money {{ wxSum }} ￥
    //- el-col.layout-row.align-center(:md="24" :lg="12" :xl="6")
    //-   svg.iconfont(aria-hidden='true' style="width:200px")
    //-     use(xlink:href='#icon-yinhangqia')
    //-   .money(style="margin-left:0") {{ 4 }} ￥
    el-col.layout-row.align-center(:md="24" :lg="8" :xl="8")
      span.font-60 总计
      .money {{ Number(wxSum)+Number(aliSum) }} ￥
  .line
</template>

<script>
import echarts from "echarts";
import { drawLine } from "@/utils/echarts";
import DatePicker from "@/components/DatePicker";
import { getHead, getBody } from "@/api/index";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import { uniqBy, sortBy } from "lodash";
import { debuggerStatement } from "babel-types";
import { options } from "runjs";
let line;
export default {
  name: "Dashboard",
  components: {
    DatePicker
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  data() {
    return {
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
        aggregate: 0,
        settlementMoney: 0
      },
      body: []
    };
  },
  computed: {
    wxSum() {
      let obj = this.body.filter(item => item.name == "微信");
      return obj.reduce((total, val) => {
        return total + Number(val.sum);
      }, 0);
    },
    aliSum() {
      let obj = this.body.filter(item => item.name == "支付宝");
      return obj.reduce((total, val) => {
        return total + Number(val.sum);
      }, 0);
    }
  },
  created() {
    this.getHead();
    this.getBody();
  },
  mounted() {
    this.$nextTick(() => {
      line = echarts.init(this.$el.querySelector(".line"));
    });
  },
  methods: {
    setOption(data) {
      data = sortBy(data, "time");
      let xAxis = uniqBy(data, "time").map(item => item.time);
      let option = {
        name: ["支付宝", "微信"],
        data: [[], []],
        xAxis
      };
      xAxis.map(time => {
        let obj = data.filter(item => item.time == time);
        let zfb = obj.find(item => item.name == "支付宝");
        let wx = obj.find(item => item.name == "微信");
        option.data[0].push((zfb && zfb.sum) || 0);
        option.data[1].push((wx && wx.sum) || 0);
      });
      line.setOption(drawLine(option), true);
    },
    copy() {
      // `${website}/#/register?pid=${userinfo.id}`
    },
    getHead() {
      getHead()
        .then(res => {
          this.list = res.data;
        })
        .catch(err => {});
    },
    getBody() {
      getBody({
        dayNum: dayjs(this.time[1]).diff(this.time[0], "day")
      })
        .then(res => {
          this.body = res.data;
          this.setOption(res.data);
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  >>> .iconfont {
    width: 70px;
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
    color: rgba(0, 0, 0, 0.85);
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
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
  .money {
    margin-left: 15px;
    font-size: 40px;
  }
}
</style>
