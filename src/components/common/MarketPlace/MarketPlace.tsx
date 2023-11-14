import React from 'react';
import CategoryTabs from './CategoryTabs';
import SelectedNFTs from './SelectedNFTs';


const MarketPlace = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="Black-fontfamily text-[64px] font-black uppercase leading-[80px]">
            Explore our marketplace
          </div>
          <div
            className="nato-fontfamily text-2xl text-center"
            style={{ lineHeight: '33.6px' }}
          >
            Works that are currently at the peak of the platform&apos;s popularity are placed here.<br />Buy art, share this information with your friends
          </div>
        </div>
        <CategoryTabs />
        <SelectedNFTs />
      </div>
    </>
  );
};

export default MarketPlace;
