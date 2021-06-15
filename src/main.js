import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router"
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.mixin({
  data(){
    return{
      urls:'http://127.0.0.1:3000/'
    }
  }
})
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
