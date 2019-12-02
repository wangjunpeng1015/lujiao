<template lang="pug">
.pay-container.layout-column
  .wjp-tools.layout-row__between
    div
      el-button(type='primary' @click="addChannel") 添加收款方式
    .layout-row
      el-select(v-model='payWayDictId', placeholder='支付方式' clearable @change="getPays")
        el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
      el-select(v-model='used', placeholder='是否启用' clearable @change="getPays")
        el-option(label='启用', :value='true')
        el-option(label='禁用', :value='false')
  .wjp-content.layout-column.flex
    el-table.wjp-table(v-loading="loading" :data='dqyhpz', style='width: 100%', height='250')
      el-table-column(fixed prop='id', label='id', width='50')
      el-table-column(prop='payWayDictId', label='支付名称')
        template(slot-scope='scope')
          span {{ dicFilter(scope.row.payWayDictId) }}
      //- el-table-column(prop='optional_1', label='支付类型')
      el-table-column(label='启用时间')
        template(slot-scope='scope')
          span {{ scope.row.forNight?'晚上':'白天' }}
      el-table-column(prop='remark', label='备注')
      el-table-column(label='编辑')
        template(slot-scope='scope')
          el-button(type="primary" @click="edit(scope.row)" size='mini') 编辑
      el-table-column(label='操作')
        template(slot-scope='scope')
          el-switch(v-model='scope.row.used', :active-text="scope.row.used?'启用':'禁用'" @change="useChange(scope.row.id,$event)")
  .page.layout-row.align-center.right
    span 每页显示
    el-pagination.statistics(
    background
    prev-text="上一页"
    next-text="下一页"
    @size-change="sizeChange"
    @current-change="getPays"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="sizes, prev, pager, next,total"
    :total="totalPage")
  //添加/修改
  el-dialog(title='配置', :visible.sync='visible',  width='40%' :close-on-click-modal="false")
    el-form(:model='form', :rules='rules', ref='form', label-width='120px')
      el-form-item(label='选择开启通道', prop='payWayDictId' v-if="isAdd")
        el-select(v-model='form.payWayDictId', placeholder='开启通道' style="width:100%")
          el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
      //当面付
      div(v-if="form.payWayDictId == 5")
        el-form-item(label='appid', prop='name') 
          el-input(v-model='form.contentObj.appId' placeholder="请填写appId")
        el-form-item(label='商户号(pid)', prop='pId')
          el-input(v-model='form.contentObj.pId' placeholder="请填写商户号（pid）")
        el-form-item(label='私钥', prop='privateKey')
          el-input(v-model='form.contentObj.privateKey' placeholder="请填写私钥")
        el-form-item(label='公钥', prop='publicKey')
          el-input(v-model='form.contentObj.publicKey' placeholder="请填写公钥")
        el-form-item(label='阿里公钥', prop='alipayPublicKey')
          el-input(v-model='form.contentObj.alipayPublicKey' placeholder="RSA")
      //个人转账
      //- div(v-if="form.payWayDictId == 6 || form.payWayDictId == 7")
      div(v-if="form.payWayDictId == 6")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
          .layout-row__between.align-center
            .layout-row.align-center
              img.img(:src="form.contentObj.url" :alt="form.contentObj.money")
              .pay-label
                .layout-row
                  p 二维码金额：
                  el-input(v-model='form.contentObj.money' placeholder="二维码金额" style="width:100px")
                  | RMB
                //- span.red(v-if="form.payWayDictId == 7") (请输入二维码对应的金额)
                //- .layout-row
                //-   p 备注：
                //-   el-input(v-model='form.contentObj.remark' placeholder="备注" style="width:150px")
        el-form-item(label='二维码所在地', prop='qrCodeAdd')
          el-input(v-model='form.qrCodeAdd' placeholder="请填写二维码所在地(减小风控)")
      //个人付款
      div(v-if="form.payWayDictId == 8")
        el-form-item(label='pid', prop='pId')
          el-input(v-model='form.contentObj.pId' placeholder="请填写收款pId")
      //红包（暂时不用）
      //- div(v-if="form.payWayDictId == 9")
      //-   el-form-item(label='appid', prop='name')
      //-     el-input(v-model='form.contentObj.appId' placeholder="请填写appId")
      //支付宝银行卡
      div(v-if="form.payWayDictId == 10")
        el-form-item(label='银行卡cardIndex', prop='cardIndex')
          el-input(v-model='form.contentObj.cardIndex' placeholder="请填写转账银行卡cardIndex")
        el-form-item(label='银行简称', prop='mark')
          el-input(v-model='form.contentObj.mark' placeholder="请填写银行简称")
        el-form-item(label='银行名称', prop='bankName')
          el-input(v-model='form.contentObj.bankName' placeholder="请填写银行名称")
        el-form-item(label='真实姓名', prop='name')
          el-input(v-model='form.contentObj.name' placeholder="请填写真实姓名")
      //微信
      div(v-if="form.payWayDictId == 11")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
          .layout-row__between.align-center
            .layout-row.align-center
              img.img(:src="form.contentObj.url" :alt="form.contentObj.money")
              .pay-label
                .layout-row
                  p 二维码金额：
                  el-input(v-model='form.contentObj.money' placeholder="二维码金额" style="width:100px")
                  | RMB
        el-form-item(label='二维码所在地', prop='qrCodeAdd')
          el-input(v-model='form.qrCodeAdd' placeholder="请填写二维码所在地(减小风控)")
      el-form-item(label='该方式收款上限', prop='ceiling')
        el-input(v-model='form.ceiling' placeholder="设置改方式收款上限(请自行根据情况设定，以防风控)")
      el-form-item(label='备注', prop='remark')
        el-input(v-model='form.remark' placeholder="备注(主要用于备注二维码用途)")
      //- el-form-item(label='是否启用', prop='used')
      //-   el-select(v-model='form.used', placeholder='启用时间')
      //-     el-option(label='启用', :value='true')
      //-     el-option(label='禁用', :value='false')
      el-form-item(label='启用时间', prop='forNight')
        el-select(v-model='form.forNight', placeholder='启用时间')
          el-option(label='白天', :value='false')
          el-option(label='晚上', :value='true')
    span.dialog-footer(slot='footer')
      el-button(@click='cancel') 取 消
      el-button(type='primary', @click='submitForm') 确 定

</template>

<script>
import { getPays, updateUse, updateConfigPay } from "@/api/pay";
import { mapGetters, mapState } from "vuex";
import { cloneDeep, isEmpty } from "lodash";
import { decrypt } from "@/utils/index";
import { debuggerStatement } from "babel-types";
export default {
  name: "pay",
  computed: {
    ...mapGetters(["userinfo"]),
    ...mapState(["settings"]),
    payWay() {
      if (this.settings.dict) {
        return this.settings.dict.PayWay.dicts;
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      used: "",
      payWayDictId: "",
      qrcodes: [],
      isAdd: false,
      form: {
        contentObj: {}
      },
      addForm: {},
      rules: {},
      dqyhpz: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  created() {
    this.getPays();
  },
  mounted() {},
  methods: {
    edit(data) {
      this.isAdd = false;
      this.visible = true;
      let form = cloneDeep(data);
      let contentObj = decrypt(form.content, form.payKey);
      //当面付
      this.form = {
        id: form.id,
        payWayDictId: form.payWayDictId,
        used: form.used,
        remark: form.remark,
        qrCodeAdd: form.qrCodeAdd,
        forNight: form.forNight,
        ceiling: form.ceiling,
        contentObj
      };
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //图片上传
    uploadUrl(raw) {
      let _self = this;
      const _URL = window.URL || window.webkitURL;
      qrcode.decode(this.getObjectURL(raw.file));
      qrcode.callback = function(qrUrl) {
        if (qrUrl === "error decoding QR Code") {
          _self.$message.error("未能识别支付二维码！");
        } else {
          let data = {
            money: 0,
            url: _URL.createObjectURL(raw.file),
            qrUrl
          };
          _self.$set(_self.form, "contentObj", data);
        }
      };
    },
    isEmpty(data) {
      return isEmpty(data);
    },
    cancel() {
      this.visible = false;
      this.form = {};
      this.$refs.form.resetFields();
    },
    submitForm() {
      if (isEmpty(this.form.contentObj)) {
        this.$message.error("请填写支付配置内容！");
        return;
      }
      updateConfigPay(this.form)
        .then(res => {
          this.$message.success(`${this.isAdd ? "添加" : "修改"}成功！`);
          this.cancel();
          this.getPays();
        })
        .catch(err => {
          this.$message.error("修改失败！");
        });
    },
    getPays() {
      this.loading = true;
      getPays({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          payWayDictId: this.payWayDictId, //支付类型
          used: this.used //是否启用
        }
      })
        .then(res => {
          const {
            totalRecords,
            pageNo,
            pageSize,
            totalPage,
            content
          } = res.data;
          this.totalPage = totalRecords;
          this.pageSize = pageSize;
          this.currentPage = pageNo;
          this.dqyhpz = content;
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    addChannel() {
      this.isAdd = true;
      this.visible = true;
      this.form = {
        contentObj: {}
      };
    },
    //启用禁用转换
    useChange(id, used) {
      updateUse({
        id,
        used
      })
        .then(res => {
          this.$message.success("状态修改成功！");
        })
        .finally(_ => {
          this.getPays();
        });
    },
    //转换名字
    dicFilter(id) {
      if (!this.settings.dict) return;
      return this.settings.dict.PayWay.dicts.find(item => id == item.id)
        .dictValueDisplayName;
    },
    sizeChange(num) {
      this.pageSize = num;
      this.getPays();
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  width: 100px;
  & + div {
    margin-left: 10px;
  }
}
.pay-label {
  > div {
    margin-top: 5px;
  }
  p {
    text-align: right;
    width: 90px;
  }
}
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
