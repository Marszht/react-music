import React from 'react';

import styled, { keyframes } from 'styled-components';

import style from '../../assets/global-style';

const loading = keyframes`
  0%, 100% {
    transform: scale(0)
  }
  50% {
    transform: scale(1.0);
  }
`

const LoadingWrapper = styled.div`
  >div {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    margin: auto;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    z-index: 1000;

   background-color: ${style['theme-color']};
   animation: ${loading} 1.4s infinite ease-in;
    opacity: 0.6;
  }
  >div:nth-child(2) {
    animation-delay: -0.7s
  }
`

function Loading () {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  )
}
export default React.memo(Loading);