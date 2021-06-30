<style lang="less">
.command-main {
  width: 100%;
  .content-bd {
    overflow: auto;
    white-space:pre-wrap;
    height: 50vh;
    margin-top: 20px;
    background: black;
    color: white;
    text-align: left;
    padding: 10px;
  }
  .content-bd::-webkit-scrollbar {
    width: 8px;
  }
  .content-bd::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #ccc;
    background: #ccc;
  }
  input {
    border: 1px slode #ccc;
    width: 80%;
    margin-top: 10px;
    height: 40px;
    padding: 0 10px;
  }
}
</style>
<template>
  <div class="command-main">
    <div class="content-bd"
         disabled>{{content}}</div>
         <div>    <input placeholder="输入命令行"
           v-model="pacl"
           @keydown.enter="exictCommand" />
           <el-button style="margin-left:10px;" @click="exictCommand" size="mini"
                 type="warning">执行</el-button></div>

  </div>
</template>
<script>
export default {
  name: 'commandlog',
  data() {
    return {
      content: 'none',
      id: '',
      ipL: '',
      pacl: '',
    }
  },
  mounted() {
    this.id = this.$route.query.id.join(',')
    this.ip = this.$route.query.ip.join(',')
    console.log(this.$route.params)
  },
  methods: {
    exictCommand() {
      this.$axios
        .get(`${this.urls}client?cmd=${this.pacl}&${this.$route.query.id.length>1?'ids':'id'}=${this.id}`)
        .then((res) => {
          if(this.$route.query.id.length>1){
            this.content = ''
            res.data.forEach(item => {
              this.content += JSON.parse(item).data
            });
          }else{
            this.content = res.data.data
          }
          
        })
    },
  },
}
</script>