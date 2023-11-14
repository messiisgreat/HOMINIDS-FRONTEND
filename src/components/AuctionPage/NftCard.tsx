import React from 'react';
import Image from 'next/image';
interface NftCardProps {
  id: string;
  name: string;
  image: string;
}
const NftCard: React.FC<NftCardProps> = ({ id, name, image }) => (
  <>
    <div className="relative">
      <div className="flex w-[462px] flex-col gap-5 rounded-[24px] border-[3px] border-solid border-[#5D3068] p-7">
        <div className="flex justify-between">
          <div className="flex items-center gap-[10px]">
            <img
              className="h-12 w-12"
              width={48}
              height={48}
              src="/assets/images/avatar.png"
              alt=""
            />
            <div className="nato-fontfamily flex flex-col gap-1">
              <div className="text-lg leading-[21.6px] text-[#9D9999]">Created by</div>
              <div className=" text-lg font-bold leading-[21.6px]">Hominids</div>
            </div>
          </div>
          <div className="nato-fontfamily flex flex-col items-end justify-center">
            <div className="text-lg leading-[21.6px] text-[#9D9999]">Remaining time</div>
            <div className=" text-lg font-bold leading-[21.6px]" style={{ color: '#AF50BD' }}>
              12H:23M:02S
            </div>
          </div>
        </div>
        <Image
          src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
          loader={() => image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
          className="rounded-[24px]"
          width={400}
          height={400}
          alt="NFT"
        />
        <div className="flex items-center justify-between">
          <div className="nato-fontfamily flex flex-col items-start justify-center">
            <div className="text-lg leading-[21.6px] text-[#9D9999]">Final bid</div>
            <div
              className=" leading-[21.6px]"
              style={{ color: '#AF50BD', fontWeight: 800, fontSize: '32px' }}
            >
              4256 SUI
            </div>
          </div>

          <div className="nato-fontfamily w-[212px] rounded-[100px] bg-[#AF50BD] px-10 py-5 text-base font-medium uppercase leading-[19.2px]">
            auction ended
          </div>
        </div>
      </div>
    </div>
  </>
);
export default NftCard;
