import { reqCategoryList, reqBanners, reqFloors } from '@/api'
/**
 * state:仓库存储数据的地方
 * mutations：修改state的唯一手段
 * actions： 处理action，可以书写自己的业务逻辑，也可以处理异步
 * getters: 理解为计算属性，用户简化仓库属性，让组件获取仓库的数据更加方便
 */
const state = {
  // state中数据默认初始值别瞎写 ，服务器返回的时对象、数组【根据接口的返回值进行初始化】
  categoryList: [],
  // 轮播图
  bannerList: [],
  // 楼层
  floors: [],
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  RECEIVEFLOORS(state, floors) {
    state.floors = floors
  },
}
const actions = {
  // 通过api里边的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    const res = await reqCategoryList()
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
  async getBannerList({ commit }) {
    const result = await reqBanners()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  async receiveFloors({ commit }) {
    const res = await reqFloors()
    if (res.code === 200) {
      commit('RECEIVEFLOORS', res.data)
    }
  },
}
// 计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
