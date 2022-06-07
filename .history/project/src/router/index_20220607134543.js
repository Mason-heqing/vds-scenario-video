  import Vue from 'vue'
  import Router from 'vue-router'

  Vue.use(Router)

  const router = new Router({
    linkExactActiveClass: "active",
    mode: 'history',
    scrollBehavior(to, from, savedPosition) { //解决滚动条高度继承问题
        return { x: 0, y: 0 }
    },
    routes: [
        //-----------------首页---------------------
        {
          path: "/",
          name: "home",
          component: (resolve) => require(['@/views/home/index'], resolve),
          meta: { keepAlive: false },
        },

        /**视频资源-时长包**/
        {
          path: "/packageDuration",
          name: "packageDuration",
          component: (resolve) => require(['@/views/videoPackage/duration/index'], resolve),
          meta: { keepAlive: false },
        },
        /**视频资源-专线包**/
        {
          path: "/packageSpecialized",
          name: "packageSpecialized",
          component: (resolve) => require(['@/views/videoPackage/special/index'], resolve),
          meta: { keepAlive: false },
        },
        //资源池-时长包
        {
          path: "/poolDuration",
          name: "poolDuration",
          component: (resolve) => require(['@/views/resourcePool/poolDuration/index'], resolve),
          meta: { keepAlive: false },
        },
         //资源池-专线包
         {
          path: "/poolSpecialized",
          name: "poolSpecialized",
          component: (resolve) => require(['@/views/resourcePool/poolSpecialized/index'], resolve),
          meta: { keepAlive: false },
        },


        //-----------------------用户信息-----------------------------------
        //  所有项目页面
      

        {
          path: "/edituserinfo",
          name: "edituserinfo",
          component: (resolve) => require(['@/views/userInfo/editUserInfo/index'], resolve),
          meta: { keepAlive: false },
        },


        //-----------------------404-----------------------------------
        {
          path: "*",
          name: "notfound",
          component: (resolve) => require(['@/components/notFound'], resolve),
          meta: { keepAlive: false },
        },  
        
        

      //-----------------统计分析---------------------

    //订单统计
    {
      path:'/statOrder',
      name:'statOrder',
      component:(resolve)=>require(['@/views/statisticalAnalysis/orderStatistics/index'],resolve),
      meta:{keepAlive:false},
    },

     //播放统计
    {
      path:'/statPlayer',
      name:'statPlayer',
      component:(resolve)=>require(['@/views/statisticalAnalysis/storecarAnalysis/index'],resolve),
      meta:{keepAlive:false},
    },
     //激活统计
     {
      path:'/statActivate',
      name:'statActivate',
      component:(resolve)=>require(['@/views/statisticalAnalysis/statActivate/index'],resolve),
      meta:{keepAlive:false},
    },
    



    // //-----------------订单管理---------------------


      //  //订单查询
      {
        path: "/order",
        name: "order",
        component: (resolve) => require(['@/views/orderListManage/orderInquiry/index'], resolve),
        meta: { keepAlive: false },
      },


      ]

    
  });
  //拦截未登录状态访问需登录的路由
  router.beforeEach((to, from, next) => {
    // localStorage.setItem("isNoProject",true)
    // if(!localStorage.getItem("isNoProject")){
    //   if(to.path != '/projectmanageadd'){
    //     next('/projectmanageadd')
    //   }else{
    //     next();
    //   }
      
    // }else{
    //   next()
    // }
    next()
    
  });

  export default router
