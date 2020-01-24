<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row
      el-button(type='primary' @click="addDic") 添加字典
      el-button(type='primary' @click="getTableData") 刷 新
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:data='dicTable', style='width: 100%')
          el-table-column(label='字典key', )
            template(slot-scope='scope')
              el-input(v-model='scope.row.dictKey' :disabled="!scope.row.disabled")
          el-table-column(label='字典key名称', )
            template(slot-scope='scope')
              el-input(v-model='scope.row.dictKeyDisplayName' :disabled="!scope.row.disabled")
          el-table-column(label='字典value', )
            template(slot-scope='scope')
              el-input(v-model='scope.row.dictValue' :disabled="!scope.row.disabled")
          el-table-column( label='字典value描述', )
            template(slot-scope='scope')
              el-input(v-model='scope.row.dictValueDisplayName' :disabled="!scope.row.disabled")
          el-table-column( label='扩展值1', )
            template(slot-scope='scope')
              el-input(v-model='scope.row.optional_1' :disabled="!scope.row.disabled")
          el-table-column( label='扩展值2(支付时支付类型)', )
            template(slot-scope='scope')
              el-input(v-model='scope.row.optional_2' :disabled="!scope.row.disabled")
          el-table-column( label='扩展值3(配置通道时是否为--不变的二维码)', )
            template(slot-scope='scope')
              el-input(v-model='scope.row.optional_3' :disabled="!scope.row.disabled")
          el-table-column(label='操作',)
            template(slot-scope='scope')
              .layout-row(v-show="!scope.row.disabled")
                el-button(type='primary' size="mini" @click="edit(scope.row)") 编 辑
                el-button(type='danger' size="mini" @click="del(scope.row.id)") 删 除
              div(v-show="scope.row.disabled")
                el-button(type='primary' size="mini" @click="save(scope.row)") 保 存

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

</template>

<script>
import { getDicList, updateDic, delDic } from "@/api/dic";
import { mapState } from "vuex";
import { cloneDeep, isEqual } from "lodash";
export default {
  components: {},
  data() {
    return {
      dicTable: [],
      loading: false,
      account: "", //
      totalPage: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10, //当前页显示数量
      chooseDic: [] //选择字典数据
    };
  },
  watch: {},
  computed: {
    ...mapState(["settings"])
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    addDic() {
      if (this.dicTable[0].id) {
        this.dicTable.unshift({
          dictKey: "",
          dictKeyDisplayName: "",
          dictValue: "",
          dictValueDisplayName: "",
          optional_1: "",
          optional_2: "",
          optional_3: "",
          disabled: true
        });
      } else {
        this.$message.warning("请先填写上一个字典！");
      }
    },
    //保存字典
    save(data) {
      let temp = cloneDeep(data);
      delete temp.disabled;
      if (isEqual(temp, this.chooseDic)) {
        this.$set(data, "disabled", false);
        return;
      } else {
        updateDic(temp)
          .then(res => {
            this.$message.success(`${temp.id ? "修改" : "添加"}字典成功！`);
          })
          .catch(err => {
            this.$message.error("修改字典失败！");
          })
          .finally(_ => {
            this.getTableData();
          });
      }
    },
    //编辑字典
    edit(data) {
      this.chooseDic = cloneDeep(data);
      this.$set(data, "disabled", true);
    },
    del(id) {
      this.$confirm("是否确认删除该字典?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delDic(id)
          .then(res => {
            this.$message.success("删除成功！");
          })
          .finally(_ => {
            this.getTableData();
          });
      });
    },
    //获取字典
    getTableData() {
      this.loading = true;
      getDicList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        param: {}
      })
        .then(res => {
          const { totalRecords, pageNo, pageSize, content } = res.data;
          this.totalPage = totalRecords;
          this.pageSize = pageSize;
          this.currentPage = pageNo;
          this.dicTable = content;
          this.loading = false;
        })
        .catch(err => {
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
.buttons {
  margin-top: 20px;
}
</style>
