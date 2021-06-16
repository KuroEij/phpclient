<template>
    <div  style="width:100%;">
        <div style="height:50vw;margin-top:20px;background:black;color:white;text-align:left;padding:10px;" disabled >{{content}}</div>
        <input style="border:1px slode #ccc;width:80%;margin-top:10px;height:40px;padding:0 10px;" placeholder="输入命令行" v-show="pacl" @keydown.enter="exictCommand"/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            content:'none',
            id:'',

            pacl:"输入命令"
        }
    },
    mounted(){
      this.id = this.$route.query.id.join(',')
      console.log(this.$route.params)        
    },
    methods:{
        exictCommand(){
            this.$axios(`${this.urls}client`,{
                cmd:this.pacl,
                id:this.id
            }).then(res=>{
                this.content =res.data
            })
        }
    }
}
</script>