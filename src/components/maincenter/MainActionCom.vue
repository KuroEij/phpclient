<template>
  <div style="height:100%">
    <el-table
      :data="tableData"
      height="100%"
      border
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      >>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="id" width="150"> </el-table-column>
      <el-table-column prop="hostname" label="hostname"> </el-table-column>
      <el-table-column prop="remoteip" label="remoteip"> </el-table-column>
      <el-table-column prop="sessionid" label="sessionid"> </el-table-column>
      <el-table-column prop="Time" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="singleToShell(scope.$index, scope.row)"
            round
            >命令執行</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="singleToFile(scope.$index, scope.row)"
            round
            >文件管理</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="openInputIp(scope.$index,scope.row)"
            round
            >自动升级</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="position: fixed; bottom: 70px;left:calc(50% - 144px)">
      <el-button
        v-show="isAllShellButtonShow"
        size="large"
        type="warning"
        @click="goAllAction"
        round
        >勾选客户端执行命令</el-button
      >
      <el-button
        v-show="isAllShellButtonShow"
        size="large"
        type="danger"
        @click="deleteClients"
        round
        >勾选删除</el-button
      >
    </div>
    <el-dialog title="自动升级" :visible.sync="dialogVisible" width="30%" center>
      <el-input
        placeholder="请填写服务器地址"
        v-model="ipValue"
      ></el-input>
      <span class="ed-input_span">请确保服务器在2121端口开启了ftp服务</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="upDateByIP">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "clientlist",
  data() {
    return {
      loading: false,
      ipValue: "",
      tableData: [],
      isAllShellButtonShow: false,
      multipleSelection: "",
      dialogVisible: false,
      currentSelected: {},
    };
  },
  watch: {
    multipleSelection(val) {
      if (val && val.length) {
        this.isAllShellButtonShow = true;
      } else {
        this.isAllShellButtonShow = false;
      }
    },
  },
  methods: {
    handleEdit() {},
    //跳转单机控制台
    singleToShell(index, row) {
      console.log(index);
      this.$router.push({
        path: "/home/allcommand/logs",
        query: { id: [row.id], ip: [row.remoteip] },
      });
    },
    //跳转文件管理
    singleToFile(index, row) {
      console.log(index);
      this.$router.push({
        path: "/home/file",
        query: { id: row.id, ip: row.remoteip },
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    //跳转多客户端控制台
    goAllAction() {
      let id = [],
        ip = [];
      this.multipleSelection.forEach((item) => {
        id.push(item.id);
        ip.push(item.remoteip);
      });
      this.$router.push({ path: "/home/allcommand/logs", query: { id, ip } });
    },
    openInputIp(index,row) {
      this.currentSelected = row;
      this.dialogVisible = true;
    },
    //升级
    upDateByIP() {
      if (!this.ipValue) {
        this.$message({
          message: "请输入IP！",
          type: "error",
        });
        return;
      }
      this.loading = true;
      let timeout = setTimeout(()=>{
        if(this.loading == false) return
          this.loading = false;
          this.dialogVisible = false;
          this.ipValue = "";
          this.$message({
            message: "升级成功,如果客户端列表未更新请刷新浏览器！",
            type: "success",
          });
          this.getClientsList()
      },10000)
      this.$axios
        .get(`${this.urls}client?id=${this.currentSelected.id}&serip=${this.ipValue}`)
        .then((res) => {
          console.log(res);
          if(this.loading == false) return
          clearTimeout(timeout)
          this.$message({
            message: "升级成功,如果客户端列表未更新请刷新浏览器！",
            type: "success",
          });
          this.loading = false;
          this.ipValue = "";
          this.getClientsList()
          this.dialogVisible = false;
        })
        .catch(() => {
          this.$message({
            message: "升级失败！",
            type: "success",
          });
          this.loading = false;
        });
    },
    //删除多个客户端
    deleteClients() {
      let id = [],
        ids;
      this.multipleSelection.forEach((item) => {
        id.push(item.id);
      });
      ids = id.join(",");

      this.loading = true;
      this.$axios
        .get(`${this.urls}delete_clients?ids=${ids}`)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.getClientsList();
          this.loading = false;
        })
        .catch(() => {
          this.$message({
            message: "删除失败！",
            type: "success",
          });
          this.loading = false;
        });
    },
    goherts() {
      this.$router.push({ path: "/home/fileslogs" });
    },
    //获取客户端列表
    getClientsList() {
      this.$axios
        .get(`${this.urls}list_clients`)
        .then((res) => {
          this.tableData = res.data;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
  },
  mounted() {
    this.getClientsList()
  },
};
</script>
<style lang="less">
.ed-input_span{
  display: block;
  font-size: 12px;
  margin-top:5px;
  color: red;
}
</style>