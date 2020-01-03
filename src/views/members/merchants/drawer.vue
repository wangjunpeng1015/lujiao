<template lang="pug">
el-drawer(title='通道利率',size="50%" ,:visible.sync='visible', direction='rtl', :before-close='cancel')
    .wjp-tools.layout-row__between
      div
        el-button(v-if="userinfo.roleId == 3" type='primary' @click="addVisible = true") 添加通道
      .buttons.layout-row.align-center
        el-input(v-model='minRate',@keyup.enter.native="getTableData" placeholder='最小利率' style="width:100px;")
        div - 
        el-input(v-model='maxRate',@keyup.enter.native="getTableData" placeholder='最大利率' style="width:100px;")
        el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
    el-table.wjp-table(v-loading="loading" , :data='drawerData', style='width: 100%', height='550')
      el-table-column(prop='merchantAccount', label='商户账号')
      el-table-column(label='通道名称')                        
        template(slot-scope='scope')
          p {{ dicFilter(scope.row.proxyOpenPayConfigPayDictId) }}
      el-table-column(prop="proxyOpenPayConfigRemark" label='备注')                        
      el-table-column(label='通道利率' width="80")
        template(slot-scope='scope')
          div(v-if="userinfo.roleId != 2")
              el-input(v-if="scope.row.show" v-model='scope.row.interestRate',@blur="changeRate(scope.row)" placeholder='利率' style="width:100px;")
              span(v-else @click.stop="$set(scope.row,'show',true)") {{ scope.row.interestRate }}
          p(v-else) {{ scope.row.interestRate  }}
      el-table-column(prop='createTime', label='创建时间')
      el-table-column(label='操作' v-if="userinfo.roleId!=2")
        template(slot-scope='scope')
            el-switch(v-model='scope.row.state', @change="shutdownChannel(scope.row.id)" :active-text="scope.row.state?'开启':'关闭'")
            el-button(style="margin-left:10px" size="mini" type='danger' @click="delMerchantChannel(scope.row)") 删除
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
    add-channel(@finish="getTableData" :id="data.id" :visible.sync="addVisible")
</template>

<script>
import addChannel from "@/views/members/merchants/addChannel";
import { mapGetters, mapState } from "vuex";
import {
  getMerchantChannel,
  delMerchantChannel,
  changeRate,
  shutdownChannel
} from "@/api/members";
export default {
  components: {
    addChannel
  },
  props: {
    visible: {
      default() {
        return false;
      },
      type: Boolean
    },
    data: {
      default() {
        return {};
      },
      type: Object
    }
  },
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
  watch: {
    visible(val) {
      if (val) {
        this.getTableData();
      }
    }
  },
  data() {
    return {
      addVisible: false,
      minRate: "",
      maxRate: "",
      loading: false,
      drawerData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.$emit("finish");
      this.$emit("update:visible", false);
    },
    //关闭/开启通道
    shutdownChannel(id) {
      shutdownChannel(id)
        .then(ers => {
          this.$message.success("状态修改成功！");
        })
        .catch(err => {
          this.$message.error("状态修改失败！");
        })
        .finally(_ => {
          this.getTableData();
        });
    },
    //修改利率
    changeRate(data) {
      this.$set(data, "show", false);
      if (data.oldinterestRate === data.interestRate) {
        return;
      }
      this.loading = true;
      changeRate({
        id: data.id,
        rate: data.interestRate
      })
        .then(res => {
          this.$message.success("修改利率成功！");
        })
        .catch(err => {
          this.$message.error("修改利率失败！");
        })
        .finally(_ => {
          this.loading = false;
          this.getTableData();
        });
    },
    //删除通道
    delMerchantChannel(data) {
      const name = this.dicFilter(data.proxyOpenPayConfigPayDictId);
      this.$confirm(`确定删除通道 ${name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delMerchantChannel(data.id)
            .then(res => {
              this.$message.success("删除成功！");
            })
            .catch(err => {
              this.$message.error("删除失败！");
            })
            .finally(_ => {
              this.getTableData();
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    dicFilter(id) {
      return this.payWay.find(n => n.id == id).dictValueDisplayName;
    },
    getTableData() {
      this.loading = true;
      getMerchantChannel({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          merchantAccount: this.data.account,
          minRate: this.minRate,
          maxRate: this.maxRate
        }
      })
        .then(res => {
          if (res.success) {
            let { totalRecords, pageNo, pageSize, content } = res.data;
            this.totalPage = totalRecords;
            this.pageSize = pageSize;
            this.currentPage = pageNo;
            content.map(item => {
              item.oldinterestRate = item.interestRate;
            });
            this.drawerData = content;
          } else {
            this.$message.error("获取表格数据失败！");
          }
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
</style>
