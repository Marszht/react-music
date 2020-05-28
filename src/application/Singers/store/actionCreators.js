import { fromJS } from 'immutable';

import {
  CHANGE_SINGER_LIST,
  CHANGE_ALPHA,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING,
  CHANGE_LIST_OFFSET,
  CHANGE_CATEGORY,
} from './actionTypes';

import {
  getHotSingerListRequest,
  getSingerListRequest
} from "../../../api/request";

export const changeCategory = (data) => ({
  type: CHANGE_CATEGORY,
  data,
});

export const changeAlpha = (data) => ({
  type: CHANGE_ALPHA,
  data,
});

const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});

const changeListOffset = (data) => ({
  type: CHANGE_LIST_OFFSET,
  data
})

export const changePageCount = data => ({
  type: CHANGE_PAGE_COUNT,
  data
});

export const changeEnterLoading = data => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const changePullDownLoading = data => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
});

export const changePullUpLoading = data => ({
  type: CHANGE_PULLUP_LOADING,
  data
})


// 第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
    }).catch(() => {
      console.log("热门歌手获取失败")
    })
  }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(offset).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
      dispatch(changeListOffset(data.length));
    }).catch(() => {
      console.log('热门歌手数据获取失败')
    })
  }
}

// 加载对应类别歌手
export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset']);
    const category = getState().getIn(['singers', 'category']);
    const alpha = getState().getIn(['singers', 'alpha']);
    getSingerListRequest(category, alpha, offset).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};

// 加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset']);
    const singerList = getState().getIn(['singers', 'singerList']);
    getHotSingerListRequest(category, alpha, offset).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
      dispatch(changeListOffset(data.length));
    }).catch(() => {
      console.log('歌手数据获取失败')
    })
  }
}
