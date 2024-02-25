import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-1.avif";
import slider2 from "../../assets/images/slider-3.avif";
import slider3 from "../../assets/images/slider-5.avif";
import slider4 from "../../assets/images/slider-6.avif";
import slider5 from "../../assets/images/slider-6.avif";
import slider6 from "../../assets/images/slider-7.avif";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <>
      <Slider {...settings}>
        <img src={slider1} alt="" />
        <img src={slider2} alt="" />
        <img src={slider3} alt="" />
        <img src={slider4} alt="" />
        <img src={slider5} alt="" />
        <img src={slider6} alt="" />
      </Slider>
    </>
  );
}
