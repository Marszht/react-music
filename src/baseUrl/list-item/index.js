import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import style from '../../assets/global-style';

const ListWrapper = styled.div`
  position: relative;

  height: 100%;
  width: 100%;
`

const ListShortCut = styled.div`
  position: fixed;
  top: 57%;
  right: 0;
  transform: translateY(-50%);
  z-index: 30;

  padding: 5px 0;
  border: 1px solid  ${style['theme-color-light']};

  border-radius: 10px;
  width: 20px;

  text-align: center;
  /* FIXME: */
  /* background: #d86e6e; */
`
const ListItem = styled.li`
  padding: 3px;
  
  line-height: 1;
  font-size: ${style['font-size-s']};
  &.selected {
  color: ${style['theme-color']};
  }
`

function ListView (props) {
  const {list, oldValue } = props;
  const { handleClick } = props;
  return (
    <ListWrapper>
      <ListShortCut>
        <ul>
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
        </ul>
      </ListShortCut>
    </ListWrapper>

  )
}

ListView.defaultProps = {
  list: [],
  lodValue: '',
  handleClick: null
};

ListView.prototype = {
  list: PropTypes.array,
  oldValue: PropTypes.string,
  handleClick: PropTypes.func
}

export default React.memo(ListView);