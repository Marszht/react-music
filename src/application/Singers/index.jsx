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
  refreshMoreHotSingerList 
} from './store/actionCreators';
import { categoryTypes, alphaTypes }  from '../../api/config';

import Scroll from '../../baseUrl/scroll';
import Horizen from '../../baseUrl/horizen-item/index';
import ListView from '../../baseUrl/list-item/index';
import Loading from '../../baseUrl/loading/index';

import { NavContainer, ListContainer, ListItem, List } from './style';

function Singers (props) {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('HOT');

  const {singerList, enterLoading, pageCount } = props;
  const { getHotSingerDispatch, updateDispatch, updateHotDispatch, pullUpRefreshDispatch } = props;





  useEffect(() => {
    if(!singerList.size && !category && alpha === 'HOT') {
      getHotSingerDispatch();
    }
  },[])

 let handleUpdateCatetory = (val) => {
   if (val === category) return;
   setCategory(val);
   updateDispatch(val, alpha);
 }

 let handleUpdateAlpha = (val) => {
   if (val === alpha) return;
   setAlpha(val);
   if(val === 'HOT') {
    updateHotDispatch();
  } else {
    updateDispatch(category, val )
  }
 }

 const handlePullUp = () => {
  pullUpRefreshDispatch(category, alpha, pageCount)
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
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(category, alpha));
    },
    updateHotDispatch () {
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getHotSingerList());
    },
    pullUpRefreshDispatch(category, alpha, count) {
      console.log({count});
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (alpha === 'HOT') {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))