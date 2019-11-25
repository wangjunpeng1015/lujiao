<template lang="pug">
.pay-container.layout-column
  .wjp-content.layout-column.flex
      el-table.wjp-table(v-loading="loading" :data='payWay', style='width: 100%', height='250')
        el-table-column(fixed prop='id', label='id', width='50')
        el-table-column(prop='dictValueDisplayName', label='支付名称')
        el-table-column(prop='optional_1', label='支付类型')
        el-table-column(label='编辑')
          template(slot-scope='scope')
            el-button(type="primary" @click="edit(scope.row)" size='mini') 编辑
        el-table-column(label='操作')
          template(slot-scope='scope')
            el-switch(v-model='scope.row.optional_2', :active-text="scope.row.optional_2?'启用':'禁用'")
  el-dialog(title='配置', :visible.sync='visible', width='40%')
    el-form(:model='form', :rules='rules', ref='form', label-width='100px')
      el-form-item(label='活动名称', prop='name')
        el-input(v-model='form.name')
      el-form-item(label='活动区域', prop='region')
        el-select(v-model='form.region', placeholder='请选择活动区域')
          el-option(label='区域一', value='shanghai')
          el-option(label='区域二', value='beijing')
      el-form-item(label='活动时间', required='')
        el-col(:span='11')
          el-form-item(prop='date1')
            el-date-picker(type='date', placeholder='选择日期', v-model='form.date1', style='width: 100%;')
        el-col.line(:span='2') -
        el-col(:span='11')
          el-form-item(prop='date2')
            el-time-picker(placeholder='选择时间', v-model='form.date2', style='width: 100%;')
      el-form-item(label='即时配送', prop='delivery')
        el-switch(v-model='form.delivery')
      el-form-item(label='活动性质', prop='type')
        el-checkbox-group(v-model='form.type')
          el-checkbox(label='美食/餐厅线上活动', name='type')
          el-checkbox(label='地推活动', name='type')
          el-checkbox(label='线下主题活动', name='type')
          el-checkbox(label='单纯品牌曝光', name='type')
      el-form-item(label='特殊资源', prop='resource')
        el-radio-group(v-model='form.resource')
          el-radio(label='线上品牌商赞助')
          el-radio(label='线下场地免费')
      el-form-item(label='活动形式', prop='desc')
        el-input(type='textarea', v-model='form.desc')
      el-form-item
        el-button(type='primary', @click="submitForm('form')") 立即创建
        el-button(@click="resetForm('form')") 重置
  span.dialog-footer(slot='footer')
    el-button(@click='cancel') 取 消
    el-button(type='primary', @click='visible = false') 确 定

</template>

<script>
import {} from "@/api/pay";
import { getPays } from "@/api/pay";
import { mapGetters, mapState } from "vuex";
import { cloneDeep } from "lodash";
export default {
  name: "pay",
  computed: {
    ...mapGetters(["userinfo"]),
    ...mapState(["settings"]),
    payWay() {
      if (this.settings.dict) {
        this.settings.dict.PayWay.dicts;
      } else {
      }
    }
  },
  data() {
    return {
      loading: false,
      visible: true,
      form: {},
      rules: {},
      choose: null,
      tableData: [
        {
          orderNum: "fds"
        }
      ]
    };
  },
  created() {
    // this.pays();
  },
  mounted() {},
  methods: {
    edit(data) {
      this.visible = true;
      this.$refs.form.resetFields();
      this.choose = cloneDeep(data);
    },
    cancel() {
      this.visible = false;
    }
    // pays() {
    //   pays()
    //     .then(res => {
    //       this.tableData = res.data;
    //     })
    //     .catch(err => {});
    // }
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
