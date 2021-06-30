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
  .file-item {
    text-align: left;
    margin-left: 20px;
    margin-top: 10px;
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
       <form action="" id="form">
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
      <div class="file-item"
           v-for="(item,index) in filelist"
           :key="index"
           @click="clickFile(item,index)"><i v-show="index>3&&item.substr(0,1) == 'd'"
           class="el-icon-message"></i>
        <i v-show="index>3&&item&&item.substr(0,1) != 'd'"
           class="el-icon-tickets"></i>{{item}}
      </div>
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
      filelist: '',
      fileName: 'tmp', //文件mulu
      uploadFileName: '',
      fixFileUrl: '', //记录当前文件目录
      loading: true,
    }
  },
  methods: {
    //获取文件列表
    getFileList() {
      this.filelist = []
      this.fixFileUrl = this.fileName
      this.loading = true
      this.$axios
        .get(`${this.urls}client?ls_dir=/${this.fileName}&id=${this.id}`)
        .then((res) => {
          this.loading = false
          this.filelist = res.data.data.split('\n')
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
      if(!this.file){
        this.$message({
          message: '请选中要上传的文件！',
          type: 'warning',
        })
        return        
      }
      var formData = new FormData();
      // 上传的文件
      formData.append('file', this.file);
      var xhr = new XMLHttpRequest();
      xhr.open("post", `${this.urls}client?up_filename=${this.uploadFileName}&id=${this.id}`);

      xhr.send(formData);
      xhr.onload = () =>{
        if(xhr.status == 200) {
          if(xhr.responseText == "success"){
            this.$refs.uploadinput.value = ''
            this.file = ''
            this.uploadFileName = ''
            this.$message({
              message: '上传成功！',
              type: 'success',
            })
            this.getFileList()
          }else{
            this.$message.error('上传失败！，请重试。')
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
          `${this.urls}client?down_path=/${this.fixFileUrl}/${fileName}&id=${this.id}`
        )
        .then((res) => {
          console.log(res)
          this.$saveAs(new Blob([res.data]), fileName+'.bin')
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