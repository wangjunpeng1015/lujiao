<template lang="pug">
.pay-container.layout-column
  .wjp-tools.layout-row
    //- el-select(v-model='type', placeholder='支付方式' clearable @change="getTableData")
    //- el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
    //- el-input(v-model='userName',@enter="getTableData" placeholder='姓名' style="width:200px;")
    //- el-input(v-model='account',@enter="getTableData" placeholder='结算账号' style="width:200px;")
    el-button(type='primary' @click="addModal = true") 添 加
    //- el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.layout-column.flex
    el-table.wjp-table(v-loading="loading" :data='tableData', style='width: 100%', height='250')
      el-table-column(fixed prop='id', label='id', width='50')
      el-table-column(prop='dictValueDisplayName', label='支付名称')
      el-table-column(prop='optional_1', label='支付类型')
      el-table-column(label='编辑')
        template(slot-scope='scope')
          el-button(type="primary" @click="edit(scope.row)" size='mini') 编辑
      el-table-column(label='操作')
        template(slot-scope='scope')
          el-switch(v-model='scope.row.use', :active-text="scope.row.use?'启用':'禁用'")
  //添加/修改
  el-dialog(title='配置', :visible.sync='visible', width='40%')
    el-form(:model='form', :rules='rules', ref='form', label-width='100px')
      el-form-item(label='选择开启通道', prop='' v-if="isAdd")
        el-select(v-model='form.id', placeholder='开启通道')
          el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
      //个人转账
      div(v-if="form.id == 6 || form.id ==7")
        el-upload.upload-demo(:file-list='qrcodes', list-type='picture')
          el-button(size='small', type='primary') 点击上传
      //个人付款
      div(v-if="form.id == 8")
        el-form-item(label='appid', prop='name')
          el-input(v-model='form.appId' placeholder="请填写appId")
      //银行卡
      div(v-if="form.id == 10")
        el-form-item(label='appid', prop='name')
          el-input(v-model='form.appId' placeholder="请填写appId")
      //当面付
      div(v-if="for.id == 5")
        el-form-item(label='appid', prop='name')
          el-input(v-model='form.appId' placeholder="请填写appId")
        el-form-item(label='商户号(pid)', prop='pid')
          el-input(v-model='form.pid' placeholder="请填写商户号（pid）")
        el-form-item(label='私钥', prop='privateKey')
          el-input(v-model='form.privateKey' placeholder="请填写私钥")
        el-form-item(label='公钥', prop='publickKey')
          el-input(v-model='form.publickKey' placeholder="请填写公钥")
        el-form-item(label='阿里公钥', prop='alipayPublicKey')
          el-input(v-model='form.alipayPublicKey' placeholder="RSA")
    span.dialog-footer(slot='footer')
      el-button(@click='cancel') 取 消
      el-button(type='primary', @click='submitForm') 确 定

</template>

<script>
import { getPays, updateUse } from "@/api/pay";
import { mapGetters, mapState } from "vuex";
import { cloneDeep } from "lodash";
export default {
  name: "pay",
  computed: {
    ...mapGetters(["userinfo"]),
    ...mapState(["settings"]),
    payWay() {
      if (this.settings.dict) {
        let pay = this.settings.dict.PayWay.dicts;
        const ids = this.dqyhpz.map(item => item.payWayDictId);
        return pay.filter(item => !ids.includes(item.id));
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      loading: false,
      visible: true,
      qrcodes: [],
      form: {},
      addForm: {},
      rules: {},
      choose: null,
      dqyhpz: [],
      tableData: []
    };
  },
  created() {
    this.getPays();
  },
  mounted() {},
  methods: {
    edit(data) {
      this.visible = true;
      this.choose = cloneDeep(data);
    },
    cancel() {
      this.visible = false;
      this.choose = null;
      this.$refs.form.resetFields();
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getPays() {
      getPays()
        .then(res => {
          this.dqyhpz = res.data;
        })
        .catch(err => {});
    },
    dicChange() {}
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
