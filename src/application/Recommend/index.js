import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { forceCheck } from 'react-lazyload';

import Slider from '../../components/slider/index';
import RecommendList from '../../components/list/index';
import Scroll from '../../baseUrl/scroll/index.jsx';
import Loading from '../../baseUrl/loading/index';

import * as actionTypes from './store/actionCreators';

import {Content} from './style'

function Recommend (props) {
  const { bannerList, recommendList, enterLoading } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect (() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  // eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList recommendList={recommendListJS}/>
        </div>
      </Scroll>
      { renderRoutes(props.route.routes) }
     { enterLoading && <Loading />}
    </Content>
  )
}


// 映射Redux 全局的state 到组件的props
const mapStateToProps = (state) => {
  return{
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
}};

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));