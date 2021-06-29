<style lang="less">
.command-main {
  width: 100%;
  .content-bd {
    height: 50vh;
    margin-top: 20px;
    background: black;
    color: white;
    text-align: left;
    padding: 10px;
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
    <input placeholder="输入命令行"
           v-model="pacl"
           @keydown.enter="exictCommand" />
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
        .get(`${this.urls}client?cmd=${this.pacl}&id=${this.id}`)
        .then((res) => {
          this.content = res.data[this.ip]
        })
    },
  },
}
</script>