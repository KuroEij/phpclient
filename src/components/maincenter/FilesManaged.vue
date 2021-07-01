<style lang="less">
.fileMana-main {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
}
.fileMana-dir {
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  height: 40px;
  align-items: center;
  input {
    border: 1px solid #ccc;
    margin-left: 10px;
    margin-right: 10px;
    height: 30px;
  }
}
.file-main {
  flex: 1;
  overflow: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  .file-item {
    font-size: 16px;
    text-align: left;
    margin-top: 8px;
    i {
      margin-right: 10px;
    }
  }
}
.file-main::-webkit-scrollbar {
  width: 8px;
}
.file-main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px @topicolor;
  background: @topicolor;
}
</style>
<template>
  <div v-loading="loading"
       class="fileMana-main">
    <div>
      <input type="file"
             ref="uploadinput"
             :multiple="true"
             @change="getFile($event)" />
      <el-button size="mini"
                 type="warning"
                 @click="upload"
                 round>upload
      </el-button>
    </div>
    <div class="fileMana-dir">
      <p>当前目录:</p>
      <form action=""
            id="form">
        <input @keydown.enter="exictCommand"
               v-model="fileName" />
      </form>
      <el-button size="mini"
                 type="warning"
                 @click="exictCommand"
                 round>
        检索
      </el-button>
    </div>
    <div class="file-main">
      <div v-show="filelist.length>3">
        <el-checkbox
                    style="margin-right:20px;"
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange">全选</el-checkbox>
        <el-button v-show="checkList.length>0" size="mini" type="danger" @click="deleteFiles">删除</el-button>
      </div>
      <el-checkbox-group  v-model="checkList">
        <div class="file-item"
             v-for="(item,index) in filelist"
             :key="index">
          <el-checkbox v-show="index>3"
                       :label="item"> <i v-show="index>3&&item.substr(0,1) == 'd'"
               class="el-icon-message">
            </i>
            <i v-show="index>3&&item&&item.substr(0,1) != 'd'"
               class="el-icon-tickets"></i>
          </el-checkbox>
          <span @click="clickFile(item,index)">{{item}}</span>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
// import qs from 'qs'
export default {
  name: 'file',
  data() {
    return {
      id: '',
      ip: '',
      file: {},
      filelist: [],
      fileName: '/', //文件mulu
      uploadFileName: '',
      fixFileUrl: '', //记录当前文件目录
      loading: true,
      checkList: [],
      checkAll: false,
      isIndeterminate: false,
    }
  },
  computed: {},
  methods: {
    deleteFiles(){
      this.loading = true
      let delteFiles = []
      this.checkList.forEach(item=>{
        let fileArray = item.split(' ')
        if (!fileArray.length) return
        let fileName = fileArray[fileArray.length - 1]
        if (!fileName) return
        fileName = this.fixFileUrl +'/'+fileName
        delteFiles.push(fileName)
      })
      let paramFiles = delteFiles.join(',')
      this.$axios.get(`${this.urls}delete_files?files=${paramFiles}&id=${this.id}`).then(res=>{
        console.log(res)
        if(res.data =="success"){
          this.loading = false
              this.$message({
                message: '删除成功！',
                type: 'success',
              })
          this.checkList = []
          this.getFileList()
        }
      }).catch(err=>{
        console.log(err)
        this.loading = false
        this.$message.error('删除失败!请重试。')
      })
    },
    handleCheckAllChange(val) {
      this.checkList = val ? this.filelist : []
      this.isIndeterminate = false
    },
    //获取文件列表
    getFileList() {
      this.filelist = []
      this.fixFileUrl = this.fileName
      this.loading = true
      this.$axios
        .get(`${this.urls}client?ls_dir=${this.fileName}&id=${this.id}`)
        .then((res) => {
          this.loading = false
          console.log(res.data.data)
          let arry = res.data.data.split(/[(\r\n)\r\n]+/)
          arry.forEach((item, index) => {
            if (!item) {
              arry.splice(index, 1) //删除空项
            }
          })
          this.filelist = arry
        })
        .catch(() => (this.loading = false))
    },
    //input获取文件数据
    getFile(event) {
      console.log(event)
      this.file = event.target.files[0]
      this.uploadFileName = this.file.name
    },
    upload() {
      if (!this.fileName) {
        this.$message({
          message: '请输入上传目标目录！',
          type: 'warning',
        })
        return
      }
      if (!this.file) {
        this.$message({
          message: '请选中要上传的文件！',
          type: 'warning',
        })
        return
      }
      var formData = new FormData()
      // 上传的文件
      formData.append('file', this.file)
      var xhr = new XMLHttpRequest()
      xhr.open(
        'post',
        `${this.urls}client?up_filename=${this.uploadFileName}&id=${this.id}`
      )

      xhr.send(formData)
      xhr.onload = () => {
        if (xhr.status == 200) {
          if (xhr.responseText == 'success') {
            this.$refs.uploadinput.value = ''
            this.file = ''
            this.uploadFileName = ''
            this.$message({
              message: '上传成功！',
              type: 'success',
            })
            // this.getFileList()
          } else {
            this.$message.error('上传失败！请重试。')
          }
        }
      }
    },
    exictCommand() {
      this.fixFileUrl = ''
      this.getFileList()
    },
    clickFile(file, index) {
      if (index > 3 && file.substr(0, 1) == 'd') {
        let fileArray = file.split(' ')
        if (!fileArray.length) return
        let fileName = fileArray[fileArray.length - 1]
        if (!fileName) return
        this.fileName = `${this.fileName}/${fileName}`
        this.getFileList()
      } else if (index > 3 && file && file.substr(0, 1) != 'd') {
        this.downLoadFile(file)
      }
    },
    downLoadFile(file) {
      let fileArray = file.split(' ')
      if (!fileArray.length) return
      let fileName = fileArray[fileArray.length - 1]
      if (!fileName) return
      this.loading = true
      this.$axios
        .get(
          `${this.urls}client?down_path=${this.fixFileUrl}/${fileName}&id=${this.id}`
        )
        .then((res) => {
          console.log(res)
          this.$saveAs(new Blob([res.data]), fileName + '.bin')
          this.loading = false
        })
        .catch(() => (this.loading = false))
    },
  },
  mounted() {
    this.id = this.$route.query.id
    this.ip = this.$route.query.ip
    this.getFileList()
    console.log(this.$route.params)
  },
}
</script>