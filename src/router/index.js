import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientList from '../components/maincenter/MainActionCom.vue'
import CommandLogs from '../components/maincenter/CommandLogs.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'clientlist',
    component: ClientList
  },
  {
    path: '/fileslogs',
    name: 'FilesLogs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/maincenter/FilesLogs.vue')
  },
  {
    path:'/allcommand',
    name:'allcommand',
    component:() =>import('../components/maincenter/AllCommandCom.vue'),
    redirect:'/allcommand/logs',
    children:[
      {
        path:'logs',
        name:"logs",
        component:CommandLogs
      },
      {
        path:'file',
        name:"file",
        component:CommandLogs
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
