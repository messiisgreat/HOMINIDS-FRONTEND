import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import NftCard from '../../AuctionPage/NftCard';

export default function Category() {
  const [collections, setCollections] = useState([]);

  const loadCollections = () => {
    axios
      .get('/api/collections')
      .then((response) => {
        console.log(response.data.result);
        setCollections(response?.data?.result?.error == undefined ? response?.data?.result : []);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    loadCollections();
  }, []);
  return (
    <div className=" relative">
      <div className="flex items-center justify-between">
        <div className="Black-fontfamily text-[64px] font-black uppercase leading-[80px] text-[#FFFFFF]">
          Latest Sales
        </div>
        <div
          className="nato-fontfamily text-2xl text-[#FFFFFF]"
          style={{ width: '506px', marginRight: '117px' }}
        >
          Hurry up to participate in the sale of hominids and buy unique NFTs at the hottest prices
        </div>
      </div>
      <Swiper slidesPerView={'auto'} spaceBetween={36} style={{ marginTop: '89px' }}>
        {collections.map((collection, key) => (
          <SwiperSlide key={key}>
            <NftCard
              id={collection.collection_address}
              name={collection.name}
              image={collection.logo}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <img
        className="absolute top-0"
        style={{ transform: 'rotate(21deg)', top: '-120px', left: '-600px', opacity: '.3' }}
        width={800}
        src="/assets/images/Ellipse61.png"
        alt=""
      />
    </div>
  );
}
