import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TrendingItem({nftname,imgurl}) {
  return (
    <div className="relative rounded-xl border border-white">
      <Link href="/collection/hominid" className="gradient-text">
      <Image
        src={imgurl}
        width={400}
        height={400}
        className="rounded-xl"
        alt=""
      />
       </Link>
      <h3 className="p-4 text-[18px] font-bold">
        <Link href="/collection/hominid" className="gradient-text">
          {nftname} 
        </Link>
      </h3>
    </div>
  );
}
