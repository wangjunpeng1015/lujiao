<template lang="pug">
.orders-container.layout-column
  //- 转账额度查询dialog
  el-dialog(
    title='转账额度查询'
    :visible.sync='quotaVisible'
    width="40%"
    class="quota-dialog"
    @close="quotaVisible=false"
  )
    el-tabs(v-model="quotaActive" type="border-card")
      el-tab-pane(
        v-for="item in quotaChains"
        :key="item.chain"
        :label="CHAINMAP[item.chain]"
        :name="item.chain"
      )
        p.layout-row__between
          span 单次最大转出数量
          span {{item.maxWithdrawAmt}}
        p.layout-row__between(style="margin-top:10px")
          span 当日提币额度
          span {{item.withdrawQuotaPerDay}}
        p.layout-row__between(style="margin-top:10px")
          span 当日提币剩余额度
          span {{item.remainWithdrawQuotaPerDay}}
        p.layout-row__between(style="margin-top:10px")
          span 总提币额度
          span {{item.withdrawQuotaTotal}}
        p.layout-row__between(style="margin-top:10px")
          span 总提币剩余额度
          span {{item.remainWithdrawQuotaTotal}}
  //- 充币收款地址
  el-dialog(
    title='充币收款地址'
    :visible.sync='addressVisible'
    width="30%"
    class="quota-dialog"
    @close="addressVisible=false"
  )
    el-tabs(v-model="addressActive" type="border-card")
      el-tab-pane(
        v-for="item in addressChains"
        :key="item.chain"
        :label="CHAINMAP[item.chain]"
        :name="item.chain"
      )
        p.qrcode.center
          img(:src='item.qrcode')
        p.layout-row__between(style="margin-top: 20px")
          span(style="align-self:center") 充币收款地址
          span.layout-row
            span(style="align-self:center") {{item.address}}
  //- 收款记录
  el-dialog(
    title='收款记录'
    :visible.sync='depositVisible'
    width="60%"
    class="quota-dialog"
    @close="depositVisible=false"
  )
    el-table(
      :height="500"
      header-align='center'
      :stripe="true"
      :border="true"
      :highlight-current-row="true"
      align='center'
      :data='depositList'
      style='width: 100%'
    )
      el-table-column(prop='chain', label='链名称' show-overflow-tooltip align="center")
        template(slot-scope="scope")
          span {{CHAINMAP[scope.row.chain]}}
      el-table-column(prop='amount', label='个数' show-overflow-tooltip align="center")
      el-table-column(prop='fee', label='手续费' show-overflow-tooltip align="center")
      el-table-column(prop='address', label='收款地址' show-overflow-tooltip align="center")
      el-table-column(prop='created-at', label='发起时间' show-overflow-tooltip align="center")
        template(slot-scope="scope")
          span {{scope.row['created-at']}}
      el-table-column(prop='state', label='状态' show-overflow-tooltip align="center")
        template(slot-scope="scope")
          el-link(v-if="scope.row.state==='safe'" type="success") 已完成
          el-link(v-if="scope.row.state==='unknown'" type="info") 状态未知
          el-link(v-if="scope.row.state==='orphan'" type="warning") 待确认
          el-link(v-if="scope.row.state==='confirming' || scope.row.state==='confirmed'" type="primary") 状态未知
  //- 转出记录
  el-dialog(
    title='转出记录'
    :visible.sync='withdrawVisible'
    width="50%"
    class="quota-dialog"
    @close="withdrawVisible=false"
  )
    el-table(
      :height="500"
      header-align='center'
      :stripe="true"
      :border="true"
      :highlight-current-row="true"
      align='center'
      :data='withdrawList'
      style='width: 100%'
    )
      el-table-column(prop='chain', label='链名称' show-overflow-tooltip align="center")
        template(slot-scope="scope")
          span {{CHAINMAP[scope.row.chain]}}
      el-table-column(prop='amount', label='个数' show-overflow-tooltip align="center")
      el-table-column(prop='fee', label='手续费' show-overflow-tooltip align="center")
      el-table-column(prop='address', label='转出地址' show-overflow-tooltip align="center")
      el-table-column(prop='created-at', label='发起时间' show-overflow-tooltip align="center")
        template(slot-scope="scope")
          span {{scope.row['created-at']}}
      el-table-column(prop='state', label='状态' show-overflow-tooltip align="center")
        template(slot-scope="scope")
          el-link(v-if="scope.row.state==='submitted'" type="success") 已提交
          el-link(v-if="scope.row.state==='reexamine'" type="warning") 审核中
          el-link(v-if="scope.row.state==='canceled'" type="danger") 已撤销
          el-link(v-if="scope.row.state==='pass'" type="success") 审批通过
          el-link(v-if="scope.row.state==='reject'" type="danger") 审批拒绝
          el-link(v-if="scope.row.state==='pre-transfer'" type="primary") 处理中
          el-link(v-if="scope.row.state==='wallet-transfer'" type="primary") 已汇出
          el-link(v-if="scope.row.state==='wallet-reject'" type="danger") 钱包拒绝
          el-link(v-if="scope.row.state==='confirm-error'" type="danger") 区块确认错误
          el-link(v-if="scope.row.state==='repealed'" type="danger") 已撤销
          el-link(v-if="scope.row.state==='confirmed'" type="success") 区块已确认
  //- 手动转账
  el-dialog(
    title='手动转账'
    :visible.sync='withdrawCreateVisible'
    width="50%"
    class="quota-dialog"
    @close="withdrawCreateVisible=false"
  )
    el-form(:model='withdrawCreateForm' :rules="withdrawCreateFormRules" ref="withdrawCreateForm" label-width="150px")
      el-form-item(prop="withdrawCreateActive" label="链类型" style="margin-bottom: 0")
        el-radio-group(v-model="withdrawCreateForm.withdrawCreateActive" @change="changedwithdrawCreateType")
          el-radio(label="trc20usdt") {{CHAINMAP['trc20usdt']}}
          el-radio(label="usdterc20") {{CHAINMAP['usdterc20']}}
          el-radio(label="usdt") {{CHAINMAP['usdt']}}
        div
          i.el-icon-warning
          span 请确保转出地址与选择的链类型一致
      el-form-item
        el-card
          el-row.layout-row
            el-col(:span="8")
              .layout-row__between(style="border-right: 1px solid #ccc;padding-right: 20px")
                span 单次最小转出金额
                span {{withdrawCreateActiveInfo.minWithdrawAmt}}
            el-col(:span="8" style="margin:0 20px;")
              .layout-row__between(style="border-right: 1px solid #ccc;padding-right: 20px")
                span 单次最小转入数量
                span {{withdrawCreateActiveInfo.minDepositAmt}}
            el-col(:span="8")
              .layout-row__between
                span 单次最大转入数量
                span {{Number(withdrawCreateActiveInfo.maxWithdrawAmt)}}
          el-row.layout-row
            el-col(:span="8")
              .layout-row__between(style="border-right: 1px solid #ccc;padding-right: 20px")
                span 转账精度
                span {{withdrawCreateActiveInfo.withdrawPrecision}}
            el-col(:span="8" style="margin:0 20px;")
              .layout-row__between(style="border-right: 1px solid #ccc;padding-right: 20px")
                span 矿工费类型(火币转账费类型)
                span(v-if="withdrawCreateActiveInfo.withdrawFeeType === 'fixed'") 固定
                span(v-if="withdrawCreateActiveInfo.withdrawFeeType === 'circulated'") 浮动
                span(v-if="withdrawCreateActiveInfo.withdrawFeeType === 'ratio'") 比例
            el-col(:span="8" v-if="withdrawCreateActiveInfo.withdrawFeeType === 'fixed'")
              .layout-row__between
                span 单笔固定矿工费
                span {{Number(withdrawCreateActiveInfo.transactFeeWithdraw)}}
            el-col(:span="8" v-if="withdrawCreateActiveInfo.withdrawFeeType === 'circulated'")
              .layout-row__between
                span 单笔浮动矿工费
                span {{Number(withdrawCreateActiveInfo.minTransactFeeWithdraw)}} ~ {{Number(withdrawCreateActiveInfo.maxTransactFeeWithdraw)}}
            el-col(:span="8" v-if="withdrawCreateActiveInfo.withdrawFeeType === 'ratio'")
              .layout-row__between
                span 单笔比例矿工费
                span {{Number(withdrawCreateActiveInfo.transactFeeRateWithdraw)}}(最大{{Number(withdrawCreateActiveInfo.maxTransactFeeWithdraw)}})
      el-form-item(label='转出地址' prop="address")
        el-input(v-model='withdrawCreateForm.address', autocomplete='off' placeholder="请确保地址已在您的火币账户常用地址中")
        div
          i.el-icon-warning
          span 转账API 仅支持火币用户
          el-link(type="primary" target="_blank" href="https://www.hbg.com/zh-cn/withdraw_address/")  常用地址列表
          span 中的地址
        div
          i.el-icon-warning
          span 请使用此功能前先添加转出地址到火币
          el-link(type="primary" target="_blank" href="https://www.hbg.com/zh-cn/withdraw_address/") 常用地址列表
      el-form-item(label='转出数量' prop="amount")
        el-input(v-model='withdrawCreateForm.amount', autocomplete='off' type="number" :min="1")
          template(slot="append") USDT
      el-form-item(label='转账手续费' prop="fee")
        el-input(v-model='withdrawCreateForm.fee' disabled autocomplete='off')
          template(slot="append") USDT
    .dialog-footer(slot='footer')
      el-button(@click='withdrawCreateVisible = false') 取 消
      el-button(type='primary', @click='transfer' :loading="transferLoading") 确 定
  .wjp-tools.layout-row__between
    .buttons
      el-button(type='primary' @click="addVisible = true" size="mini") 添加火币账号
    .layout-row
      span(style="align-self: center") 最新USDT法币交易报价：
      span(style="margin: 0 5px;align-self: center") 1 USDT ≈≈ {{price.buy}} 元
      el-link.el-icon-refresh(style="align-self: center;font-size: 22px" @click="getPrice")
  .wjp-content.flex.layout-column
      el-table.wjp-table(
        header-align='center'
        :stripe="true"
        :border="true"
        :highlight-current-row="true"
        align='center'
        v-loading="loading"
        :data='tableData'
        style='width: 100%'
      )
          el-table-column(prop='name', label='账号名称', width=200 show-overflow-tooltip align="center")
          el-table-column(label='现货账户' show-overflow-tooltip align="center")
            el-table-column(prop="spot_trade" label="可用数量" width="300" show-overflow-tooltip align="center")
              template(slot-scope="scope")
                span(v-show="scope.row.spot_trade === '**********'") **********
                span(v-show="scope.row.spot_trade !== '**********'") {{scope.row.spot_trade}}个 ≈≈ {{(Number(scope.row.spot_trade) * price.buy).toFixed(2)}} 人民币
            el-table-column(prop="spot_frozen" label="冻结数量" width="300" show-overflow-tooltip align="center")
              template(slot-scope="scope")
                span(v-show="scope.row.spot_frozen === '**********'") **********
                span(v-show="scope.row.spot_frozen !== '**********'") {{scope.row.spot_frozen}}个 ≈≈ {{(Number(scope.row.spot_frozen) * price.buy).toFixed(2)}} 人民币
          //- el-table-column(label='OTC账户' show-overflow-tooltip align="center")
          //-   el-table-column(prop="otc_trade" label="可用数量" width="120" show-overflow-tooltip align="center")
          //-   el-table-column(prop="otc_frozen" label="冻结数量" width="120" show-overflow-tooltip align="center")
          el-table-column(label='操作')
            template(slot-scope='scope')
              el-button(type='primary',size='mini' :loading="withdrwaCreateLoading" @click="withdrwaCreate(scope.row)") 手动转账
              el-button(type='primary',size='mini' :loading="balanceSpotLoading" @click="getUsdtBalance('spot',scope.row)") 余额查询
              //- el-button(type='primary',size='mini' :loading="balanceOtcLoading" @click="getUsdtBalance('otc',scope.row)") OTC余额查询
              el-button(type='primary',size='mini' :loading="quotaLoading" @click="getUsdtQuota(scope.row)") 转账额度查询
              el-button(type='primary',size='mini' :loading="addressLoading" @click="getUsdtAddress(scope.row)") 收款地址查询
              el-button(type='primary',size='mini' :loading="depositLoading" @click="getUsdtRecord('deposit', scope.row)") 收款记录
              el-button(type='primary',size='mini' :loading="withdrawLoading" @click="getUsdtRecord('withdraw', scope.row)") 转出记录
              span(style="margin-left: 5px")
                el-popover(
                  placement="top"
                  width="160"
                  v-model="scope.row.deleteVisible"
                )
                  p 即将删除此USDT账号配置, 是否继续?
                  div(style="text-align: right; margin-top: 10px")
                    el-button(size="mini" type="text" @click="scope.row.deleteVisible = false") 取消
                    el-button(size="mini" type="primary" @click="deleteUSDT(scope.row)") 确定
                  el-button(slot="reference" :loading="deleteLoading" type="danger" size="mini") 删除
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
          layout=" prev, pager, next,total"
          :total="totalPage")
  el-dialog(title='账号信息', :visible.sync='addVisible' :close-on-click-modal='true')
    el-form(:model='form' :rules="rules" ref="form" label-width="150px")
      el-form-item(label='火币api_key' prop="api_key")
        el-input(v-model='form.api_key', autocomplete='off')
      el-form-item(label='火币secret_key' prop="secret_key")
        el-input(v-model='form.secret_key', autocomplete='off')
      el-form-item(label='账号备注' prop="name")
        el-input(v-model='form.name', autocomplete='off')
    .dialog-footer(slot='footer')
      el-button(@click='addVisible = false') 取 消
      el-button(type='primary', @click='submit' v-loading="submitLoading") 确 定
</template>

<script>
import {
  getUsdtAccount,
  addUsdtAccount,
  updateUsdtAccount,
  getUsdtBalance,
  getUsdtAddress,
  getUsdtQuota,
  getRecord,
  getCurrencies,
  deleteUsdt,
  getUsdtPrice,
  withdrawCreate
} from "@/api/usdt";
import { parseTime } from '@/utils/index'
import { mapGetters, mapState } from "vuex";
import { debuglog } from "util";
export default {
  components: {},
  data() {
    return {
      activeRow: {},
      price: {
        buy: 0
      },
      CHAINMAP: { // 链名称对应
        trc20usdt: 'TRC20',
        usdterc20: 'ERC20',
        usdt: 'OMNI'
      },
      currencies: [], // USDT链常规信息
      withdrawCreateActiveInfo: {},
      withdrawCreateForm: {  // 提现表单
        withdrawCreateActive: 'trc20usdt',
        address: '',
        amount: '',
        currency: 'usdt',
        fee: 0,
        chain: 'trc20usdt'
      },
      withdrawCreateFormRules: { // 提现表单规则
        address: [{ required: true, message: "请输入转出地址", trigger: "blur" }],
        amount: [{ required: true, message: "请输入转出数量", trigger: "blur" }]
      },
      transferLoading: false,
      deleteLoading: false,
      withdrwaCreateLoading: false,
      withdrawCreateVisible: false,
      depositLoading: false,
      withdrawLoading: false,
      depositVisible: false,
      withdrawVisible: false,
      recordType: 'deposit', // 记录类型（转出/转入）
      depositList: [], // 转入记录
      withdrawList: [], // 转出记录
      quotaVisible: false,
      quotaChains: [],
      addressVisible: false,
      addressChains: [],
      quotaActive: 'trc20usdt',
      addressActive: 'trc20usdt',
      quotaLoading: false,
      balanceSpotLoading: false,
      addressLoading: false,
      balanceOtcLoading: false,
      submitLoading: false,
      loading: false,
      form: {
        api_key: "",
        name: "",
        secret_key: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        api_key: [
          { required: true, message: "请输入api_key", trigger: "blur" }
        ],
        secret_key: [
          { required: true, message: "请输入secret_key", trigger: "blur" }
        ]
      },
      addVisible: false,
      tableData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 30 //当前页显示数量
    };
  },
  watch: {},
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"]),
    payWay() {
      return this.settings.dict.SettlementType.dicts;
    }
  },
  mounted() {
    this.getTableData();
    this.getPrice()
  },
  methods: {
    // 手动转账
    transfer () {
      this.$refs['withdrawCreateForm'].validate(valid => {
        if (valid) {
          this.transferLoading = true
          withdrawCreate({
            usdt_config_id: this.activeRow.usdt_config_id,
            ...this.withdrawCreateForm
          }).then(res => {
            if (res.code === 200) {
              this.$message.success('转账成功')
              this.$refs['withdrawCreateForm'].resetFields();
              this.withdrawCreateVisible = false
            }
          }).catch(e => {
            console.log(e)
          }).finally(_ => {
            this.transferLoading = false;
          });
        }
      })
    },
    // 获取报价
    getPrice () {
      getUsdtPrice().then(res => {
        if (res.code === 200) {
          this.price = res.data
          this.$notify({
            title: '已获取最新USDT报价',
            message: `1USDT当前购买价格约等于${this.price.buy}元, 当前出售价格约等于${this.price.sell}元`,
            type: 'success'
          });
        }
      })
    },
    // 删除usdt配置
    deleteUSDT (data) {
      this.deleteLoading = true
      deleteUsdt({
        usdt_config_id: data.usdt_config_id
      }).then(res => {
        this.$message.success('删除成功')
        this.getTableData()
      }).catch(err => {})
      .finally(_ => {
        this.deleteLoading = false;
      });
    },
    // 修改转账链
    changedwithdrawCreateType (val) {
      if (val === 'usdterc20') {
        this.withdrawCreateForm.chain = "usdterc20"
        this.withdrawCreateActiveInfo = this.currencies.find(n => n.chain === 'usdterc20')
      } else if (val === 'trc20usdt') {
        this.withdrawCreateForm.fee = 0
        this.withdrawCreateForm.chain = "trc20usdt"
        this.withdrawCreateActiveInfo = this.currencies.find(n => n.chain === 'trc20usdt')
      } else {
        this.withdrawCreateForm.fee = 5
        this.withdrawCreateForm.chain = "usdt"
        this.withdrawCreateActiveInfo = this.currencies.find(n => n.chain === 'usdt')
      }
      if (this.withdrawCreateActiveInfo.withdrawFeeType === 'fixed') {
        this.withdrawCreateForm.fee = this.withdrawCreateActiveInfo.transactFeeWithdraw
      }
    },
    // 手动转账
    withdrwaCreate (data) {
      this.withdrwaCreateLoading = true
      getCurrencies({
        usdt_config_id: data.usdt_config_id
      }).then(res => {
        this.currencies = res.data
        this.withdrawCreateActiveInfo = this.currencies.find(n => n.chain === 'trc20usdt')
        this.withdrawCreateVisible = true
        this.activeRow = data
      }).catch(err => {})
      .finally(_ => {
        this.withdrwaCreateLoading = false;
      });
    },
    // 获取充提记录
    getUsdtRecord (type, row) {
      this[type + 'Loading'] = true
      this.recordType = type
      getRecord({
        usdt_config_id: row.usdt_config_id,
        type
      }).then(res => {
        res.data.forEach(item => {
          item['created-at'] = parseTime(item['created-at'])
        })
        this[type + 'Visible'] = true
        this[type + 'List'] = res.data
      }).catch(err => {})
      .finally(_ => {
        this.depositLoading = false;
        this.withdrawLoading = false;
      });
    },
    //添加USDT账号
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const fn = this.form.id ? updateUsdtAccount : addUsdtAccount;
          this.submitLoading = true
          fn({
            ...this.form,
            id: this.userinfo.id
          }).then(res => {
            console.log(res)
            this.$message.success("添加成功！");
            this.$refs['form'].resetFields();
            this.getTableData();
            this.addVisible = false
          }).catch(e => {
            console.log(e)
          }).finally(_ => {
            this.submitLoading = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取提币地址
    getUsdtAddress(data) {
      this.addressLoading = true;
      getUsdtAddress({
        usdt_config_id: data.usdt_config_id
      })
        .then(res => {
          res.data.forEach(item => {
            item.qrcode = `https://tool.oschina.net/action/qrcode/generate?data=${item.address}&output=image%2Fgif&error=L&type=0&margin=0&size=4&1574136205967`
          })
          this.addressVisible = true
          this.addressChains = res.data
        })
        .catch(err => {})
        .finally(_ => {
          this.addressLoading = false;
        });
    },
    //获取提币余额
    getUsdtQuota(data) {
      this.quotaLoading = true;
      getUsdtQuota({
        usdt_config_id: data.usdt_config_id
      })
        .then(res => {
          this.quotaChains = res.data.chains
          this.quotaVisible = true
        })
        .catch(err => {})
        .finally(_ => {
          this.quotaLoading = false;
        });
    },
    //获取余额
    getUsdtBalance(type, data) {
      // this.loading = true;
      type === "spot" ? this.balanceSpotLoading = true : this.balanceOtcLoading = true
      getUsdtBalance({
        usdt_config_id: data.usdt_config_id,
        account_id: type === "spot" ? data.spot_id : data.otc_id
      })
        .then(res => {
          res.data.map(item => {
            this.$set(data, `${type}_${item.type}`, item.balance);
          });
        })
        .catch(err => {})
        .finally(_ => {
          this.balanceSpotLoading = false
          this.balanceOtcLoading = false
        });
    },
    // 获取配置信息
    getTableData() {
      this.loading = true;
      getUsdtAccount({
        id: this.userinfo.id
      })
        .then(res => {
          res.data.forEach(item => {
            item.spot_trade = "**********"
            item.spot_frozen = "**********"
            item.otc_trade = "**********"
            item.otc_frozen = "**********"
            item.deleteVisible = false
          })
          this.tableData = res.data;
        })
        .catch(err => {
          this.$message.error("获取表格数据失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
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
.quota-dialog /deep/ .el-dialog__body{
  padding-top: 0;
}
</style>
