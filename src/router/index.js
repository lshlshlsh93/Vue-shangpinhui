import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

// 先把VueRouter原型对象的push、replace方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

/**
 * 重写push
 * @param {
 *  第一个参数：告诉push方法，往哪里传（传递哪些参数）
 *  告诉push方法，往哪里传（传递哪些参数）} location
 * @param {*成功的回调} resolve
 * @param {*失败的回调} reject
 */
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
/**
 * 重写replace
 * @param {*} location
 * @param {*} resolve
 * @param {*} reject
 */
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // call || apply区别：相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call与apply传递参数：call可以传递参数用逗号隔开，apply方法调用传递数组
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 配置默认路由
export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/home',
      component: Home,
      meta: { show: true },
    },
    {
      name: 'search',
      path: '/search/:keyword', //:keyword是路由传参的占位符
      //path: '/search',
      component: Search,
      meta: { show: true },
    },
    {
      name: 'register',
      path: '/register',
      component: Register,
      meta: { show: false }, // 路由的元信息key-value
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: { show: false },
    },
    /**项目运行时，立即重定向到到首页 */
    {
      path: '*',
      redirect: '/home',
    },
  ],
})
