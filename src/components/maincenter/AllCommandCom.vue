<template>
  <div style="margin-top:10px;">
      <div style="display:flex;flex-direction:column;align-items:flex-start;margin-left:10px;">
          <p>ID:{{id}}</p>
          <p>Address:</p>
      </div>
      <template>
        <!-- <el-button
          size="mini"
          type="danger"
          round
          @click="handleEdit()"
          >Shutdown</el-button
        > -->
        <!-- <el-button
          size="mini"
          type="primary"
          @click="handleDelete()"
          round
          >All Downloads</el-button
        > -->
        <!-- <el-button
          size="mini"
          type="warning"
          @click="handleEdit()"
          round
          >All logs</el-button
        >
        <el-button
          size="mini"
          @click="handleEdit()"
          type="info"
          round
          >Server Log</el-button
        >
        <el-button
          size="mini"
          @click="handleEdit()"
          round
          >Access Log</el-button
        > -->
      </template>
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
        id:''
    };
  },
  mounted(){
      this.id = this.$route.query.id.join(',')
      console.log(this.$route.params)
  }
};
</script>