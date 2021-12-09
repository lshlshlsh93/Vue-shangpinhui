<template>
  <div class="type-nav">
    <!-- <h1>{{ categoryList }}</h1> -->
    <div class="container">
      <!-- 事件委派|事件委托 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <!-- 三级分类 -->
                      <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <em>
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入lodash全部的功能函数引入
// import _ from 'lodash'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav', // 组件名字
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    }
  },
  methods: {
    // 鼠标进入修改响应式currentIndex属性
    // throttle回调函数别使用箭头函数，可能出现上下文this问题
    changeIndex: throttle(function (index) {
      // index：鼠标移上某一个一级分类的元素的索引值
      /**
       * 正常情况：(用户慢慢的操作)：鼠标进入，每一个一级分类h3，都会触发鼠标事件
       * 非正常情况：(用户操作过快)：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
       * 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有大量的业务，有可能出现卡顿现象
       *
       */
      this.currentIndex = index
    }, 50),
    // 一级分类鼠标移除的事件
    leaveIndex() {
      this.currentIndex = -1
      // 只有当前路由在search才进行操作
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    goSearch(event) {
      // 最好的解决方法是 编程式导航 + 事件委派
      /**
       * 利用事件委派存在的问题
       * 1.点击的一定是a标签 -->把子节点中当中a标签加上自定义属性data-categoryName，其余的子节点是没有的
       * 2.如何获取参数
       * 事件委派是把全部的子节点的事件委派给父亲节点
       *
       */
      let ele = event.target

      // 获取到当前触发这个事件的节点，【需要带有data-categoryName这样的节点一定是a标签】
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = ele.dataset
      // 带有data-categoryName这样的节点一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }

        // 一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 判断路由当中有没有params参数
        if (this.$route.params) {
          location.params = this.$route.params
          // 动态给location配置对象添加query参数
          location.query = query
          // 路由跳转
          this.$router.push(location)
        }
      }
    },
    // 当鼠标移入的时间，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    },
  },
  // 组件挂载完毕：可以向服务器发起请求
  mounted() {
    // 当组件挂载完毕，show属性变为false
    // 如果不是Home组件路由，将typeNav进行隐藏
    if (this.$route.path !== '/home') this.show = false
  },
  computed: {
    ...mapState({
      /**
       * 对象的写法：右侧需要的是一个函数，当使用计算属性的时间，右侧函数会立即执行一次
       * 会注入一个参数state，即为大仓库state中的数据
       */
      categoryList: (state) => state.home.categoryList,
    }),
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 进入的开始状态
    .sort-enter {
      height: 0px;
      transform: rotate3d(); // 过渡动画
    }
    // 进入的结束状态
    .sort-enter-to {
      height: 461px;
      transform: rotate3d(); // 过渡动画
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
