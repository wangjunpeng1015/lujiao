<template lang="pug">
.layout-column
  Drawer(
    :payWayId="25"
    :visible.sync="visible"
    @finish="getAllAcount"
    :account="currentRow"
    :channels="channels"
  )
  el-dialog(
    title='添加yls账号'
    :visible.sync='dialogShow'
    width='40%'
    @close="closeDialog"
    :close-on-click-modal="false"
  )
    el-form(:model='news' ref='news', label-width='120px')
      el-form-item(label='yls账号：', prop='account')
        el-input(v-model='news.account' placeholder="请填写收款yls账号")
      el-form-item(label="收款上限：" prop="dailyCeiling")
        el-input(v-model='news.dailyCeiling' placeholder="请填写该账号yls模式每日收款上限" type="number")
      el-form-item.right
        el-button(type="primary" size="mini" @click="saveAccount" v-loading="saveAccountLoading") 保存
        el-button(size="mini" @click="closeDialog") 取消
  .funds-header.layout-row__between
    el-button(v-if="userinfo.roleId == 4||userinfo.roleId == 1" type="primary" size="mini" @click="dialogShow = true") 添加yls账号
    el-button(v-if="userinfo.roleId == 1" type="primary" size="mini" @click="createOrderVisible = true") 创建yls订单
    el-form(label-width='120px' :inline="true" size="mini")
      el-form-item(label='金额', )
        .layout-row
          el-input(v-model='min' style="width:90px" type="number")
          | ~
          el-input(v-model='max' style="width:90px" type="number")
      el-form-item()
        el-select(v-model='used', placeholder='是否启用' clearable @change="getAllAcount")
          el-option(label='启用', :value='true')
          el-option(label='禁用', :value='false')
      el-form-item()
        el-button(type='primary', @click='getAllAcount' size="mini") 查 询
  el-table.funds-body.wjp-table(v-loading="loading" , :data="list",style='width: 100%', height='550')
    el-table-column(label="yls账号" width="250" prop="account")
    el-table-column(label="今日额度" width="250" prop="dailyCeiling")
    el-table-column(label='启用状态' width="200")
      template(slot-scope='scope')
        el-switch(v-model='scope.row.used', :active-text="scope.row.used?'启用':'禁用'" @change="useChange(scope.row.id,$event)")
    el-table-column(label="已添加收款码")
      template(slot-scope='scope')
        .layout-row
          el-tag(
            style="margin-left: 5px"
            v-for="(item, index) in scope.row.amountList"
            type="success"
            size="small"
            :key="index"
          ) {{item}}
    el-table-column(label="操作" width="250")
      template(slot-scope='scope')
        .layout-row
          el-button(type="primary" size="mini" @click="openSet(scope.row)") 添加账号
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
  add-order(:visible.sync="createOrderVisible"  )
</template>

<script>
import Drawer from "@/components/Pay/Drawer";
import { mapGetters } from "vuex";
import {
  getAllAcount,
  delAcount,
  updateUse,
  updateConfigPay,
  addAcount
} from "@/api/pay";
import addOrder from "@/views/ylsPay/addOrder";
import { getAllchannel } from "@/api/agent";
export default {
  components: {
    Drawer,
    addOrder
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  data() {
    return {
      channels: [],
      visible: false,
      createOrderVisible: false,
      loading: false,
      saveAccountLoading: false,
      setShow: false,
      dialogShow: false,
      used: "",
      account: "",
      accountType: "ali",
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
    this.getAllchannel();
  },
  methods: {
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
          account: "-yls", //账号
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
          this.list = content;
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    saveAccount() {
      this.saveAccountLoading = true;
      let account = this.news.account + "-yls";
      let param = Object.assign({}, this.news, {
        account: this.news.account + "-yls"
      });
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

<style scoped>
.funds-header .el-form-item {
  margin-bottom: 0;
}
</style>

