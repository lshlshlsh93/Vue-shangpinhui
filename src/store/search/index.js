import { reqGetSearchInfo } from '@/api'

const state = {
  searchList: {},
}
const mutations = {
  GETSEARCHINFO(state, searchList) {
    state.searchList = searchList
  },
}
const actions = {
  // 获取search模块数据
  async getSearchInfo({ commit }, params = {}) {
    // 调用时至少传递一个空对象
    // params形参：是用户派发action的时间，第二个参数传递过来的，至少是一个空对象
    const res = await reqGetSearchInfo(params)
    if (res.code === 200) {
      commit('GETSEARCHINFO', res.data)
    }
  },
}
// 计算属性 -->项目中主要作用：简化仓库当中的数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
