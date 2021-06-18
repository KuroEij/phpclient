<template>
  <div style="margin-top:20px;">
    <input type="file" :multiple="true" @change="getFile($event)"/>
    <el-button size="mini"
               type="warning"
               @click="upload"
               round>upload
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'file',
  data() {
    return {
      id: '',
      file:{},
      fileName:""
    }
  },
  methods: {
    getFileList() {
      this.$axios.get(`${this.urls}client?ls_dir=/etc&id=${this.id}`).then((res) => {
        console.log(res)
        this.tableData.push({})
      })
    },
    getFile(event){
        console.log(event)
        this.file = event.target.files[0]
        this.fileName = this.file.name
        this.upload()
    },
    upload(){
      this.$axios.get(`${this.urls}client?up_filename=${this.fileName}&id=${this.id}`).then((res) => {
        console.log(res)
        this.tableData.push({})
      })
    }
  },
  mounted() {
    this.id = this.$route.query.id.join(',')
    console.log(this.$route.params)
  },
}
</script>