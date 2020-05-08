import  styled  from 'styled-components';

import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;

  .title {
    padding-left: 6px;
    
    font-size:14px;
    font-weight: 700;
    line-height: 60px;
  }
`;

// 可以接受参数 比较厉害 。
export const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${props => props.isTribble ? 'space-around': 'left'};

  width: 100%;
`;

export const ListItem = styled.div`
  position: relative;

  margin: ${props => props.isTribble ? 0 : ' 0 2px'};
  width: 32%;

  .img_wrapper {
    position: relative;

    padding-bottom: 100%;
    height: 0;
    .decorate {
      position: absolute;
      top: 0;

      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
    }

    .play_count {
      position: absolute;
      top: 2px;
      right: 2px;

      font-size: ${style['font-size-s']};
      line-height: 15px;
      color: ${style['font-color-light']};

      .play {
        vertical-align: top;
      }
    }
    img {
      position: absolute;

      border-radius: 3px;
      width: 100%;
      height: 100%;
    }
  }
  .desc {
    overflow: hidden;
    margin-top: 2px;
    margin-bottom: 10px;
    padding: 0 2px;
    max-height: 50px;

   display: -webkit-box;
   display: box;
   -webkit-box-orient: vertical;
   box-orient: vertical;
   word-break: break-all;
   -webkit-line-clamp: 2;
   line-clamp: 2;


    text-align: left;
    font-size: ${style['font-size-s']};
    line-height: 1.4;
    color: ${style['font-color-desc']}
  } 

`