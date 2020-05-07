import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Top, TabItem, Tab } from './style';
import { NavLink } from 'react-router-dom';
// import route from ''

function Home (props) {
  const { route } = props;
  console.log(props);
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">叮咚</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem><span>推荐</span></TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem><span>歌手</span></TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem><span>排行</span></TabItem>
        </NavLink>
      </Tab>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home);