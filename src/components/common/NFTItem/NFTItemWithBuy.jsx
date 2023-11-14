import Image from 'next/image';
import Link from 'next/link';
import { CountdownItem } from '@components/common';

export default function NFTItemWithBuy({id,nftname,nftimage,nftprice,setCardItem,currency,type,expires,selected}) {
  //console.log(new Date(parseInt(expires)),new Date()); 
  return (
    <div className={selected ? "inline-block rounded-3xl border-yellow-500 border-4 border border-[#9E8AA1]":"inline-block rounded-2xl border border-[#9E8AA1]"}>
      <Link href={"/nft/"+id} className="relative">
        <Image
          src={nftimage.replace("ipfs://", "https://ipfs.io/ipfs/")}
          width={300}
          height={300}
          className="w-full rounded-2xl "
          loader={() => nftimage.replace("ipfs://", "https://ipfs.io/ipfs/")}
        />
        <button className="btn-sm btn absolute bottom-0 right-0 z-10">Buy Bow</button>
      </Link>
      <div className="p-4">
        <h2 className="text-base font-bold text-white">
          <Link href="">{nftname}</Link>
        </h2>
        <div className="mt-2 flex flex-row items-center justify-between">
        <p className="mt-2 font-medium text-[#9e9e9e]">Price</p>
        <p className="mt-2">
          <span className="inline-block rounded-md bg-[#323232] px-2 py-1 text-sm">
            <Image
              alt=""
              src="/assets/images/currency.png"
              height={20}
              width={20}
              className="mr-2 inline-block rounded-full border-2 border-black align-top"
            />
            {nftprice} {currency.split('::').pop()}
          </span>
        </p>
        </div>
        
        <div className="mt-2 flex flex-row justify-between">
        {expires ? (
        <div className="mt-2 flex flex-col justify-between">
        <p className="font-medium test-xs text-[#9e9e9e]">Ending In</p>
        <CountdownItem time={new Date(parseInt(expires))} />
        </div>):<div></div>}


        {!expires ? (<p className="mt-6">
          <button onClick={()=>setCardItem({id:id,name:nftname,image:nftimage,price:nftprice,currency:currency,type:type})}>
            <Image src="/assets/images/add.png" height={27} width={27} alt="Buy" />
          </button>
        </p>):null}
        </div>

        

    
        
      </div>
    </div>
  );
}
