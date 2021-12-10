// api接口进行统一管理
import request from './request'

// 引入mock
import mockAjax from './mockRequest'

// 三级联动的接口
export const reqCategoryList = () =>
  request({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取广告轮播列表
export const reqBanners = () => mockAjax.get('/banners')

// 获取首页楼层列表
export const reqFloors = () => mockAjax.get('/floors')

// 获取搜索模块数据
export const reqGetSearchInfo = (params) =>
  request({
    url: '/list',
    method: 'POST',
    data: params,
  })
