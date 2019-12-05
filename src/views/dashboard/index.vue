<template lang="pug">
.dashboard-container.layout-column
  el-row.box-card( :gutter="20")
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6" )
      el-card
        .title 今日订单总数
        .num {{ list.orders }}
          span.unit  笔
        //- .field
        //-   span 当前时间
        //-   span {{ nowTime }}
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6")
      el-card
        .title 商户/应用数量
        .num {{ list.merchants }}/{{ list.merchants }}
          span.unit  个
        //- .field
        //-   span 当前版本
        //-   span {{ version }}
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6")
      el-card
        .title 总计余额
        .layout-row__between
          .num {{ list.aggregate }}
            span.unit 元
          el-button(@click="visible=true" type="text") 申请提现
        //- .field
        //-   span(@click="copy") 推荐好友
    el-col.layout-row.align-center(:md="24" :lg="12" :xl="6")
      el-card
        .title 已结算金额
        .num {{ list.settlementMoney }}
          span.unit 元
        //- .field
        //-   span 程序购买
        //-   span {{ }}
  //- .wjp-title
  //-   el-divider(content-position='left') 收益查询
  //- .wjp-tools.layout-row.align-center.justify-end
  //-   Date-picker.time-picker(@change="getBody" ,:date.sync="time")
  .line(style="flex:1")
  SettleModal(:visible.sync="visible")
</template>

<script>
import echarts from "echarts";
import { drawLine } from "@/utils/echarts";
import DatePicker from "@/components/DatePicker";
import SettleModal from "@/components/Settlement";
import { getHead, getBody } from "@/api/index";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import { uniqBy, sortBy } from "lodash";
let line;
export default {
  name: "Dashboard",
  components: {
    DatePicker,
    SettleModal
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  data() {
    return {
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
    // window.resize = () => {
    //   line.resize();
    // };
  },
  methods: {
    setOption(data) {
      // data = sortBy(data, "time");
      // let xAxis = uniqBy(data, "time").map(item => item.time);
      // let option = {
      //   name: ["支付宝", "微信"],
      //   data: [[], []],
      //   xAxis
      // };
      // xAxis.map(time => {
      //   let obj = data.filter(item => item.time == time);
      //   let zfb = obj.find(item => item.name == "支付宝");
      //   let wx = obj.find(item => item.name == "微信");
      //   option.data[0].push((zfb && zfb.sum) || 0);
      //   option.data[1].push((wx && wx.sum) || 0);
      // });
      // line.setOption(drawLine(option), true);
      let aliData = [
        13,
        20,
        23,
        43,
        65,
        45,
        76,
        98,
        199,
        200,
        311,
        433,
        450,
        490,
        510,
        555,
        579,
        600
      ];
      let wxData = [
        3,
        10,
        13,
        23,
        35,
        45,
        56,
        68,
        199,
        211,
        311,
        333,
        350,
        390,
        410,
        455,
        479,
        500
      ];
      let ysfData = [
        24,
        31,
        33,
        53,
        65,
        75,
        96,
        188,
        299,
        400,
        511,
        633,
        750,
        890,
        910,
        1555,
        1579,
        1600
      ];
      let option = {
        color: ["#1aadec", "#07de6d", "#f72520"],
        grid: {
          top: "10%"
        },
        legend: {
          data: ["微信", "支付宝", "云闪付"],
          x: "center",
          y: "5%"
        },
        title: {
          text: "今日收款"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name:
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate(),
          type: "category",
          data: [
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "24:00"
          ],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          name: "金额(万)",
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "支付宝",
            type: "line",
            showSymbol: false,
            data: aliData
          },
          {
            name: "微信",
            type: "line",
            showSymbol: false,
            data: wxData
          },
          {
            name: "云闪付",
            type: "line",
            showSymbol: false,
            data: ysfData
          }
        ]
      };
      line.setOption(option);
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
