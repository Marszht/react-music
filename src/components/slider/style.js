import  styled  from 'styled-components';

import style from '../../assets/global-style';

export const SliderContainer = styled.div`
  position: relative;

  margin: auto;
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  background: white;

  .before {
    position: absolute;
    top: -300px;

    height: 400px;
    width: 100%;

    background: ${style['theme-color']}
  }

  .swiper-container {
    position: relative;
    overflow: hidden;

    width:  98%;
    height: 160px;
    margin: auto;
    border-radius: 6px;

    .swiper-nav {
      display: block;

      position: absolute;

      width: 100%;
      height: 100%;

    }
    .swiper-pagination-bullet-active {
      background: ${style["theme-color"]};
    }

  }
`