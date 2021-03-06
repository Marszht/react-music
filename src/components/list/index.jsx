import React from 'react';
import LazyLoad from 'react-lazyload';

import { getCount } from '../../api/utils';

import {
  ListWrapper,
  ListItem,
  List
} from './style';

function RecommendList (props) {
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List isTribble={ props.recommendList && props.recommendList.length % 3 ? false : true}>
        {
          props.recommendList.map((item, index) => {
            return (
              <ListItem key={item.id + index} isTribble={props.recommendList.length % 3 ? false : true}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <LazyLoad 
                    placeholder={
                    <img width="100%" height="100%" 
                    src={require ('./music.png')} 
                    alt="music"/>}>
                    <img 
                      src={item.picUrl + "?param=300*300"} 
                      width="100%" 
                      height="100%"
                      alt="music">
                  </img>
                  </LazyLoad>
                 <div className="play_count">
                   <i className="iconfont play">&#xe885;</i>
                   <span className="count">{getCount(item.playCount)}</span>
                 </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList);