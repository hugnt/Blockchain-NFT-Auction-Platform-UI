import React, { ReactNode, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination, Navigation,FreeMode } from 'swiper/modules';


interface PropsSlide{
  lstComponent?:ReactNode[];
  autoPlay?:boolean;
  freeMode?:boolean;
  className?:string;
}
export default function SlideHaft(props:PropsSlide) {
  let {lstComponent, autoPlay=true, freeMode=false, className} = props;
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        freeMode={false}
        autoplay={autoPlay&&{
            delay: 2000,
            disableOnInteraction: false,
          }}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Autoplay]}
        className={className}
        initialSlide={2}
      >
        {
            lstComponent?.map((x,i) => (
              <SwiperSlide key={i}>{x}</SwiperSlide>
            ))
        }
        
        
      </Swiper>
    </>
  );
}
