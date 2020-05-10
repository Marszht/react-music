import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types'

import Scroll from '../scroll/index';

import style from '../../assets/global-style';

const List = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  
  height: 30px;
  >span:first-of-type {
    display:block;
    flex: 0 0 auto;

    margin-right: 5px;
    padding: 5px 0;

    color: gray;
    font-size: ${style['font-size-m']};

    vertical-align: middle;

  }
`


const ListItem = styled.span`
  flex: 0 0 auto;

  padding: 5px 8px;
  border-radius: 10px;

  font-size: ${style['font-size-m']};


  &.selected {
    border: 1px solid ${styled['theme-color']};

    opacity: 0.8;
    color: ${style['theme-color']};
  }
`

function Horizen(props) {
  const { oldValue , title, list } = props;
  const { handleClick } = props;

  const Category = useRef(null);

  // 初始化Scroll
  useEffect(() => {
    let catagoryDOM = Category.current;
    let tagElems = catagoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    catagoryDOM.style.width = `${totalWidth}px`;
  })

  return (
    <Scroll direction={'horizental'}>
      <div ref={Category}>
        <List>
         <span>{title}</span>
        {
          list.map(item => (
            <ListItem 
              key={item.key}
              className={`${oldValue === item.key ? 'selected' : ''}`}
              onClick={() => handleClick(item.key)}
              >
              {item.name}
            </ListItem>
          ))
        }
        </List>
      </div>
    </Scroll>
  )
}

Horizen.defaultProps = {
  list: [],
  lodValue: '',
  title: '',
  handleClick: null
};

Horizen.prototype = {
  list: PropTypes.array,
  oldValue: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default React.memo(Horizen);
