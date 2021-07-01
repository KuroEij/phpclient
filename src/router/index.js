import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientList from '../components/maincenter/MainActionCom.vue'
import CommandLogs from '../components/maincenter/CommandLogs.vue'
import FileManager from '../components/maincenter/FilesManaged.vue'
import FilesLogs from '../components/maincenter/FilesLogs.vue'
import Login from '../components/login.vue'
import MainBody from '../components/MainBody.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    
      path: '/home',
      name: 'mainbody',
      component: MainBody,
      redirect:'/home/clientlist',
      children:[
        {
          path: 'heartlogs',
          name: 'heartlogs',
          component: FilesLogs
        },
        {
          path: 'clientlist',
          name: 'clientlist',
          component: ClientList
        },
        {
          path:'allcommand',
          name:'allcommand',
          component:() =>import('../components/maincenter/AllCommandCom.vue'),
          redirect:'/allcommand/logs',
          children:[
            {
              path:'logs',
              name:"logs",
              component:CommandLogs
            },
          ]
        },
        {
          path:'file',
          name:"file",
          component:FileManager
        }
      ]
  },

]

const router = new VueRouter({
  routes
})

export default router
