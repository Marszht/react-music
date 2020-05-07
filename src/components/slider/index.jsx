import React, { useEffect, useState } from 'react';

import { SliderContainer } from './style';

import "swiper/css/swiper.css";
import Swiper from "swiper";

function Slider (props) {
  const [sliderSwiper, setSliderSwiper] = useState (null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        effect :'coverflow',
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList, sliderSwiper]);

 
  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            bannerList.map((slider) => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="swiper-nav">
                    <img  src={slider.imageUrl} width="100%" height="100%" alt="推荐"/>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}


export  default React.memo(Slider);