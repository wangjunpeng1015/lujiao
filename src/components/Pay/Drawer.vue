<template lang="pug">
div
  el-drawer(title='账号通道',size="50%", :before-close='cancel', :visible.sync='visible', direction='rtl', custom-class='drawer', ref='drawer')
    .container.layout-column
      .wjp-tools.layout-row__between
        div
          el-button(type='primary' @click="addChannel") 添加收款方式
        .layout-row.buttons
          el-select(v-model='payWayDictId', placeholder='支付方式' clearable @change="getPays")
            el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
          el-select(v-model='used', placeholder='是否启用' clearable @change="getPays")
            el-option(label='启用', :value='true')
            el-option(label='禁用', :value='false')
      .wjp-content.layout-column.flex
        el-table.wjp-table(v-loading="loading" :data='table', style='width: 100%', height='250')
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
  AddModal(@finish="getPays" :isAdd="isAdd" :visible.sync="drawerVisible" :data="form" :payWay='payWay' :account="account")
</template>

<script>
import { getPays, updatePayUse } from "@/api/pay";
import { cloneDeep } from "lodash";
import { mapState } from "vuex";
import { decrypt } from "@/utils/index";
import AddModal from "@/components/Pay/AddModal";
import { debuggerStatement } from "babel-types";
export default {
  props: ["visible", "account"],
  components: {
    AddModal
  },
  computed: {
    ...mapState(["settings"]),
    payWay() {
      if (this.settings.dict && !!this.account) {
        return this.settings.dict.PayWay.dicts.filter(item => {
          return item.dictValue.startsWith(this.account.accountType);
        });
      } else {
        return [];
      }
    }
  },
  watch: {
    account: {
      handler() {
        this.getPays();
      },
      deep: true
    }
  },
  data() {
    return {
      form: {},
      isAdd: false,
      loading: false,
      drawerVisible: false,
      payWayDictId: "",
      used: "",
      table: [], //
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  created() {},
  mounted() {},
  methods: {
    edit(data) {
      this.isAdd = false;
      this.drawerVisible = true;
      let form = cloneDeep(data);
      let contentObj = decrypt(form.content, form.payKey);
      //当面付
      this.form = {
        id: form.id,
        payWayDictId: form.payWayDictId,
        used: form.used,
        remark: form.remark,
        singleCeilingMin: form.singleCeilingMin,
        singleCeilingMax: form.singleCeilingMax,
        qrCodeAdd: form.qrCodeAdd,
        forNight: form.forNight,
        ceiling: form.ceiling,
        contentObj
      };
    },
    getPays() {
      this.loading = true;
      getPays({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          payConfigAccountId: this.account.id, //
          payWayDictId: this.payWayDictId, //支付类型
          used: this.used //是否启用
        }
      })
        .then(res => {
          const { totalRecords, pageNo, pageSize, content } = res.data;
          this.totalPage = totalRecords;
          this.pageSize = pageSize;
          this.currentPage = pageNo;
          this.table = content;
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    useChange(id, used) {
      updatePayUse({
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
    cancel() {
      this.$emit("finish");
      this.$emit("update:visible", false);
    },
    addChannel() {
      this.isAdd = true;
      this.drawerVisible = true;
    },
    dicFilter(id) {
      return this.payWay.find(item => id == item.id).dictValueDisplayName;
    },
    save() {},
    sizeChange(num) {
      this.pageSize = num;
      this.getPays();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
>>> .drawer {
  padding: 20px;
  header {
    padding-left: 0;
    span {
      font-size: 24px;
      font-weight: bold;
      // color: #000;
    }
  }
}
</style>
