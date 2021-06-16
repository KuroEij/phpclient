<template>
  <el-table :data="tableData" height="100%" border style="width: 100%">
    <el-table-column prop="IP" label="IP"> </el-table-column>
    <el-table-column prop="Status" label="Status" width="180"> </el-table-column>
    <el-table-column prop="Time" label="Time"  width="180"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          IP: "http://192.168.43.146:8080/",
          Status: "active",
          Time: "2016-05-03",
        },
      ],
    };
  },
  mounted(){
      // this.id = this.$route.params.id.join(',')
      // console.log(this.$route.params)
      this.$axios(`${this.urls}heartlogs`).then(res=>{
      console.log(res)
      this.tableData.push({})
    })
  }
};
</script>