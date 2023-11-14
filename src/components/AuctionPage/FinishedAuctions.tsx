import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import NftCard from './NftCard';

const FinishedAuctions = () => {
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
    <div style={{ marginTop: '153px', marginBottom: '221px' }}>
      <div className="flex items-center justify-between">
        <div className="Black-fontfamily text-[64px] font-black uppercase leading-[80px] text-[#FFFFFF]">
          Finished auctions
        </div>
        <div className="nato-fontfamily text-2xl text-[#FFFFFF]" style={{ width: '506px'}}>
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
    </div>
  );
};

export default FinishedAuctions;
