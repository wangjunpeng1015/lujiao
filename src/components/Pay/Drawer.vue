<template lang="pug">
div
  el-drawer(title='账号配置',size="60%", @close='cancel', :visible.sync='visible', direction='rtl', custom-class='drawer', ref='drawer')
    .container.layout-column
      .wjp-tools.layout-row__between
        div
          el-button(v-if="(userinfo.roleId ==4 || userinfo.roleId ==1)&&!(single&&table.length<2)" type='primary' @click="addChannel" size="mini") 添加收款方式
        .layout-row.buttons
          //- el-select(v-model='payWayDictId', placeholder='支付方式' clearable @change="getPays")
          //-   el-option(v-for='item in payWay', :key='item.id', :label='item.dictValueDisplayName', :value='item.id')
          el-select(size="mini" v-model='used', placeholder='是否启用' clearable @change="getPays")
            el-option(label='启用', :value='true')
            el-option(label='禁用', :value='false')
      .wjp-content
        el-table.wjp-table(v-loading="loading" :data='table', style='width: 100%')
          //- el-table-column(fixed prop='id', label='id', width='50')
          //- el-table-column(prop='payWayDictId', label='支付名称')
          //-   template(slot-scope='scope')
          //-     span {{ dicFilter(scope.row.payWayDictId) }}
          //- el-table-column(prop='optional_1', label='支付类型')
          el-table-column(label="连续失败" prop="failuresNum")
          el-table-column(label='金额'  show-overflow-tooltip)
            template(slot-scope='scope')
              span {{scope.row.singleCeilingMin}}-{{scope.row.singleCeilingMax}}
          //- el-table-column(prop='remark', label='备注'  show-overflow-tooltip)
          //- el-table-column(label='编辑' v-if="userinfo.roleId == 4 || userinfo.roleId === 1")
            template(slot-scope='scope')
              el-button(type="primary" @click="edit(scope.row)" size='mini') 编辑
          el-table-column(label='是否开启')
            template(slot-scope='scope')
              el-switch(v-model='scope.row.used', :active-text="scope.row.used?'开启':'关闭'" @change="useChange(scope.row.id,$event)")
          el-table-column( label="操作")
            template(slot-scope='scope')
              el-button(type="primary" v-if="userinfo.roleId == 4 || userinfo.roleId === 1" @click="edit(scope.row)" size='mini') 编辑
              el-button(type="danger" @click="del(scope.row.id)" size='mini') 删 除
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
  AddModal(@finish="getPays" :isAdd="isAdd" :visible.sync="drawerVisible" :data="form" :payWayId="payWayId" :account="account")
</template>

<script>
import { getPays, updatePayUse, delConfigPay } from "@/api/pay";
import { cloneDeep } from "lodash";
import { mapState, mapGetters } from "vuex";
import { decrypt } from "@/utils/index";
import AddModal from "@/components/Pay/AddModal";
import { setTimeout } from "timers";
export default {
  props: {
    visible: {
      default() {
        return false;
      },
      type: Boolean
    },
    account: {
      default() {
        return {};
      }
    },
    channels: {
      default() {
        return [];
      }
    },
    payWayId: {
      default() {
        return 0;
      }
    },
    single: {
      default() {
        return false;
      },
      type: Boolean
    }
  },
  components: {
    AddModal
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["userinfo"])
    // payWay() {
    //   if (this.settings.dict && !!this.account) {
    //     return this.settings.dict.filter(item => {
    //       return this.channels.find(n => n.payWayDictId == item.id);
    //     });
    //   } else {
    //     return [];
    //   }
    // }
  },
  watch: {
    account: {
      handler(val) {
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
        // merchantIds: form.merchants,
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
          if (this.single) {
            this.$emit("update:visible", false);
            if (!this.table.length) {
              this.addChannel();
            } else {
              this.edit(this.table[0]);
            }
          }
        })
        .catch(err => {})
        .finally(_ => {
          this.loading = false;
        });
    },
    del(id) {
      this.$confirm("确定删除当前通道?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          delConfigPay(id)
            .then(res => {
              this.getPays();
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
    useChange(id, used) {
      this.loading = true;
      updatePayUse({
        id,
        used
      })
        .then(res => {
          this.$message.success("状态修改成功！");
        })
        .finally(_ => {
          this.loading = false;
          this.getPays();
        });
    },
    cancel() {
      this.$emit("finish");
      this.$emit("update:visible", false);
    },
    addChannel() {
      this.form = {
        contentObj: {}
        // merchantIds: []
      };
      this.isAdd = true;
      this.drawerVisible = true;
    },
    // dicFilter(id) {
    //   let payWay = this.payWay.find(item => id == item.id);
    //   return payWay
    //     ? this.payWay.find(item => id == item.id).dictValueDisplayName
    //     : "";
    // },
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
  overflow: auto;
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
