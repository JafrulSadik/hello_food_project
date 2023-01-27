import React from 'react';
import styled from 'styled-components';
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { sliderItems } from "../data";
import { mobile, tablet } from '../responsive';

const Wrapper = styled.div`
    .swiperStyle{
        text-align: center;
    }

    .mySwiper{
        margin: 30px 0px;

        ${tablet({
          margin : 0
        })}

        ${mobile({
          margin : 0
        })}
    }

    .swiper-pagination-bullet-active{
        background-color: #cbcbcb83;
    }
`

const Img = styled.img`
    width: 95vw;
    height: 80vh;
    text-align: center;
    border-radius: 15px;

    ${tablet({
        "height": "40vh",
        "width" : "100vw"
    })}

    ${mobile({
        "height": "24vh",
        "borderRadius" : "0px"
    })}
`
const Link = styled.a`
`


const Slider = () => {

  return (
    <Wrapper>
      <Swiper
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        pagination={{
          //dynamicBullets: true,
          clickable: true
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {
            sliderItems.map((item, index) => (
                <SwiperSlide className='swiperStyle' key={index}>
                    <Link href='/'><Img src={item.img} alt="text"></Img></Link>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </Wrapper>
  )
}

export default Slider