<template>
  <div style="height:100%">
    <el-table :data="tableData"
              height="100%"
              border
              style="width: 100%"
              v-loading="loading"
              @selection-change="handleSelectionChange">>
      <el-table-column type="selection"
                       width="55"> </el-table-column>
      <el-table-column prop="id"
                       label="id" width="150"> </el-table-column>
      <el-table-column prop="hostname"
                       label="hostname">
      </el-table-column>
      <el-table-column prop="remoteip"
                       label="remoteip">
      </el-table-column>
      <el-table-column prop="sessionid"
                       label="sessionid">
      </el-table-column>
      <el-table-column prop="Time"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="singleToShell(scope.$index, scope.row)"
                     round>命令執行</el-button>
          <el-button size="mini"
                     type="warning"
                     @click="singleToFile(scope.$index, scope.row)"
                     round>文件管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="position: fixed; bottom: 70px;left:calc(50% - 144px)">
      <el-button 
                v-show="isAllShellButtonShow"
                size="large"
                type="warning"
                @click="goAllAction"
                round>勾选客户端执行命令</el-button>
      <el-button 
                v-show="isAllShellButtonShow"
                size="large"
                type="danger"
                @click="deleteClients"
                round>勾选删除</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name:"clientlist",
  data() {
    return {
      loading:true,
      tableData: [
      ],
      isAllShellButtonShow: false,
      multipleSelection: '',
    }
  },
  watch: {
    multipleSelection(val) {
      if (val && val.length) {
        this.isAllShellButtonShow = true
      } else {
        this.isAllShellButtonShow = false
      }
    },
  },
  methods: {
    handleEdit() {},
    //跳转单机控制台
    singleToShell(index, row) {
      console.log(index)
      this.$router.push({ path: '/home/allcommand/logs', query: { id: [row.id],ip:[row.remoteip] } })
    },
    //跳转文件管理
    singleToFile(index, row) {
      console.log(index)
      this.$router.push({ path: '/home/file', query: { id: row.id,ip:row.remoteip } })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    //跳转多客户端控制台
    goAllAction() {
      let id = [],
          ip = [];
      this.multipleSelection.forEach((item) => {
        id.push(item.id)
        ip.push(item.remoteip)
      })
      this.$router.push({ path: '/home/allcommand/logs', query: { id,ip } })
    },
    //删除多个客户端
    deleteClients(){
      let id = [],ids;
      this.multipleSelection.forEach((item) => {
        id.push(item.id)
      })
      ids = id.join(',')

      this.loading = true
      this.$axios.get(`${this.urls}delete_clients?ids=${ids}`).then((res)=>{
          console.log(res)
            this.$message({
              message: '删除成功！',
              type: 'success',
            })
        this.getClientsList()
        this.loading = false
      }).catch(()=>{
            this.$message({
              message: '删除失败！',
              type: 'success',
            })
            this.loading = false
      })
    },
    goherts(){
      this.$router.push({ path: '/home/fileslogs'})
    },
    //获取客户端列表
    getClientsList(){
    this.$axios.get(`${this.urls}list_clients`).then((res) => {
      this.tableData = res.data
      this.loading = false
    }).catch(()=>this.loading = false)
    }
  },
  mounted() {
    this.getClientsList()
  },
}
</script>