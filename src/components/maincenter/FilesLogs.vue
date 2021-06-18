<template>
  <el-table :data="tableData" height="100%" border style="width: 100%">
    <el-table-column prop="IP" label="IP"> </el-table-column>
    <el-table-column prop="Status" label="Status" width="180"> </el-table-column>
    <el-table-column prop="Time" label="Time"  width="180"> </el-table-column>
  </el-table>
</template>
<script>
import {getDateByTime} from '../../assets/js/utils'
export default {
  data() {
    return {
      nowInterval:0,
      tableData: [
        {
          IP: "http://192.168.43.146:8080/",
          Status: "active",
          Time: "2016-05-03",
        },
      ],
    };
  },
  methods:{
    checkIpIsActive(){
      
    }
  },
  mounted(){
      // this.id = this.$route.params.id.join(',')
      // console.log(this.$route.params)
      this.$axios.get(`${this.urls}heartlogs`).then(res=>{
        this.tableData = []
        for(let key in res.data){
          this.tableData.push({IP:key,Time:getDateByTime(res.data[key])})
        }
      
      // if(this.nowInterval)
      //   clearInterval(this.nowInterval)
      // else{
      //   setInterval(this.checkIpIsActive,1000)
      // }
    })
  },
  beforeRouteLeave () {
      if(this.nowInterval)
        clearInterval(this.nowInterval)
  }
};
</script>