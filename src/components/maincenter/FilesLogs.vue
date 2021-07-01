<template>
  <el-table v-loading="loading" :data="tableData" height="100%" border style="width: 100%">
    <el-table-column prop="IP" label="IP"> </el-table-column>
    <el-table-column prop="Status" label="Status" > </el-table-column>
    <el-table-column prop="Time" label="Time"> </el-table-column>
  </el-table>
</template>
<script>
import {getDateByTime} from '../../assets/js/utils'
export default {
  name:"fileslogs",
  data() {
    return {
      nowTime:0,
      tableData: [
      ],
      loading:true
    };
  },
  methods:{
  },
  mounted(){
      this.$axios.get(`${this.urls}heartlogs`).then(res=>{
        this.tableData = []
        let time = new Date().getTime
        if(res.data == "No alive agents.")
          return
        for(let key in res.data){
          let Time  = getDateByTime(res.data[key]*1000);
          let Status = res.data[key]*1000 < (time + 60000 )?'丢失':"存活"
          this.tableData.push({IP:key,Time,Status})
        }
        this.loading = false
    }).catch(()=>this.loading = false)
  },
};
</script>