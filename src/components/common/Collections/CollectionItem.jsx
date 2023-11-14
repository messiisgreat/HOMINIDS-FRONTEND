import React from 'react';
import Image from 'next/image';

export default function CollectionItem({ collection }) {
  return (
    <div className="relative">
      <div className="flex w-[462px] flex-col gap-5 rounded-[24px] border-[3px] border-solid border-[#5D3068] p-7 pt-[311px]">
        <div className="nato-fontfamily mt-5 text-lg leading-[25.2px]">
          Suigoats is Dynamic collection of 7777 NFT and The identity of Sui Network
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-[10px]">
            <img className="h-12 w-12" width={48} height={48} src="/assets/images/bg.png" alt="" />
            <div className="nato-fontfamily flex flex-col gap-1">
              <div className="text-lg leading-[21.6px] text-[#9D9999]">Created by</div>
              <div className=" text-lg font-bold leading-[21.6px]">Hominids</div>
            </div>
          </div>
          <div className="nato-fontfamily rounded-[100px] bg-[#AF50BD] px-10 py-5 text-base font-medium uppercase leading-[19.2px]">
            mint now
          </div>
        </div>
      </div>
      <Image
        src={collection.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        loader={() => collection.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        className=" absolute left-7 top-[-89px] z-10 rounded-[24px]"
        width={400}
        height={400}
        alt="NFT"
      />
      <div className="absolute left-7 top-[219px] !z-20 w-[400px] rounded-b-[24px]">
        <div className="flex justify-between bg-[#11101299] p-6 text-center text-[18px] font-bold leading-6">
          <div className="flex flex-col">
            <div>Items</div>
            <div>1483</div>
          </div>
          <div className="flex flex-col">
            <div>Items</div>
            <div>1483</div>
          </div>
          <div className="flex flex-col">
            <div>Items</div>
            <div>1483</div>
          </div>
        </div>
      </div>
    </div>
  );
}
