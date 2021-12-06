import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import TypeNav from '@/pages/Home/TypeNav'
//将三级联动组件注册为全局组件
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

import { reqCategoryList } from '@/api'
reqCategoryList()

new Vue({
  render: (h) => h(App),
  // 下方代码注册路由 ，不论是路由组件还是非路由组件身上都有了$route,$router
  /**
   * $route：一般获取路由信息：【路径、query、params等等】
   * $router：一般进行编程式导航进行路由跳转【push|replace】
   *  */
  router,
}).$mount('#app')
