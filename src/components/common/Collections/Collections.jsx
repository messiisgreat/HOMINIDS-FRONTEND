import React from 'react';
import { SectionTitle } from '@components/common';
import CollectionItem from './CollectionItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ArrowLeft from '../../../../public/assets/icons/arrow-left';
import ArrowRight from '../../../../public/assets/icons/arrow-right';

export default function Collections({ title, mainTitle }) {
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
    <div className="">
      <div className="flex items-center justify-between">
        <SectionTitle title={mainTitle} des={'Explore ' + title} />
        <div className="flex gap-5">
          <div className="cursor-pointer rounded-full border-[3px] border-solid border-[#AF50BD66] p-6">
            <ArrowLeft className="" width="18" height="18" />
          </div>
          <div className="flex items-center">
            <div className="Actay-fontfamily text-2xl leading-[28.8px] tracking-[3%]">03 / </div>
            <div className="Actay-fontfamily flex items-end text-base leading-[19.2px] tracking-[3%]">
              &nbsp;19
            </div>
          </div>
          <div className="cursor-pointer rounded-full border-[3px] border-solid border-[#AF50BD66] p-6">
            <ArrowRight className="cursor-pointer" width="18" height="18" />
          </div>
        </div>
      </div>
      <div>
        <div className="mt-[76px] flex flex-row">
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
    </div>
  );
}
