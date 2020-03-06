<template lang="pug">
 el-dialog(title='配置', :visible.sync='visible',  width='40%' :close-on-click-modal="false" :before-close="cancel")
    el-form(:model='form', ref='form', label-width='120px')
      //- el-form-item(label='选择开启通道', prop='payWayDictId' v-if="isAdd")
      //-   el-select(v-model='form.payWayDictId', placeholder='开启通道' style="width:100%")
      //-     el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
      //- 手机网站支付
      div(v-if="form.payWayDictId == 31")
        el-form-item(label='appid', prop='name')
          el-input(v-model='form.contentObj.appId' placeholder="请填写appId")
        el-form-item(label='应用私钥', prop='privateKey')
          el-input(v-model='form.contentObj.privateKey' type="textarea" :rows="4" placeholder="请填写应用私钥")
        el-form-item(label='应用公钥', prop='publicKey')
          el-input(v-model='form.contentObj.publicKey' type="textarea" :rows="4" placeholder="请填写应用公钥")
        el-form-item(label='阿里公钥', prop='alipayPublicKey')
          el-input(v-model='form.contentObj.alipayPublicKey' type="textarea" :rows="4" placeholder="RSA")
      //- 探街微信h5
      div(v-if="form.payWayDictId == 30")
        el-form-item(label='QQ openid', prop='qq_openid')
          el-input(v-model='form.contentObj.qq_openid' placeholder="请填写探街账号绑定的QQ openid")
      //- 糗事百科
      div(v-if="form.payWayDictId == 28")
        el-form-item(label='糗百账号', prop='account')
          el-input(v-model='form.contentObj.account' placeholder="请填写糗百账号")
        el-form-item(label='糗百密码', prop='pwd')
          el-input(v-model='form.contentObj.pwd' placeholder="请填写收糗百密码")
      //钱方好近
      div(v-if="form.payWayDictId == 26")
        //- el-form-item(label='mchid', prop='mchid')
        //-   el-input(v-model='form.contentObj.mchid' placeholder="请填写mchid(子商户号)")
        //- el-form-item(label='code', prop='code')
        //-   el-input(v-model='form.contentObj.code' placeholder="请填写code")
        //- el-form-item(label='key', prop='key')
        //-   el-input(v-model='form.contentObj.key' placeholder="请填写key")
        el-form-item(label='钱方账号', prop='account')
          el-input(v-model='form.contentObj.account' placeholder="请填写钱方账号")
        el-form-item(label='收银员编号', prop='opuid')
          el-input(v-model='form.contentObj.opuid' placeholder="请填写收银员编号")
        el-form-item(label='收银员密码', prop='pwd')
          el-input(v-model='form.contentObj.pwd' placeholder="请填写收银员密码")
      //云靓刷
      div(v-if="form.payWayDictId == 25")
        el-form-item(label='APPID', prop='appid')
          el-input(v-model='form.contentObj.appid' placeholder="请填写appid")
        el-form-item(label='appsecret', prop='name')
          el-input(v-model='form.contentObj.appsecret' placeholder="请填写appsecret")
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
        el-form-item(v-if="!isEmpty(form.contentObj)" required)
          el-popover(placement='right', trigger='hover')
            img.pop-img(src="@/assets/img/level1.jpg")
            img.pop-img(src="@/assets/img/level2.jpg")
            img.pop-img(src="@/assets/img/level3.jpg")
            i.el-icon-question.red(slot='reference') 查看步骤
          el-input(v-model='form.contentObj.bizNo' placeholder="请填写支付宝账单号")
          p.red 请再三确认输入的订单号正确，否则不能自动补单！！！
          p.red 请再三确认输入的订单号正确，否则不能自动补单！！！
          p.red 请再三确认输入的订单号正确，否则不能自动补单！！！
      //个码（暂时屏蔽转账自动金额）
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
      //转账
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
        el-form-item(label='银行卡ID', prop='cardIndex')
          el-input(v-model='form.contentObj.cardIndex' placeholder="请填写转账银行卡cardId")
            template(slot="append")
              el-link(type="primary" target="_blank" href="./#/doc/cardId") 查看如何获取cardId
        el-form-item(label="银行卡号" prop="cardNo")
          el-input(v-model="form.contentObj.cardNo" @blur="getBankName" placeholder="请输入卡号以获取银行代码")
        el-form-item(label='银行代码', prop='bankName')
          el-input(v-model='form.contentObj.bankName' :disabled="true" placeholder="填写卡号后自动获取")
        el-form-item(label='银行全称', prop='fullName')
          el-input(v-model='form.contentObj.fullName' :disabled="true" placeholder="填写卡号后自动获取")
        //- el-form-item(label='银行简称', prop='mark')
        //-   el-input(v-model='form.contentObj.mark' placeholder="请填写银行简称")
        el-form-item(label='持卡人姓名', prop='name')
          el-input(v-model='form.contentObj.name' placeholder="请填写持卡人姓名")
      //微信
      div(v-if="form.payWayDictId == 11")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
          .layout-row__between.align-center
            .layout-row.align-center
              img.img(:src="form.contentObj.url || form.contentObj.qrUrl")
      //云闪付
      div(v-if="form.payWayDictId == 17")
        el-form-item(label='收款二维码')
          el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
            el-button(size='small', type='primary') 点击上传
        el-form-item(v-if="!isEmpty(form.contentObj)")
          .layout-row__between.align-center
            .layout-row.align-center
              img.img(:src="form.contentObj.url")
      el-form-item(:label="form.payWayDictId == 24 ? '金额' : '单笔限额'", prop='ceiling')
        el-input(type="number" v-if="form.payWayDictId == 24" v-model='form.singleCeilingMin' :placeholder="form.payWayDictId == 24 ? '金额' : '单笔限额'" @change="n=>form.singleCeilingMax = n")
        div(v-else)
          el-input(v-model='form.singleCeilingMin' placeholder="最小金额" style="width:45%")
            template(slot="append") 元
          span(style="padding: 0 10px") ~
          el-input(v-model='form.singleCeilingMax' placeholder="最大金额" style="width:45%")
            template(slot="append") 元
      //- el-form-item(label="上码商户", prop='merchantIds')
      //-   el-checkbox-group(v-model='form.merchantIds')
      //-     el-checkbox(v-for="(item,i) in merchants" :key="i" :label='item.id') {{ item.account }}
      //- el-form-item(label="商户利率", prop='merchantInterestRate' v-if="isAdd")
      //-   el-input(v-model='form.merchantInterestRate' placeholder="请填写通道利率(不填默认0.03)")
      el-form-item(:label="form.payWayDictId == 24 ? '班级-理由-金额' : '备注'", prop='remark')
        el-input(v-model='form.remark' :placeholder="form.payWayDictId == 24 ? '请按照格式：班级-理由-金额 填写' : '备注'")
    span.dialog-footer(slot='footer')
      el-button(@click='cancel') 取 消
      el-button(type='primary',v-loading="loading" @click='submitForm') 确 定
</template>

<script>
import { updateConfigPay } from "@/api/pay";
import { getMerchant } from "@/api/user";
import { isEmpty } from "lodash";
import { mapState } from "vuex";
import axios from "axios";
export default {
  props: ["visible", "data", "isAdd", "payWay", "account", "payWayId"],
  components: {},
  computed: {
    ...mapState(["settings"])
  },
  watch: {
    data: {
      handler(val) {
        this.$set(this, "form", val);
        if (this.payWayId) {
          this.form.payWayDictId = this.payWayId;
        }
      },
      deep: true
    },
    visible: {
      handler(val) {
        if (!val) return;
        // this.getMerchant();
      },
      deep: true
    }
  },
  data() {
    return {
      MAP: {"CDB":"国家开发银行","ICBC":"中国工商银行","ABC":"中国农业银行","BOC":"中国银行","CCB":"中国建设银行","PSBC":"中国邮政储蓄银行","COMM":"交通银行","CMB":"招商银行","SPDB":"上海浦东发展银行","CIB":"兴业银行","HXBANK":"华夏银行","GDB":"广东发展银行","CMBC":"中国民生银行","CITIC":"中信银行","CEB":"中国光大银行","EGBANK":"恒丰银行","CZBANK":"浙商银行","BOHAIB":"渤海银行","SPABANK":"平安银行","SHRCB":"上海农村商业银行","YXCCB":"玉溪市商业银行","YDRCB":"尧都农商行","BJBANK":"北京银行","SHBANK":"上海银行","JSBANK":"江苏银行","HZCB":"杭州银行","NJCB":"南京银行","NBBANK":"宁波银行","HSBANK":"徽商银行","CSCB":"长沙银行","CDCB":"成都银行","CQBANK":"重庆银行","DLB":"大连银行","NCB":"南昌银行","FJHXBC":"福建海峡银行","HKB":"汉口银行","WZCB":"温州银行","QDCCB":"青岛银行","TZCB":"台州银行","JXBANK":"嘉兴银行","CSRCB":"常熟农村商业银行","NHB":"南海农村信用联社","CZRCB":"常州农村信用联社","H3CB":"内蒙古银行","SXCB":"绍兴银行","SDEB":"顺德农商银行","WJRCB":"吴江农商银行","ZBCB":"齐商银行","GYCB":"贵阳市商业银行","ZYCBANK":"遵义市商业银行","HZCCB":"湖州市商业银行","DAQINGB":"龙江银行","JINCHB":"晋城银行JCBANK","ZJTLCB":"浙江泰隆商业银行","GDRCC":"广东省农村信用社联合社","DRCBCL":"东莞农村商业银行","MTBANK":"浙江民泰商业银行","GCB":"广州银行","LYCB":"辽阳市商业银行","JSRCU":"江苏省农村信用联合社","LANGFB":"廊坊银行","CZCB":"浙江稠州商业银行","DYCB":"德阳商业银行","JZBANK":"晋中市商业银行","BOSZ":"苏州银行","GLBANK":"桂林银行","URMQCCB":"乌鲁木齐市商业银行","CDRCB":"成都农商银行","ZRCBANK":"张家港农村商业银行","BOD":"东莞银行","LSBANK":"莱商银行","BJRCB":"北京农村商业银行","TRCB":"天津农商银行","SRBANK":"上饶银行","FDB":"富滇银行","CRCBANK":"重庆农村商业银行","ASCB":"鞍山银行","NXBANK":"宁夏银行","BHB":"河北银行","HRXJB":"华融湘江银行","ZGCCB":"自贡市商业银行","YNRCC":"云南省农村信用社","JLBANK":"吉林银行","DYCCB":"东营市商业银行","KLB":"昆仑银行","ORBANK":"鄂尔多斯银行","XTB":"邢台银行","JSB":"晋商银行","TCCB":"天津银行","BOYK":"营口银行","JLRCU":"吉林农信","SDRCU":"山东农信","XABANK":"西安银行","HBRCU":"河北省农村信用社","NXRCU":"宁夏黄河农村商业银行","GZRCU":"贵州省农村信用社","FXCB":"阜新银行","HBHSBANK":"湖北银行黄石分行","ZJNX":"浙江省农村信用社联合社","XXBANK":"新乡银行","HBYCBANK":"湖北银行宜昌分行","LSCCB":"乐山市商业银行","TCRCB":"江苏太仓农村商业银行","BZMD":"驻马店银行","GZB":"赣州银行","WRCB":"无锡农村商业银行","BGB":"广西北部湾银行","GRCB":"广州农商银行","JRCB":"江苏江阴农村商业银行","BOP":"平顶山银行","TACCB":"泰安市商业银行","CGNB":"南充市商业银行","CCQTGB":"重庆三峡银行","XLBANK":"中山小榄村镇银行","HDBANK":"邯郸银行","KORLABANK":"库尔勒市商业银行","BOJZ":"锦州银行","QLBANK":"齐鲁银行","BOQH":"青海银行","YQCCB":"阳泉银行","SJBANK":"盛京银行","FSCB":"抚顺银行","ZZBANK":"郑州银行","SRCB":"深圳农村商业银行","BANKWF":"潍坊银行","JJBANK":"九江银行","JXRCU":"江西省农村信用","HNRCU":"河南省农村信用","GSRCU":"甘肃省农村信用","SCRCU":"四川省农村信用","GXRCU":"广西省农村信用","SXRCCU":"陕西信合","WHRCB":"武汉农村商业银行","YBCCB":"宜宾市商业银行","KSRB":"昆山农村商业银行","SZSBK":"石嘴山银行","HSBK":"衡水银行","XYBANK":"信阳银行","NBYZ":"鄞州银行","ZJKCCB":"张家口市商业银行","XCYH":"许昌银行","JNBANK":"济宁银行","CBKF":"开封市商业银行","WHCCB":"威海市商业银行","HBC":"湖北银行","BOCD":"承德银行","BODD":"丹东银行","JHBANK":"金华银行","BOCY":"朝阳银行","LSBC":"临商银行","BSB":"包商银行","LZYH":"兰州银行","BOZK":"周口银行","DZBANK":"德州银行","SCCB":"三门峡银行","AYCB":"安阳银行","ARCU":"安徽省农村信用社","HURCB":"湖北省农村信用社","HNRCC":"湖南省农村信用社","NYNB":"广东南粤银行","LYBANK":"洛阳银行","NHQS":"农信银清算中心","CBBQS":"城市商业银行资金清算中心"},
      cardNo: "",
      loading: false,
      form: {
        // merchantIds: [],
        contentObj: {}
      },
      trules: {},
      merchants: []
    };
  },
  created() {},
  mounted() {},

  methods: {
    getBankName(val) {
      console.log(this.form.contentObj.cardNo)
        axios
          .get(
            `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${this.form.contentObj.cardNo}&cardBinCheck=true`
          )
          .then(res => {
            if (!res.data.validated) {
              this.$message.error("卡片暂时不可用, 请更换卡号");
              return false;
            }
            if (res.data.stat !== "ok") {
              this.$message.error("银行卡暂不可用, 请更换银卡哈");
              return false;
            }
            this.$set(this.form.contentObj, "bankName", res.data.bank);
            this.$set(this.form.contentObj, "fullName", this.MAP[res.data.bank]);
          });
    },
    getMerchant() {
      getMerchant()
        .then(res => {
          this.merchants = res.data;
        })
        .catch(err => {
          this.$message.error("获取商户失败！");
        });
    },
    submitForm() {
      if (isEmpty(this.form.contentObj)) {
        this.$message.error("请填写支付配置内容！");
        return;
      }
      this.loading = true;
      //如果是云靓付添加版本
      if (this.form.payWayDictId == 25) {
        this.form.contentObj.version = "V1.0";
      }
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
          let data = {}
          if (qrUrl === "error decoding QR Code") {
            data.url = reader.result
            data.qrUrl = null
            // _self.$message.error("未能识别支付二维码！");
          } else {
            data = {
              //   money: 0,
              url: reader.result,
              qrUrl
            };
          }
          _self.$set(_self.form, "contentObj", data);
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
.pop-img {
  border: 1px solid black;
  margin-right: 10px;
  width: 200px;
}
</style>
