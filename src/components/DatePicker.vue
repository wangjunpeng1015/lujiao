<template lang="pug">
.date-picker.layout-row
  .dates
    el-button(:type="btnIndex === i+1?'primary':'text'"  v-for="(item,i) in recently" :key="i" @click="changeDate(item.day,i+1)") {{ item.name }}
  el-date-picker(
    v-if="timeShow"
      :clearable="false"
      unlink-panels
      v-model="date"
      @change="pickerChange"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期")
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    date: {
      default() {
        return [dayjs().subtract(1, "day"), dayjs()];
      },
      type: Array
    },
    timeShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      btnIndex: 0,
      recently: [
        {
          name: "今天",
          day: 0
        },
        {
          name: "近三天",
          day: 3
        },
        {
          name: "近一周",
          day: 7
        },
        {
          name: "一个月",
          day: 30
        }
      ]
    };
  },
  watch: {
    date: {
      handler(val) {
        const diff = dayjs(val[1]).diff(val[0], "day");
        this.btnIndex = this.recently.findIndex(item => item.day === diff) + 1;
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    pickerChange(date) {
      this.$emit("update:date", date);
      this.$emit("change", date);
    },
    changeDate(day, i) {
      const date = [
        dayjs()
          .subtract(day, "day")
          .format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      ];
      this.$emit("update:date", date);
      this.$emit("change", date);
    }
  }
};
</script>

<style scoped lang="scss">
/deep/.dates {
  .el-button--text {
    color: #333;
  }
  button {
    margin-left: 0;
    padding: 0;
    width: 65px;
    height: 37px;
    &:last-child {
      margin-right: 20px;
    }
  }
}
</style>
