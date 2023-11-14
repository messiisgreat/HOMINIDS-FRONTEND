import CurrentBuyCard from './CurrentBuyCard';
import { MdClose } from 'react-icons/md';
import React from 'react';

export default function BuyModal(props) {
  return (
    <div
      className="relative rounded-[40px] border-solid p-10 text-[#b780ff8c]"
      style={{
        border: '3px solid #b780ff8c',
        backgroundColor: '#b780ff14',
        borderImageSource:
          'linear-gradient(107.18deg, #5D3068 1.11%, rgba(199, 173, 255, 0.2) 44.61%, #5D3068 97.47%)',
      }}
    >
      <div
        className="flex justify-between rounded-[40px]"
        style={{
          padding: '10px',
          background:
            'linear-gradient(107.18deg, #5D3068 1.11%, rgba(199, 173, 255, 0.2) 44.61%, #5D3068 97.47%), linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))',
        }}
      >
        <div
          className="nato-fontfamily flex w-full flex-col items-start justify-start"
          style={{
            paddingLeft: '70px',
            paddingTop: '78.5px',
            paddingBottom: '45.5px',
            gap: '90px',
          }}
        >
          <div className="flex justify-between gap-5">
            <div className="flex items-start gap-[20px]">
              <img
                className="h-12 w-12"
                width={48}
                height={48}
                src={'/assets/images/avatar.png'}
                alt=""
              />
              <div className="nato-fontfamily gap- flex flex-col">
                <div className="text-lg leading-[21.6px] text-[#9D9999] ">Created by</div>
                <div className=" text-lg font-bold leading-[21.6px]">Hominids</div>
              </div>
            </div>
            <div className="nato-fontfamily mr-2 text-xl leading-6" style={{ width: '534px' }}>
              The Breaker - The time and space disruptor, weaving reality to their enigmatic will.
              Let&apos;s welcome… &apos;THE BREAKER&apos; One-of-a-kind art, but benefits too?…
            </div>
          </div>
          <CurrentBuyCard {...props} />
        </div>
        <img src={props.collectionImg} width={400} className="rounded-[40px]" />
      </div>
      <button className=" absolute right-5 top-3 text-3xl" onClick={() => props.setIsOpen(false)}>
        <MdClose />
      </button>
    </div>
  );
}
