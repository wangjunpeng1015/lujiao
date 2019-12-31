<template lang="pug">
.orders-container.layout-column
  .wjp-tools
      el-button(type='primary' @click="addAgent") 添加代理
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='tableData', style='width: 100%', height='250')
          el-table-column(prop='account', label='账号', )
          el-table-column(prop='phone', label='手机', )
          el-table-column(prop='createTime', label='开通时间')
          el-table-column(label='操作')
            template(slot-scope='scope')
               el-button(size="mini" type='primary' @click="edit(scope.row)") 编辑
               el-button(size="mini" type='danger' @click="delUser(scope.row)") 删除
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
  //---------------------------------------- 弹窗
  //- 添加代理弹窗
  el-dialog(title="添加代理", :visible.sync='agentVisible' width="30%" label-width="80px")
    el-form.dialog-form(ref="form" :model='form' :rules="rules")
      .layout-row__between
        el-form-item(label='账号', prop="account")
          el-input(v-model='form.account')
        el-form-item(label='密码', prop="userPassword")
          el-input(v-model='form.userPassword')
      .layout-row__between
        el-form-item(label='手机号', prop="phone")
          el-input(v-model='form.phone')
    .dialog-footer(slot='footer')
      el-button(@click='agentVisible = false') 取 消
      el-button(type='primary', @click='register') 确 定
  
  el-drawer(title='已开通通道',size="50%" ,:visible.sync='drawerVisible', direction='rtl', :before-close='drawerClose')
    .wjp-tools.layout-row__between
      div
        el-button(type='primary' @click="cedit") 添加通道
      .layout-row.buttons.align-center
        el-input(v-model='minRate',@keyup.enter.native="getAllchannel" placeholder='最小利率' style="width:100px;")
        div - 
        el-input(v-model='maxRate',@keyup.enter.native="getAllchannel" placeholder='最大利率' style="width:100px;")
        el-button(type='primary' @click="getAllchannel" :disabled="loading") 搜 索
    el-table.wjp-table(v-loading="loading" , :data='drawerData', style='width: 100%', height='550')
      el-table-column(prop='proxyAccount', label='代理名称')
      el-table-column(label='通道名称')
        template(slot-scope='scope')
          p {{ dicFilter(scope.row.payWayDictId) }}
      //- el-table-column(prop='state', label='状态')
      el-table-column(prop='createTime', label='创建时间')
      el-table-column(label='通道利率')
        template(slot-scope='scope')
          el-input(v-if="scope.row.show" v-model='scope.row.channelRate',@blur="changeRate(scope.row)" placeholder='利率' style="width:100px;")
          span(v-else @click.stop="$set(scope.row,'show',true)") {{ scope.row.channelRate }}
      el-table-column(label='操作')
        template(slot-scope='scope')
            el-button(size="mini" type='danger' @click="delChannel(scope.row)") 删除
    .page.layout-row.align-center.right
      span 每页显示
      el-pagination.statistics(
      background
      prev-text="上一页"
      next-text="下一页"
      @size-change="dsizeChange"
      @current-change="getAllchannel"
      :current-page.sync="dcurrentPage"
      :page-size="dpageSize"
      layout=" prev, pager, next,total"
      :total="dtotalPage")

  //- 添加通道
  add-channel(@finish="getAllchannel" :id="chooseProxy.id" :visible.sync="channelVisible")
  

    
</template>

<script>
import addChannel from "@/views/members/agent/addChannel";
import { cloneDeep } from "lodash";
import { mapGetters, mapState } from "vuex";
import { validPassword, validPhone } from "@/utils/validate";
import { changeRate, delChannel, getAllchannel } from "@/api/agent";
import { register, delUser, getUsers } from "@/api/user";
import { debuglog } from "util";
export default {
  components: {
    addChannel
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (validPassword(this.form.userPassword)) {
          callback();
        } else {
          callback(new Error("密码包含 数字,英文,字符中的两种以上，长度6-20"));
        }
      }
    };
    const validPhones = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (validPhone(this.form.phone)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      loading: false,
      agentVisible: false,
      form: {
        account: "",
        userPassword: "",
        phone: ""
      },
      rules: {
        account: [{ required: true, message: "请填写账号", trigger: "blur" }],
        userPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validPhones, trigger: "blur" }]
      },
      drawerVisible: false,
      channelVisible: false,
      minRate: "",
      maxRate: "",
      chooseProxy: {},
      tableData: [],
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10, //当前页显示数量
      drawerData: [], //通道table
      dtotalPage: 0, //总条数
      dcurrentPage: 1, //当前页
      dpageSize: 10 //当前页显示数量
    };
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
  mounted() {
    this.getTableData();
  },
  methods: {
    drawerClose() {
      this.drawerVisible = false;
    },
    //修改利率
    changeRate(data) {
      this.$set(data, "show", false);
      if (data.oldchannelRate === data.channelRate) {
        return;
      }
      this.loading = true;
      changeRate({
        id: data.id,
        rate: data.channelRate
      })
        .then(res => {
          this.$message.success("修改利率成功！");
        })
        .catch(err => {
          this.$message.error("修改利率失败！");
        })
        .finally(_ => {
          this.loading = false;
          this.getAllchannel();
        });
    },
    getTableData() {
      this.loading = true;
      getUsers({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {
          roleId: 3
        }
      })
        .then(res => {
          if (res.success) {
            const { totalRecords, pageNo, pageSize, content } = res.data;
            this.totalPage = totalRecords;
            this.pageSize = pageSize;
            this.currentPage = pageNo;
            this.tableData = content;
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
    edit(data) {
      this.chooseProxy = data;
      this.drawerVisible = true;
      this.getAllchannel();
    },
    cedit() {
      this.channelVisible = true;
    },
    getAllchannel() {
      getAllchannel({
        pageNo: this.dcurrentPage,
        pageSize: this.dpageSize,
        param: {
          proxyAccount: this.chooseProxy.account,
          minRate: this.minRate,
          maxRate: this.maxRate
        }
      }).then(res => {
        const { totalRecords, pageNo, pageSize, content } = res.data;
        this.dtotalPage = totalRecords;
        this.dpageSize = pageSize;
        this.dcurrentPage = pageNo;
        content.map(item => {
          item.show = false;
          item.oldchannelRate = item.channelRate;
        });
        this.drawerData = content;
      });
    },
    addAgent() {
      this.agentVisible = true;
      this.$refs.form.resetFields();
    },
    //添加代理
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          register({
            parentAccount: this.userinfo.id,
            roleIds: [3],
            ...this.form
          })
            .then(res => {
              this.$message.success("添加代理成功");
            })
            .catch(err => {
              this.$message.error("添加代理失败！");
            })
            .finally(_ => {
              this.getTableData();
              this.agentVisible = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除代理
    delUser(data) {
      this.$confirm(`确定删除代理 ${data.account}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser(data.id)
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
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除通道
    delChannel(data) {
      const name = this.dicFilter(data.payWayDictId);
      this.$confirm(`确定删除通道 ${name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delChannel(data.id)
            .then(res => {
              this.$message.success("删除成功！");
            })
            .catch(err => {
              this.$message.error("删除失败！");
            })
            .finally(_ => {
              this.getAllchannel();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    dicFilter(id) {
      return this.payWay.find(n => n.id == id).dictValueDisplayName;
    },
    sizeChange(num) {
      this.pageSize = num;
      this.getTableData();
    },
    dsizeChange(num) {
      this.dpageSize = num;
      this.getAllchannel();
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
