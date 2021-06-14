<template>
  <div id="app">
    <el-container style="height:100vh">
      <el-header style="height:40px;"></el-header>
    <!-- <el-container><MainCom></MainCom></el-container> -->
      <el-container>
        <el-aside width="200px"><AsideComLeft></AsideComLeft></el-aside>
        <el-main style="padding:0px;">
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </div>
</template>

<script>
import AsideComLeft from './components/AsideComLeft.vue';
// import HeartbeatLogs from './components/maincenter/HeartbeatLogs.vue'
// import MainCom from './components/maincenter/MainActionCom.vue';
export default {
  name: "App",
  components: {
    AsideComLeft
    // HeartbeatLogs
  },
};
</script>

 <style lang="less">
 body{
   margin: 0;
 }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-header,
.el-footer {
  background-color:@topicolor;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: #e9eef3;
  color: #333;
  padding:0px;
}
</style>
