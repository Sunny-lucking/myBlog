import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home/home'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
    {
        path: '/home',
        name: 'index',
        component: ()=>import('../views/index'),
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/login'),
    },
    {
        path:'/category',
        name:'category',
        component:()=>import('../views/category'),
    },
    {
        path:'/mine',
        name:'mine',
        component:()=>import('../views/mine'),
    },
    {
        path:'/album',
        name:'album',
        component:()=>import('../views/album'),
    },
    {
        path:'/edit',
        name:'edit',
        component:()=>import('../views/edit'),
    },
    {
        path:'/myarticle',
        name:'myarticle',
        component:()=>import('../views/myarticle'),
    }



]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//     const isLogin=localStorage.myblogToken?true:false;
//     if(to.path==="/login"||to.path==="/register"){
//         next();
//     }else{
//         isLogin?next():next("/login")
//     }
// });

export default router
