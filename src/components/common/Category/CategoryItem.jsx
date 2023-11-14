import Image from 'next/image';
import Link from 'next/link';

export default function CategoryItem({nftname,imgurl,nftprice}) {
  return (
    <div className="mt-10">
      <Link href="">
        <Image
          src={imgurl}
          width={272}
          height={178}
          alt=""
          className="w-full rounded-3xl"
        />
      </Link>
      <h3 className="mt-4 text-[18px] font-bold">
        <Link href="" className="gradient-text">
        {nftname}
        </Link>
      </h3>
      <p className="text-base text-gray">Sold for {nftprice} $HOMI</p>
    </div>
  );
}
