<style lang="less">
.all-command-main {
  margin-top: 10px;
  .infor {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
}
</style>
<template>
  <div class="all-command-main">
    <div class="infor">
      <p>ID:{{id}}</p>
      <p>Address:{{ip}}</p>
    </div>
    <template>
    </template>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      ip: '',
    }
  },
  mounted() {
    this.id = this.$route.query.id.join(',')
    this.ip = this.$route.query.ip.join(',')
    console.log(this.$route.params)
  },
}
</script>