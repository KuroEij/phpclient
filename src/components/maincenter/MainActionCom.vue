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
    <el-button style="position: fixed; bottom: 40px"
               v-show="isAllShellButtonShow"
               size="large"
               type="warning"
               @click="goAllAction"
               round>勾选客户端执行命令</el-button>
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
      this.$router.push({ path: '/allcommand/logs', query: { id: [row.id],ip:[row.remoteip] } })
    },
    //跳转文件管理
    singleToFile(index, row) {
      console.log(index)
      this.$router.push({ path: '/file', query: { id: row.id,ip:row.remoteip } })
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
      this.$router.push({ path: '/allcommand/logs', query: { id,ip } })
    },
    goherts(){
      this.$router.push({ path: '/fileslogs'})
    }
  },
  mounted() {
    this.$axios.get(`${this.urls}list_clients`).then((res) => {
      this.tableData = res.data
      this.loading = false
    }).catch(()=>this.loading = false)
  },
}
</script>