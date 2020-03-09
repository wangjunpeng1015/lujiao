<template lang="pug">
.pay-container.layout-column
  .wjp-tools.layout-row__between
    div
      el-button(type='primary' @click="addChannel") 添加账号
    el-form(label-width='120px' :inline="true")
      el-form-item(label='账号',)
        el-input(v-model='account' placeholder="查询账号")
      el-form-item(label='每日限额', )
        .layout-row
          el-input(v-model='min' style="width:90px")
          |-
          el-input(v-model='max' style="width:90px")
      el-form-item()
        el-select(v-model='used', placeholder='是否启用' clearable @change="getAllAcount")
          el-option(label='启用', :value='true')
          el-option(label='禁用', :value='false')
      el-form-item()
        el-select(v-model='accountType', placeholder='请填写类型' style="width:100%" clearable  @change="getAllAcount")
          el-option(v-for='item in payWay', :key='item.value', :label='item.label', :value='item.value')
      el-form-item()
        el-button(type='primary', @click='getAllAcount') 查 询
  .wjp-content.layout-column.flex
    el-table.wjp-table(v-loading="loading" :data='dqyhpz', style='width: 100%', height='250')
      el-table-column(fixed prop='id', label='id', width='50')
      el-table-column(prop='account', label='账号')
      el-table-column( label='账户类型')
        template(slot-scope='scope')
          p {{ dicFilter(scope.row.accountType) }}
      el-table-column(prop='dailyCeiling', label='今日限额')
      el-table-column(label='编辑')
        template(slot-scope='scope')
          el-button(type="primary" @click="edit(scope.row)" size='mini') 编辑
      el-table-column(label='操作' width="200")
        template(slot-scope='scope')
          el-switch(v-model='scope.row.used', :active-text="scope.row.used?'启用':'禁用'" @change="useChange(scope.row.id,$event)")
      el-table-column(width="100")
        template(slot-scope='scope')
          el-button(type="danger" @click="del(scope.row.id)" size='mini') 删 除
  .page.layout-row.align-center.right
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
  //添加/修改
  el-dialog(title='添加账号', :visible.sync='acVisible',  width='40%' :close-on-click-modal="false")
    el-form(:model='news', :rules='rules', ref='news', label-width='120px')
      el-form-item(label='类型', prop='accountType')
        el-select(v-model='news.accountType', placeholder='请填写类型' style="width:100%")
          el-option(v-for='item in payWay', :key='item.value', :label='item.label', :value='item.value')
      el-form-item(label='账号', prop='account' )
        el-input(v-model='news.account' placeholder="请填写新加账号")
      el-form-item(label='每日收款上限', prop='dailyCeiling' placeholder="请填写每日收款上限")
        el-input(v-model.number='news.dailyCeiling' type="number")
    span.dialog-footer(slot='footer')
      el-button(@click='cancel') 取 消
      el-button(type='primary', @click='addAccount') 确 定
  Drawer(:visible.sync="visible" @finish="getAllAcount" :account="chooseAccount" :channels="channels")

</template>

<script>
import {
  getAllAcount,
  delAcount,
  updateUse,
  updateConfigPay,
  addAcount
} from "@/api/pay";
import { getAllchannel } from "@/api/agent";
import { mapState } from "vuex";
import Drawer from "@/components/Pay/Drawer";
export default {
  name: "pay",
  components: {
    Drawer
  },
  computed: {
    ...mapState(["settings"]),
    payWay() {
      let array = [];
      this.channels.map(m => {
        const way = this.settings.dict.PayWay.dicts.find(
          n => n.id == m.payWayDictId
        );
        if (way) {
          array.push(way);
        }
      });
      return this.settings.payWay.filter(n => {
        return array.some(m => m.dictValue.includes(n.value));
      });
    }
  },
  data() {
    return {
      news: {
        account: "",
        accountType: "",
        city: "default",
        dailyCeiling: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "change" }],
        accountType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        // city: [
        //   { required: true, message: "请填写账号所在城市", trigger: "change" }
        // ],
        dailyCeiling: [
          { required: true, message: "请输入当日上限", trigger: "change" }
        ]
      },
      acVisible: false,
      chooseAccount: "",
      loading: false,
      visible: false,
      used: "",
      account: "",
      accountType: "",
      min: "",
      max: "",
      channels: [],
      dqyhpz: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10 //当前页显示数量
    };
  },
  created() {
    this.getAllAcount();
    this.getAllchannel();
  },
  mounted() {},
  methods: {
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
    edit(data) {
      this.chooseAccount = data;
      this.visible = true;
      console.log(this.channels);
    },

    getAllAcount() {
      this.loading = true;
      getAllAcount({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          account: this.account, //账号
          used: this.used, //是否启用
          accountType: this.accountType, //类型
          min: this.min, //最小
          max: this.max //最大
        }
      })
        .then(res => {
          const { totalRecords, pageNo, pageSize, content } = res.data;
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
      this.acVisible = true;
      this.news = {
        account: "",
        accountType: "",
        city: "default",
        dailyCeiling: ""
      };
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
    addAccount() {
      this.loading = true;
      this.$refs.news.validate(valid => {
        if (valid) {
          addAcount(this.news)
            .then(res => {
              this.getAllAcount();
              this.$message.success("添加账号成功！");
              this.cancel();
            })
            .catch(err => {
              this.$message.error(err.message);
            })
            .finally(e => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
    cancel() {
      this.$refs.news.resetFields();
      this.acVisible = false;
    },
    //转换名字
    dicFilter(val) {
      return this.settings.payWay.find(item => val == item.value).label;
    },

    sizeChange(num) {
      this.pageSize = num;
      this.getAllAcount();
    }
  }
};
</script>

<style lang="scss" scoped>
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
