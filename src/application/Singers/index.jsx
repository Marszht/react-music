import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';

import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList,
  changeCategory,
  changeAlpha
} from './store/actionCreators';
import { categoryTypes, alphaTypes }  from '../../api/config';

import Scroll from '../../baseUrl/scroll';
import Horizen from '../../baseUrl/horizen-item/index';
import ListView from '../../baseUrl/list-item/index';
import Loading from '../../baseUrl/loading/index';

import { NavContainer, ListContainer, ListItem, List } from './style';

function Singers (props) {


  const {singerList, enterLoading, pageCount, alpha, category, listOffset } = props;
  const { 
    getHotSingerDispatch, 
    updateHotDispatch, 
    pullUpRefreshDispatch,
    updateCategory,
    updateApha
  } = props;





  useEffect(() => {
    if(!singerList.size && !category && alpha === 'HOT') {
      getHotSingerDispatch();
    }
  },[])

 let handleUpdateCatetory = (val) => {
   if (val === category) return;
   updateCategory(val);
 }

 let handleUpdateAlpha = (val) => {
   if (val === alpha) return;
   updateApha(val);
 }

 const handlePullUp = () => {
  pullUpRefreshDispatch(category, alpha, listOffset)
 }

 const singerListJS = singerList ? singerList.toJS() : [];

 // 返回歌手列表
 const renderSingerList = () => (
  <List>
  {
    singerListJS.map((item, index) => (
      <ListItem 
       key={item.accountId+ "" + index}
      >
        <div className="img_wrapper">
        <LazyLoad 
          placeholder={
          <img width="100%" height="100%" 
          src={require ('./singer.png')} 
          alt="music"/>}>
          <img 
            src={item.picUrl + "?param=300*300"} 
            width="100%" 
            height="100%"
            alt="music">
          </img>
        </LazyLoad>
        </div>
        <span className="name">{item.name}</span>
      </ListItem>
    ))
  }
</List>
 )

  return (
    <div>
    <NavContainer>
      <Horizen 
       list={categoryTypes} 
       title={'分类:'}
       handleClick={handleUpdateCatetory}
       oldValue={category}
      ></Horizen>
    </NavContainer>   
      <ListView
        list={alphaTypes}
        handleClick={handleUpdateAlpha}
        oldValue={alpha}
      ></ListView>
      <ListContainer>
        <Scroll 
        onScroll={forceCheck}
        pullUp={ handlePullUp }
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      { enterLoading ? <Loading></Loading> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  alpha: state.getIn(['singers', 'alpha']),
  category: state.getIn(['singers', 'category']),
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    // 获取热门歌手
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateCategory (newVal) {
      dispatch(changeCategory(newVal));
      dispatch(getSingerList());
    },

    updateApha(newVal) {
      dispatch(changeAlpha(newVal));
      if (newVal === 'HOT') {
        dispatch(getHotSingerList());
      }else {
        dispatch(getSingerList());
      }
    },
    updateHotDispatch () {
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getHotSingerList());
    },
    pullUpRefreshDispatch(category, alpha, listOffset) {
      dispatch(changePullUpLoading(true));
      if (alpha === 'HOT') {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList());
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))