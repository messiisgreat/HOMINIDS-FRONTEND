import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import ArrowDown from '../../../../public/assets/icons/arrow-down';
import { CollectionItem } from '@components/common/';

const TopCollections = () => {
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
    <>
      <div className="flex items-center justify-between">
        <div className="Black-fontfamily text-[64px] font-black uppercase leading-[80px] text-[#FFFFFF]">
          TOP collections
        </div>
        <div
          className="nato-fontfamily flex gap-4 text-2xl text-[#FFFFFF]"
          style={{ lineHeight: '30.24px', fontWeight: 500 }}
        >
          <div className="nato-fontfamily flex items-center justify-center gap-2 rounded-[100px] border-[1px] border-solid border-[#5d306857] bg-[#5d306827] px-12 py-4" style={{padding: '16px 48px', backgroundColor: '#5d306827', borderColor: "#5d306857"}}>
            <div>Last 24 hours</div>
            <ArrowDown width="10" height="24" />
          </div>
          <div className="nato-fontfamily flex items-center justify-center gap-2 rounded-[100px] border-[1px] border-solid border-[#5d306857] bg-[#5d306827] px-12 py-4" style={{padding: '16px 48px', backgroundColor: '#5d306827', borderColor: "#5d306857"}}>
            <div>All categories</div>
            <ArrowDown width="10" height="24" />
          </div>
        </div>
      </div>
      <div>
        <div className="mt-24 flex flex-row">
          <Swiper slidesPerView={'auto'} spaceBetween={36} className="mySwiper">
            {collections.map((collection, key) => (
              <SwiperSlide key={key}>
                <CollectionItem
                  collection={{
                    id: collection.collection_address,
                    name: collection.name,
                    image: collection.logo,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopCollections;
