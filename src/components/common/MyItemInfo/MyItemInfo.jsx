import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import useSWR from 'swr'
import { SMART_CONTRACTS,RPC, } from '@constants/index';

export default function MyItemInfo() {
  const connection = new Connection(RPC);
  const provider = new JsonRpcProvider(connection,{versionCacheTimeoutInSeconds:0});


  const { data  } = useSWR(
    'getStakedCount',
    async () => {
      const object = await provider.getObject({
        id: SMART_CONTRACTS.VAULT_ADDRESS, options: { showDisplay: false, showContent: true }
      }).catch((e) => console.log(e));
      return object.data.content.fields.staked_hominids;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );

  const { data:marketplace  } = useSWR(
    'getMarketplaceInfo',
    async () => {
      const object = await provider.getObject({
        id: SMART_CONTRACTS.MARKETPLACE_ID, options: { showDisplay: false, showContent: true }
      }).catch((e) => console.log(e));

      const object2 = await provider.getObject({
        id: SMART_CONTRACTS.BLAT_MARKETPLACE_ID, options: { showDisplay: false, showContent: true }
      }).catch((e) => console.log(e));

      object.data.content.fields.listed = parseInt(object.data.content.fields.listed) + parseInt(object2.data.content.fields.listed);
      return object.data.content.fields;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );
  
  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
  };

  return (
    <div className="flex flex-col sm:flex-row gap-9 rounded-xl border border-[#dbdbdb] bg-[#030303] px-16 py-8">
      <div className="shrink-0 grow-0">
        <div className="flex h-[190px] w-[190px] flex-row items-center rounded-2xl border border-[#868686] bg-[#0f0f0f] ">
          <Image
            alt=""
            src="https://hominids.io/hominids_ipfs/logo.gif"
            loader={() => "https://hominids.io/hominids_ipfs/logo.gif"}
            width={200}
            height={200}
            className="mx-auto rounded-2xl"
          />
        </div>
        <p className="mt-4 flex flex-row justify-center gap-4 text-xl">
          <Link href="" className="collection-social">
            <AiOutlineTwitter />
          </Link>
          <Link href="" className="collection-social">
            <FaTelegramPlane />
          </Link>
          <Link href="" className="collection-social">
            <FaDiscord />
          </Link>
        </p>
      </div>
      <div>
        <h1 className="text-3xl font-bold capitalize">Hominids</h1>
        <p className="mt-2 text-base text-gray">
          The Hominids are a 2D NFT collection that will grant access to an immersive 3D experience
          in the Homiverse, the first Sui Metaverse.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row w-full justify-around rounded-2xl bg-[#0c0c0c] p-6 text-center">
          <div>
            <p className="text-base capitalize text-gray">Staked Hominids</p>
            <p className="mt-2 text-[18px] font-bold uppercase text-white">{data}</p>
          </div>
          <div>
            <p className="text-base capitalize text-gray">Listed Hominids</p>
            <p className="mt-2 text-[18px] font-bold uppercase text-white">{marketplace?.listed}</p>
          </div>
          <div>
            <p className="text-base capitalize text-gray">Floor price</p>
            <p className="mt-2 text-[18px] font-bold uppercase text-white">{marketplace?.floor/10**9} $HOMI</p>
          </div>
          <div>
            <p className="text-base capitalize text-gray">Total Volume</p>
            <p className="mt-2 text-[18px] font-bold uppercase text-white">{formatCash(marketplace?.volume/10**9)} $HOMI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
