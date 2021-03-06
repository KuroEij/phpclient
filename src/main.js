import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router"
import axios from 'axios'
import {saveAs} from "file-saver"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.mixin({
  data(){
    return{
      urls:'/'
    }
  }
})
Vue.prototype.$axios = axios
Vue.prototype.$saveAs = saveAs
window.app =new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
// console.log(app)