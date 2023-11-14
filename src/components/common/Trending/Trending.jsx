import React from 'react';
import Slider from 'react-slick';
import TrendingItem from './TrendingItem';
import Link from 'next/link';

export default function Trending() {

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    arrows: false,
    dots: true,
    centerPadding: '34%',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 100,
    focusOnSelect: true,
    autoplay: true,
  };

  return (
    <div className="mt-18 container">

      <h1 className="mt-14 text-center text-6xl font-bold uppercase">ERA HOMI</h1>
      <h3 className="mt-4 text-center text-base font-medium">
        Explore the most outstanding NTF Marketplace on Sui, <br />Buy and sell NFTs 
         and earn $HOMI rewards.
      </h3>
      <Link href="/explore">
      <button className="btn mx-auto mt-6 block w-full max-w-[247px]">
      Explore Collections</button>
      </Link>
      <h2 className="mt-8 text-center text-[40px] font-bold capitalize"></h2>
      <div
        className="bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('./assets/images/discover.png')",
        }}
      >
        <Slider {...settings} className="trending">
          <TrendingItem nftname={"Hominid #434"} imgurl={"/assets/images/hominid1.png"} />
          <TrendingItem nftname={"Hominid #7621"}imgurl={"/assets/images/hominid2.png"} />
          <TrendingItem nftname={"Hominid #328"} imgurl={"/assets/images/hominid3.png"} />
        </Slider>
      </div>
    </div>
  );
}
