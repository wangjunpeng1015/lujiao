<template lang="pug">
.orders-container.layout-column
    .wjp-tools.layout-row__between
      .layout-row__between
         el-button(v-if="userinfo.roleId == 1" type='primary' @click="addOrder" size="mini") 新增订单
      .layout-row.buttons.align-center
        el-select.flex( size="mini" v-model='type', :disabled="true" placeholder='支付方式' clearable @change="getTableData")
          el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
        el-select.flex( size="mini" v-model='state', placeholder='支付状态' clearable @change="getTableData")
          el-option(v-for='item in status', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
        //- el-input( size="mini" v-model='orderNo',@keyup.enter.native="getTableData" placeholder='系统订单号' style="width:120px")
        el-input( size="mini" v-model='merchantOrderNo',@keyup.enter.native="getTableData" placeholder='商户订单号' style="width:120px")
        el-input( size="mini" v-model='remark',@keyup.enter.native="getTableData" placeholder='系统备注' style="width:120px")
        //- el-input( size="mini" v-model='merchantRemark',@keyup.enter.native="getTableData" placeholder='商家备注' style="width:120px")
        el-date-picker( size="mini" v-model='time',clearable, unlink-panels, type='daterange', range-separator='至', start-placeholder='开始日期', end-placeholder='结束日期'  value-format="yyyy-MM-dd" style="width:250px;")
        el-button( size="mini" type='primary' @click="getTableData" :disabled="loading") 搜 索
    .wjp-content.flex.layout-column
        el-table.wjp-table(v-loading="loading" :data='tableData', style='width: 100%', height='250')
            //- el-table-column(fixed prop='id', label='id', width='50')
            //- el-table-column(prop='name', label='订单号', )
            el-table-column(type='expand')
              template(slot-scope='props')
                el-form.demo-table-expand(label-position='left', inline='')
                  el-form-item(label='支付地址')
                    el-link(type="primary" ,:href="getPayUrl(props.row)" target="_blank") {{ getPayUrl(props.row) }}
                    //- a(href="alipays://platformapi/startapp?appId=09999988&actionType=toAccount&goBack=NO&amount=0.01&userId=2088502115132635&memo=备注") aaaaa
            //- el-table-column(prop='orderNum', label='系统订单号', show-overflow-tooltip width="100")
            el-table-column(prop='merchantOrderNo', label='商家订单号', show-overflow-tooltip width="100")
            el-table-column(prop='orderUserAccount', label='商户账号',width="100" show-overflow-tooltip)
            //- el-table-column(prop='webSite', label='网站', )
            //- el-table-column(prop='orderName', label='名称', )
            //- el-table-column(label='原始金额',width="100",show-overflow-tooltip)
            //-   template(slot-scope='scope')
            //-     span(v-if="scope.row.payStatusDictValue =='支付成功'") {{ scope.row.amount }}
            //-     span(v-else style="font-weight:bold;font-size:20px;color:red" ) {{ scope.row.amount }}
            el-table-column(label='实际金额',width="100",show-overflow-tooltip)
              template(slot-scope='scope')
                span(v-if="scope.row.payStatusDictValue =='支付成功'") {{ scope.row.actualAmount }}
                span(v-else style="font-weight:bold;font-size:20px;color:red" ) {{ scope.row.actualAmount }}
            el-table-column(prop='payConfigPayConfigAccountAccount', label='收款账号',show-overflow-tooltip)
            el-table-column(prop='payWayDictValue', label='支付方式',show-overflow-tooltip)
            //- el-table-column(prop='payConfigRemark', label='通道备注',show-overflow-tooltip)
            el-table-column(prop='remark', label='系统备注',show-overflow-tooltip)
            //- el-table-column(label='商家备注',show-overflow-tooltip)
            //-   template(slot-scope='scope')
            //-     span(class="red" style="font-size:20px;font-weight:bold")  {{ scope.row.merchantRemark }}
            el-table-column(prop='createTime', label='创建时间',show-overflow-tooltip)
            //- el-table-column(prop='endTime', label='结束时间',show-overflow-tooltip)
            el-table-column(label='USDT划转状态',show-overflow-tooltip)
              template(slot-scope="scope")
                span(:class="getUsdtClass(scope.row.usdtStatus)") {{ scope.row.usdtStatus}} 
            el-table-column(prop='callBackStatus', label='商户回调状态',show-overflow-tooltip)
              template(slot-scope='scope')
                el-switch(v-model='scope.row.callBackStatus',@change="changeStatus(scope.row.id)" :disabled="scope.row.callBackStatus" :active-text="scope.row.callBackStatus?'成功':'失败'")
            el-table-column(prop='payStatusDictValue', label='状态',width="80")
                template(slot-scope='scope')
                  span(:class='getClass(scope.row.payStatusDictValue)') {{ scope.row.payStatusDictValue }}
            el-table-column(prop='payStatusDictValue', label='操作',width="160")
                template(slot-scope='scope')
                    el-button(v-if="userinfo.roleId ==1 && scope.row.payStatusDictValue=='支付超时'" type="danger" size="mini" @click="del(scope.row.id)") 删 除
                    el-button(type="primary" size="mini" v-if="userinfo.roleId ==4 && scope.row.payStatusDictValue!=='支付成功'" @click="supplement(scope.row)") 补 单
                    el-button(type="primary" size="mini" v-if="userinfo.roleId ==4 && scope.row.usdtStatus=='请商户添加码商钱包地址'" @click="transfer(scope.row)") 转账USDT
        .page.layout-row.align-center.right
            span 每页显示
            el-pagination.statistics(
            background
            prev-text="上一页"
            next-text="下一页"
            @size-change="sizeChange"
            @current-change="getTableData"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="sizes, prev, pager, next,total"
            :total="totalPage")
    add-order(@finish="getTableData" :visible.sync="addVisible" :payWay='payWay')
</template>

<script>
import { toDicChannel } from "@/utils";
import addOrder from "@/views/orders/addOrder";
import {
  getOrdersList,
  delOrder,
  supplement,
  changeStatus,
  createOrder,
  transfer
} from "@/api/order";
import { getAllchannel } from "@/api/agent";
import { mapGetters, mapState } from "vuex";
export default {
  name: "orders",
  components: {
    addOrder
  },
  props: ["payWayName", "payWayId"],
  data() {
    return {
      siv: null, //定时器
      addVisible: false,
      suppLoading: false,
      channel: [],
      loading: false,
      type: "",
      remark: "",
      merchantRemark: "",
      state: "",
      time: "",
      orderNo: "", //搜索订单号
      merchantOrderNo: "", //搜索订单号
      tableData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  watch: {
    payWayId: {
      handler: function(val) {
        this.type = val;
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
    status() {
      return this.settings.dict && this.settings.dict.PayStatus.dicts;
    },
    payWay() {
      // if (this.userinfo.id != 1) {
      //   return toDicChannel(this.channel, this.settings.dict.PayWay.dicts);
      // } else {
      return this.settings.dict.PayWay.dicts;
      // }
    }
  },
  mounted() {
    if (this.userinfo.id != 1) {
      this.getAllchannel();
    }
    this.getTableData();
    window.clearInterval(this.siv);
    this.cycle();
    this.$eventBus.$on("", data => {
      this.tableData.concat(data);
      if (data.payWayDictValue === "") {
        this.$notify.info({
          title: "消息",
          message: "你有新的需要手动确定的订单，请处理！"
        });
      }
    });
  },
  destroyed() {
    window.clearInterval(this.siv);
  },
  methods: {
    getPayUrl(row) {
      return window.location.origin + "/home/pay.html?orderNo=" + row.orderNum;
    },
    changeStatus(id) {
      this.$confirm("确定修改回调状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          changeStatus(id)
            .then(res => {
              this.$message.success("状态更新成功！");
            })
            .catch(err => {
              this.$message.error("状态更新失败！");
            })
            .finally(_ => {
              this.getTableData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //手动创建订单
    addOrder() {
      this.addVisible = true;
    },
    getAllchannel() {
      getAllchannel({
        pageNo: 1,
        pageSize: 100,
        param: { proxyAccount: this.userinfo.account, minRate: "", maxRate: "" }
      })
        .then(res => {
          this.channel = res.data.content;
        })
        .catch(err => {
          this.$message.error("获取通道失败");
        })
        .finally(_ => {});
    },
    //删除订单
    del(id) {
      this.$confirm("确定删除这条订单记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delOrder(id)
            .then(res => {
              this.getTableData();
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getUsdtClass(value) {
      let cs = "";
      switch (value) {
        case "交易完成":
          cs = "green";
          break;
        case "请商户添加码商钱包地址":
          cs = "red";
          break;
        default:
          cs = "blue";
          break;
      }
      return cs;
    },
    getClass(value) {
      let cs = "";
      switch (value) {
        case "支付成功":
          cs = "green";
          break;
        case "支付中":
          cs = "blue";
          break;
        default:
          cs = "red";
          break;
      }
      return cs;
    },
    //补单
    supplement(data) {
      this.$confirm(
        `单号：${data.orderNum}  金额：${data.actualAmount}`,
        "确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.loading = true;
          supplement({
            id: data.id
          })
            .then(res => {
              this.$message.success("补单成功！");
            })
            .catch(err => {
              this.$message.error("补单失败！");
            })
            .finally(_ => {
              this.loading = false;
              this.getTableData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //USDT手动转账
    transfer(data) {
      this.$confirm(
        `单号：${data.orderNum}  金额：${data.actualAmount}`,
        "确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.loading = true;
          transfer({
            orderNo: data.orderNum
          })
            .then(res => {
              this.$message.success("提交成功！");
            })
            .catch(err => {
              debugger;
              this.$message.error(err);
            })
            .finally(_ => {
              this.loading = false;
              this.getTableData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getTableData() {
      this.loading = true;
      getOrdersList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          merchantRemark: this.merchantRemark,
          remark: this.remark,
          minTime: this.time[0] || "",
          maxTime: this.time[1] || "",
          orderNum: this.orderNo, //订单号
          merchantOrderNo: this.merchantOrderNo, //订单号
          payWay: this.type, //支付方式
          payStatus: this.state, //支付状态
          minMoney: "", //最小金额
          maxMoney: "" //最大金额
        }
      })
        .then(res => {
          if (res.success) {
            const { totalRecords, pageNo, pageSize, content } = res.data;
            this.totalPage = totalRecords;
            this.pageSize = pageSize;
            this.currentPage = pageNo;
            this.tableData = content;
          } else {
            this.$message.error("获取表格数据失败！");
          }
        })
        .catch(err => {
          this.$message.error("获取表格数据失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    //轮训查询订单
    cycle() {
      this.siv = setInterval(() => {
        this.getTableData();
      }, 1000 * 30);
    },
    sizeChange(num) {
      this.pageSize = num;
      this.getTableData();
    },
    //设置排序
    sortChange(column) {
      this.tld_asc = column.order;
      this.getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
</style>
