import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from'styled-components';

const scrollContaniner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState();
  //current 指向初始化 bs 实例需要的 DOM 元素 
const scrollContaninerRef = useRef();

const {
  direction, 
  click, 
  refresh, 
  pullUpLoading, 
  pullDownLoading, 
  bounceTop, 
  bounceBottom } = props;
const { 
  pullUp, 
  pullDown, 
  onScroll 
} = props;

useEffect(() => {
  const scroll = new BScroll(scrollContaninerRef.current, {
    scrollX: direction === 'horizental',
    scrollY: direction === 'vertical',
    probeType: 3,
    click: click,
    bounce: {
      to: bounceTop,
      bottom: bounceBottom
    }
  });
  setBScroll(scroll);
  return () => {
    setBScroll(null);
  }
}, []);

useEffect(() => {
  if (refresh && bScroll) {
    bScroll.refresh();
  }
});

useEffect(() => {
  if (!bScroll || !onScroll) return;
  bScroll.on('scroll', (scroll) => {
    onScroll(scroll);
  })
  return () => {
    bScroll.off('scroll')
  }
}, [onScroll, bScroll])

return (
  <scrollContaniner ref={scrollContaninerRef}>
    {props.children}
  </scrollContaniner>
)
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
  click: true, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向下吸底
}

export default React.memo(Scroll);

