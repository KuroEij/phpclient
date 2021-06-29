<template>
  <el-menu
    :default-active="this.$route.path" 
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    router
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/clientlist" >
      <i class="el-icon-setting"></i>
      <span slot="title">Client List</span>
    </el-menu-item>
    <el-menu-item index="/fileslogs">
      <i class="el-icon-setting"></i>
      <span slot="title">Heartbeat Logs</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "asideCom",
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>