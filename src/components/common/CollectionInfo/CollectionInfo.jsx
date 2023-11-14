import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';

export default function CollectionInfo({collectionName,collectionDescription,collectionImage,totalSupply,listedItems,floorPrice,totalVolume}) {
  const formatCash = n => {
    if (n < 1e3) return n.toFixed(2);
    if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
  };
  return (
    <div className="flex flex-row gap-9 rounded-xl border border-[#dbdbdb] bg-[#030303] px-16 py-8">
      <div className="shrink-0 grow-0">
        {collectionName ? <Image
          alt=""
          src={collectionImage.replace("ipfs://", "https://ipfs.io/ipfs/")}
          loader={() => collectionImage.replace("ipfs://", "https://ipfs.io/ipfs/")}
          width={190}
          height={190}
          className="rounded-2xl"
        /> :<div className="p-3 space-y-4">
        <div className="flex space-x-4">
          <div className="animate-pulse w-48 h-[180px] bg-sky-100"></div>
        </div>
      </div>}
        <p className="mt-4 flex flex-row justify-center gap-4 text-xl">
          <Link href="https://twitter.com/_hominids_/" className="collection-social">
            <AiOutlineTwitter />
          </Link>
       
          <Link href="https://discord.gg/hominids" className="collection-social">
            <FaDiscord />
          </Link>
        </p>
      </div>
      <div>
        {collectionName ? <div><h1 className="text-3xl font-bold capitalize">{collectionName}</h1>
        <p className="mt-2 text-base text-gray">
          {collectionDescription}
         
        </p></div> : <div className="p-3 space-y-4">
                <div className="flex space-x-4">
                  <div className="animate-pulse w-48 h-[25px] bg-sky-100"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="animate-pulse w-[500px] h-[50px] bg-sky-200"></div>
                </div>
              </div>
           }
        <div className="mt-8 gap-8 flex w-full flex-row justify-around rounded-2xl bg-[#0c0c0c] p-6 text-center">
          <div>
            <p className="text-base capitalize text-gray">Total Supply</p>
            <div className="mt-2 text-[18px] font-bold uppercase text-white">{isNaN(totalSupply)?(<div className="animate-pulse w-24 h-[25px] bg-sky-100"></div>):totalSupply}</div>
          </div>
          <div>
            <p className="text-base capitalize text-gray">Listed Items</p>
            <div className="mt-2 text-[18px] font-bold uppercase text-white">{isNaN(listedItems)||listedItems==undefined?(<div className="animate-pulse w-24 h-[25px] bg-sky-100"></div>):listedItems}</div>
          </div>
          <div>
            <p className="text-base capitalize text-gray">Floor Price</p>
            <div className="mt-2 text-[18px] font-bold uppercase text-white">{isNaN(floorPrice)?(<div className="animate-pulse w-24 h-[25px] bg-sky-100"></div>): (formatCash(floorPrice)+ ' SUI')} </div>
          </div>
          <div>
            <p className="text-base capitalize text-gray">Total Volume</p>
            <div className="mt-2 text-[18px] font-bold uppercase text-white">{isNaN(totalVolume)?(<div className="animate-pulse w-24 h-[25px] bg-sky-100"></div>): formatCash(totalVolume) + ' SUI'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
