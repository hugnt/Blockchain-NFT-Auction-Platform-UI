import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import NFT from '../NFT';

export default function SlideHaft() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <NFT isShowShort={true}/>
        </SwiperSlide>
        <SwiperSlide>
            <NFT isShowShort={true}/>
        </SwiperSlide>
        <SwiperSlide>
            <NFT isShowShort={true}/>
        </SwiperSlide>
        <SwiperSlide>
            <NFT isShowShort={true}/>
        </SwiperSlide>
        <SwiperSlide>
            <NFT isShowShort={true}/>
        </SwiperSlide>
        <SwiperSlide>
            <NFT isShowShort={true}/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
