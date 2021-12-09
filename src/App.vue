<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口的地方 -->
    <router-view></router-view>
    <!-- 在home search显示，在登录和注册时隐藏 -->
    <!-- v-show="$route.path === '/home' || $route.path === '/search'" -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'app',
  components: { Header, Footer },
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  },
}
</script>
