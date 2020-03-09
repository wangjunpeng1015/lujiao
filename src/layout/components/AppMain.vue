<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.app-main {
  /* margin: 10px 20px 0; */
  /*50 = navbar  */
  height: calc(100vh - 50px);
  position: relative;
  overflow: auto;
}
.app-main > div {
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
  /* height: calc(100vh - 90px); */
  box-shadow: 0px 0px 18px -10px #666;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
