<template lang="pug">
.orders-container.layout-column
  .wjp-tools.layout-row
      el-input(v-model='account',@keyup.enter="getTableData" placeholder='' style="width:200px;")
      el-button(type='primary' @click="getTableData" :disabled="loading") 搜 索
  .wjp-content.flex.layout-column
      el-table.wjp-table(v-loading="loading" ,:height="450", :data='dicMap', style='width: 100%', height='250')
          el-table-column(prop='key', label='字典key', )
          el-table-column(prop='count', label='字典总数', )
          el-table-column(prop='displayName', label='字典名称', )
          el-table-column(label='操作',)
            template(slot-scope='scope')
              el-button(type='primary' size="mini" @click="edit(scope.row)") 编辑字典数据
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
  el-drawer(size="50%" title='编辑字典', :visible.sync='drawerVisible',:wrapperClosable="false", direction='rtl', :before-close='drawerClose')
    el-table.wjp-table(:height="700", :data='chooseDic', style='width: 100%')
      el-table-column(label='字典key', )
        template(slot-scope='scope')
          el-input(v-model='scope.row.dictKey', placeholder='字典key')
      el-table-column(label='字典key名称', )
        template(slot-scope='scope')
            el-input(v-model='scope.row.dictKeyDisplayName', placeholder='字典key名称')
      el-table-column(label='字典value', )
        template(slot-scope='scope')
            el-input(v-model='scope.row.dictValue', placeholder='字典value')
      el-table-column(label='字典value名称', )
        template(slot-scope='scope')
            el-input(v-model='scope.row.dictValueDisplayName', placeholder='字典value名称')
      el-table-column( label='扩展1', )
        template(slot-scope='scope')
            el-input(v-model='scope.row.optional_1', placeholder='扩展1')
      el-table-column(label='扩展2', )
        template(slot-scope='scope')
            el-input(v-model='scope.row.optional_2', placeholder='扩展2')
      el-table-column(label='扩展3', )
        template(slot-scope='scope')
            el-input(v-model='scope.row.optional_3', placeholder='扩展3')
    .buttons.right
      el-button(type='primary' @click="save") 保存字典
      el-button(@click="drawerVisible=false") 取消

</template>

<script>
import { mapState } from "vuex";
import { cloneDeep } from "lodash";
export default {
  components: {},
  data() {
    return {
      drawerVisible: false,
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
    ...mapState(["settings"]),
    dicMap() {
      if (this.settings.dict) {
        let array = [];
        const tempData = this.settings.dict;
        for (const key in tempData) {
          if (tempData.hasOwnProperty(key)) {
            const item = tempData[key];
            array.push({
              key,
              count: item.count,
              displayName: item.displayName,
              dicts: item.dicts
            });
          }
        }
        return array;
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //保存字典
    save() {
      qqq(this.chooseDic)
        .then(res => {
          this.$message.success("修改字典成功！");
        })
        .catch(err => {
          this.$message.error("修改字典失败！");
        })
        .finally(_ => {
          this.drawerVisible = false;
          this.getTableData();
        });
    },
    //编辑字典
    edit(data) {
      this.drawerVisible = true;
      this.chooseDic = cloneDeep(data.dicts);
    },
    drawerClose() {},
    //获取字典
    getTableData() {
      this.loading = true;
      this.$store
        .dispatch("settings/getdic")
        .then(res => {
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
