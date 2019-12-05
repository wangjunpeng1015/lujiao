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
          el-button(v-if="hasPermission" @click="visible=true" type="text") 申请提现
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
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
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
    },
    hasPermission() {
      return !!this.userinfo.roles.filter(n => n.id == 1 || n.id == 2).length;
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
    window.resize = () => {
      line.resize();
    };
  },
  methods: {
    setOption(data) {
      data = sortBy(data, "time");
      let xAxis = uniqBy(data, "time").map(item => item.time);
      //如果只有一条数据，增加前一天  方便看图
      if (xAxis.length === 1) {
        const pre = dayjs()
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        xAxis.unshift(pre);
      }
      const name = this.settings.payWay.map(n => n.label);
      let option = {
        name,
        data: name.map(n => {
          return {
            name: n,
            type: "line",
            symbol: "circle", //标记的图形为实心圆
            showSymbol: false,
            data: []
          };
        }),
        xAxis
      };

      xAxis.map(time => {
        let obj = data.filter(item => item.time == time);
        name.map(n => {
          let d = obj.find(item => item.name == n);
          let temp = option.data.find(m => m.name === n);
          temp.data.push((d && d.sum) || 0);
        });
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
