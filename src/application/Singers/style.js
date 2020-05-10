import styled from'styled-components';
import style from '../../assets/global-style';

export const NavContainer = styled.div`
  position: fixed;
  top: 95px;
  overflow: hidden;

  padding: 5px;
  width: 100%;
  
  box-sizing: border-box;
`;

export const ListContainer  = styled.div`
  position: fixed;
  top: 137px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: auto;

  .title {
    margin: 10px 0 10px 10px;
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-s']};
  }
`

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 0 5px;
  padding: 5px 0;
  border-bottom: 1px solid ${style['border-color']};
  box-sizing: border-box;

  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 5px;
      height: 50px;
      width: 50px;
    }
  }
  .name {
    object-fit: cover;
    font-size: ${style['font-size-m']};
    font-weight: 500;
    color: ${style['font-color-desc']}
  }
  
`