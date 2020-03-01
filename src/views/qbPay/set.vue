<template lang="pug">
.layout-column
  Drawer(
    :payWayId="26"
    :visible.sync="visible"
    @finish="getAllAcount"
    :account="currentRow"
    :channels="channels"
  )
  el-dialog(
    title='添加糗百账号'
    :visible.sync='dialogShow'
    width='40%'
    @close="closeDialog"
    :close-on-click-modal="false"
  )
    el-form(:model='news' ref='news', label-width='120px')
      el-form-item(label='糗百账号：', prop='account')
        el-input(v-model='news.account' placeholder="请填写收款糗百账号")
      el-form-item(label="收款上限：" prop="dailyCeiling")
        el-input(v-model='news.dailyCeiling' placeholder="请填写该账号每日收款上限" type="number")
      el-form-item.right
        el-button(type="primary" size="mini" @click="saveAccount" v-loading="saveAccountLoading") 保存
        el-button(size="mini" @click="closeDialog") 取消
  .funds-header.layout-row__between
    el-button(v-if="userinfo.roleId == 4||userinfo.roleId == 1" type="primary" size="mini" @click="dialogShow = true") 添加糗百账号
    el-form(label-width='120px' :inline="true" size="mini")
      el-form-item
        el-select(v-model='code', placeholder='码商账号' filterable clearable @change="getAllAcount")
          el-option(v-for="(item,i) in coder" :key="i" :label='item.account', :value='item.id')
      el-form-item
        el-input(v-model='account' placeholder="请输入糗百账号")
      el-form-item
        el-select(v-model='used', placeholder='是否启用' clearable @change="getAllAcount")
          el-option(label='启用', :value='true')
          el-option(label='禁用', :value='false')
      el-form-item()
        el-button(type='primary', @click='getAllAcount' size="mini") 查 询
  el-table.funds-body.wjp-table(:row-class-name="tableRowClassName" v-loading="loading" , :data="list",style='width: 100%')
    el-table-column(label="账号" show-overflow-tooltip prop="account")
    el-table-column(label="今日收款" show-overflow-tooltip prop="nowEarnings")
    el-table-column(label="成功率" show-overflow-tooltip prop="nowSuccessRate")
    //- el-table-column(label="所属代理" show-overflow-tooltip prop="proxyAccount")
    el-table-column(label="失败次数" show-overflow-tooltip)
      template(slot-scope="scope")
        .layout-row
          span(style="align-self:center") {{scope.row.configfailuresNum}}次
          el-button(type="primary" plain round style="margin-left:10px" size="mini" @click="resetFailStart(scope.row.configId, scope.row.id)" v-if="userinfo.roleId == 1 || userinfo.roleId == 3 || userinfo.roleId == 4") 重置
    el-table-column(label="剩余额度" show-overflow-tooltip prop="dailyCeiling")
    el-table-column(label="昨日收款" show-overflow-tooltip prop="yesterdayEarnings")
    el-table-column(label="所属码商" show-overflow-tooltip prop="codeMerchantAccount")
    el-table-column(label="单笔限额" show-overflow-tooltip)
      template(slot-scope='scope')
        .layout-row
          span(
            style="margin-left: 5px"
            v-for="(item, index) in scope.row.amountList"
            size="small"
            :key="index"
          ) {{item}}
    el-table-column(label='启用状态' show-overflow-tooltip)
      template(slot-scope='scope')
        el-switch(v-model='scope.row.configUsed', :active-text="scope.row.used?'启用':'禁用'" @change="useChange(scope.row.id,$event)")
    el-table-column(label="操作")
      template(slot-scope='scope')
        .layout-row
          //- el-button(type="primary" size="mini" @click="testOrder(scope.row)") 测试下单
          el-button(type="primary" size="mini" @click="openSet(scope.row)") 配置
          el-button(type="danger" size="mini" @click="del(scope.row.id)") 删除
  .page.layout-row.align-center.right(style="margin-top:20px")
    span 每页显示
    el-pagination.statistics(
    background
    prev-text="上一页"
    next-text="下一页"
    @size-change="sizeChange"
    @current-change="getAllAcount"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="sizes, prev, pager, next,total"
    :total="totalPage")
</template>

<script>
import Drawer from "@/components/Pay/Drawer";
import { mapGetters } from "vuex";
import {
  getAllAcount,
  delAcount,
  updateUse,
  updateConfigPay,
  addAcount,
  getPays,
  resetFail
} from "@/api/pay";
import { getMerchants } from "@/api/members";
import { createTestOrder, getQfCookie, setQfCookie } from "@/api/order";
import { getAllchannel } from "@/api/agent";
export default {
  components: {
    Drawer
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  data() {
    return {
      coder: [], //码商
      channels: [],
      visible: false,
      loading: false,
      saveAccountLoading: false,
      setShow: false,
      dialogShow: false,
      code: "",
      used: "",
      account: "",
      min: "",
      max: "",
      news: {
        account: "",
        city: "defualt",
        dailyCeiling: "",
        accountType: "ali"
      },
      newMoney: {
        money: ""
      },
      currentRow: {
        className: ""
      },
      list: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  mounted() {
    this.getAllAcount();
    this.getAllCoder();
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (!row.used) {
          return 'warning-row';
        }
        return '';
      },
    //获取全部码商
    getAllCoder() {
      getMerchants({
        pageNo: 1,
        pageSize: 9000,
        param: { account: "", type: 4 }
      })
        .then(res => {
          this.coder = res.data.content;
        })
        .catch(err => {
          this.$message.error("获码商失败！");
        });
    },
    //测试下单
    testOrder(data) {
      this.$prompt("请输入金额：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$/,
        inputErrorMessage: "金额不正确"
      })
        .then(({ value }) => {
          createTestOrder({
            id: data.id,
            amount: value
          })
            .then(res => {
              this.$notify({
                title: "成功",
                message: `${data.account}账号可以创建订单！`,
                type: "success",
                duration: 0
              });
            })
            .catch(err => {
              this.$notify({
                title: "失败",
                message: `${data.account}账号不能创建订单！`,
                type: "error",
                duration: 0
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    del(id) {
      this.$confirm("确定删除这个账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          delAcount(id)
            .then(res => {
              this.getAllAcount();
            })
            .catch(err => {})
            .finally(e => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getAllchannel() {
      getAllchannel({
        pageNo: 1,
        pageSize: 100,
        param: {}
      })
        .then(res => {
          this.channels = res.data.content;
        })
        .catch(err => {
          this.$message.error("获取通道失败！");
        });
    },
    sizeChange(num) {
      this.pageSize = num;
      this.getAllAcount();
    },
    //账号启用禁用转换
    useChange(id, used) {
      this.loading = true;
      updateUse({
        id,
        used
      })
        .then(res => {
          this.$message.success("状态修改成功！");
        })
        .finally(_ => {
          this.loading = false;
          this.getAllAcount();
        });
    },
    getAllAcount() {
      this.loading = true;
      getAllAcount({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          code: this.code, //码商
          account: `${this.account}-qf_ali`, //账号
          used: this.used, //是否启用
          accountType: "ali", //类型
          min: this.min, //最小
          max: this.max //最大
        }
      })
        .then(res => {
          const { totalRecords, pageNo, pageSize, content } = res.data;
          this.totalPage = totalRecords;
          this.pageSize = pageSize;
          this.currentPage = pageNo;
          content.forEach(item => {
            item.nowSuccessRate = (item.nowSuccessRate * 100).toFixed(2) + '%'
            item.configfailuresNum = 0
            item.configId = 0
            item.configUsed = item.used
            item.nowEarnings = item.nowEarnings ? item.nowEarnings : '——'
            item.yesterdayEarnings = item.yesterdayEarnings ? item.yesterdayEarnings : '——'
          })
          this.list = content;
          this.list.forEach(item => {
            this.getPayConfig(item.id)
          })
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    resetFailStart (configId, id) {
      resetFail(configId).then(res => {
        this.useChange(id)
        this.getPayConfig(id)
        this.$message.success('重置成功')
      })
    },
    getPayConfig (id) {
      getPays({
        pageNo: 1,
        pageSize: 1,
        param: {
          payConfigAccountId: id, //
          payWayDictId: '', //支付类型
          used: '' //是否启用
        }
      }).then(result => {
        this.list.find((n) => n.id === id).configfailuresNum = result.data.content[0].failuresNum
        this.list.find((n) => n.id === id).configId = result.data.content[0].id
      })
    },
    saveAccount() {
      this.saveAccountLoading = true;
      let param = Object.assign({}, this.news, {
        account: `${this.news.account}-qf_ali`
      });
      if (!this.news.dailyCeiling) {
        this.$message.error('请填写收款上限')
        return false
      }
      addAcount(param)
        .then(res => {
          this.getAllAcount();
          this.$message.success("添加账号成功！");
          this.closeDialog();
        })
        .catch(err => {
          this.$message.error(err.message);
        })
        .finally(e => {
          this.loading = false;
        });
    },
    closeDialog() {
      this.news = {
        account: "",
        city: "defualt",
        dailyCeiling: "",
        accountType: "ali"
      };
      this.dialogShow = false;
      this.visible = false;
    },
    openSet(row) {
      this.visible = true;
      this.currentRow = JSON.parse(JSON.stringify(row));
    },
    //图片上传
    uploadUrl(raw) {
      let _self = this;
      let reader = new FileReader();
      reader.readAsDataURL(raw.file);
      reader.onload = function() {
        qrcode.decode(_self.getObjectURL(raw.file));
        qrcode.callback = function(qrUrl) {
          if (qrUrl === "error decoding QR Code") {
            _self.$message.error("未能识别支付二维码！");
          } else {
            let data = {
              //   money: 0,
              url: reader.result,
              qrUrl
            };
            _self.$set(_self.form, "contentObj", data);
          }
        };
      };
    }
  }
};
</script>
<style>
 .el-table .warning-row {
    background: #f5f7fa;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<style scoped>
.funds-header .el-form-item {
  margin-bottom: 0;
}
</style>

