<template lang="pug">
 el-dialog(title='配置', :visible.sync='visible',  width='40%' :close-on-click-modal="false" :before-close="cancel")
    el-form(:model='form', ref='form', label-width='120px')
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
          el-input(v-model='form.contentObj.alipayPublicKey' type="textarea" :rows="4" placeholder="RSA")
      //ali-轻松经费
      div(v-if="form.payWayDictId == 24")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
        .layout-row__between.align-center
          .layout-row.align-center
            img.img(:src="form.contentObj.url")
      //个人转账（暂时屏蔽转账自动金额）
      div(v-if="form.payWayDictId == 6 || form.payWayDictId == 7")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
          .layout-row__between.align-center
            .layout-row.align-center
              img.img(:src="form.contentObj.url")
                //- span.red(v-if="form.payWayDictId == 7") (请输入二维码对应的金额)
                //- .layout-row
                //-   p 备注：
                //-   el-input(v-model='form.contentObj.remark' placeholder="备注" style="width:150px")
        //- el-form-item(label='二维码所在地', prop='qrCodeAdd')
        //-   el-input(v-model='form.qrCodeAdd' placeholder="请填写二维码所在地(减小风控)")
      //个人付款
      div(v-if="form.payWayDictId == 8")
        el-form-item(label='支付宝pid', prop='pId')
          el-input(v-model='form.contentObj.pId' placeholder="请填写收款pId")
      //红包
      div(v-if="form.payWayDictId == 9")
        el-form-item(label='支付宝pid', prop='pId')
          el-input(v-model='form.contentObj.pId' placeholder="请填写收款pId")
        el-form-item(label='支付宝收款账号', prop='myId')
          el-input(v-model='form.contentObj.myId' placeholder="请填写收款支付宝账号")
      //扫码点单
      div(v-if="form.payWayDictId == 18")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
          .layout-row__between.align-center
            .layout-row.align-center
              img.img(:src="form.contentObj.url")
        el-form-item(label='桌号')
          el-input(v-model='form.contentObj.ramadhin' placeholder="请填写桌号(方便识别)")
      //支付宝银行卡
      div(v-if="form.payWayDictId == 10")
        el-form-item(label='银行卡cardIndex', prop='cardIndex')
          el-input(v-model='form.contentObj.cardIndex' placeholder="请填写转账银行卡cardIndex")
        el-form-item(label='银行名称', prop='bankName')
          el-input(v-model='form.contentObj.bankName' placeholder="请填写银行名称")
        el-form-item(label='银行简称', prop='mark')
          el-input(v-model='form.contentObj.mark' placeholder="请填写银行简称")
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
              img.img(:src="form.contentObj.url")
      //云闪付
      div(v-if="form.payWayDictId == 17")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
          .layout-row__between.align-center
            .layout-row.align-center
              img.img(:src="form.contentObj.url")
      el-form-item(label='单笔限额', prop='ceiling')
        el-input(v-if="form.payWayDictId == 24" v-model='form.singleCeilingMin' placeholder="单笔限额" @change="n=>form.singleCeilingMax = n")
        div(v-else)
          el-input(v-model='form.singleCeilingMin' placeholder="设置单次最小金额(以防风控)" style="width:45%")
          |-
          el-input(v-model='form.singleCeilingMax' placeholder="设置单次最大金额(以防风控)" style="width:45%")
      el-form-item(label='备注', prop='remark')
        el-input(v-model='form.remark' :placeholder="form.payWayDictId == 24?'班级名称——收款原由':'备注(主要用于备注二维码用途)'")
    span.dialog-footer(slot='footer')
      el-button(@click='cancel') 取 消
      el-button(type='primary',v-loading="loading" @click='submitForm') 确 定
</template>

<script>
import { updateConfigPay } from "@/api/pay";
import { isEmpty } from "lodash";
import { mapState } from "vuex";
export default {
  props: ["visible", "data", "isAdd", "payWay", "account"],
  components: {},
  computed: {
    ...mapState(["settings"])
  },
  watch: {
    data: {
      handler(val) {
        this.form = val;
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      form: {
        contentObj: {}
      },
      trules: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      if (isEmpty(this.form.contentObj)) {
        this.$message.error("请填写支付配置内容！");
        return;
      }
      this.loading = true;
      updateConfigPay({
        ...this.form,
        payConfigAccountId: this.account.id
      })
        .then(res => {
          this.$message.success(`${this.isAdd ? "添加" : "修改"}成功！`);
          this.cancel();
          this.$emit("finish");
        })
        .catch(err => {
          this.$message.error("修改失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    isEmpty(data) {
      return isEmpty(data);
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
    },
    cancel() {
      this.$emit("update:visible", false);
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
</style>
