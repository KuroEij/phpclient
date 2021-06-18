<template>
    <div  style="width:100%;">
        <div style="height:50vh;margin-top:20px;background:black;color:white;text-align:left;padding:10px;" disabled >{{content}}</div>
        <input style="border:1px slode #ccc;width:80%;margin-top:10px;height:40px;padding:0 10px;" placeholder="输入命令行" v-model="pacl" @keydown.enter="exictCommand"/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            content:'none',
            id:'',

            pacl:""
        }
    },
    mounted(){
      this.id = this.$route.query.id.join(',')
      console.log(this.$route.params)        
    },
    methods:{
        exictCommand(){
            this.$axios.get(`${this.urls}/client?cmd=${this.pacl}&id=${this.id}`,{
                cmd:this.pacl,
                id:this.id
            }).then(res=>{
                this.content =res.data
            })
        }
    }
}
</script>