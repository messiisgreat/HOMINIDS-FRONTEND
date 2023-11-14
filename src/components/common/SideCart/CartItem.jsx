import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TiDelete } from 'react-icons/ti';

export default function CartItem({info}) {
  return (
    <h3 className="relative mt-5 flex flex-row items-center justify-between gap-2 rounded-xl bg-[#030303]   p-3">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={info?.image}
          loader={() => info?.image}
          alt=""
          height={28}
          width={28}
          className="rounded-full"
        />
        <Link href="" className="gradient-text text-sm font-medium">
        {info?.name}
        </Link>
      </div>
      <span className="text-xs font-bold text-[#34cb55]">{info?.price}</span>
      <button className="absolute -top-1 -right-1 z-10 text-2xl text-red-500">
        <TiDelete />
      </button>
    </h3>
  );
}
