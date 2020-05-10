import { axiosInstance } from './config';

import { param } from './utils';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

// 热门歌手
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

// 全部歌手
/**
 * 
 * @param {string} category 类别
 * @param {string} alpha  字母
 * @param {number} count  分页 
 */
export const getSingerListRequest = (category, alpha, count) => {
  console.log({alpha})
  return axiosInstance.get(`/artist/list?${param({cat:category, initial:alpha.toLowerCase(), offset:count})}`)
}