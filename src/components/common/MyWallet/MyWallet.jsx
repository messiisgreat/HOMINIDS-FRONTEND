import React from 'react';
import { useEffect,useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useSWRMutation from 'swr/mutation'
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { SMART_CONTRACTS, RPC, } from '@constants/index';
import { useWallet } from '@suiet/wallet-kit';
import Link from 'next/link';
import Image from 'next/image';
import { formatAddress } from '@services/frontend';
import { TransactionBlock } from "@mysten/sui.js";
import { toast } from 'react-toastify';
import axios from 'axios';

export default function MyWallet() {
  const { account: currentAccount, connected,signTransactionBlock } = useWallet();
  const [cursors, setCursors] = useState([null]);
  const [page, setPage] = useState(0);
  const [nfts, setNfts] = useState();
  const [hasMore, setHasMore] = useState(false);
  const [listedNfts, setListedNfts] = useState();

  const connection = new Connection(RPC);
  const provider = new JsonRpcProvider(connection);
  
  const get_nfts = async  () => {
    if (!currentAccount?.address) return;
      let nfts_objects_response = await provider.getOwnedObjects({
        //owner: "0x78a627b382f53affcdbc013b2954e2b77312af18bf491384285f16fcde728327", options: { showDisplay: true, showContent: true }
        owner: currentAccount?.address, options: { showDisplay: true, showContent: true }
        //,filter: {StructType:SMART_CONTRACTS.NFT_TYPE}
        ,limit:50,cursor: cursors[page]
        ,filter: {MatchNone: [{StructType: "0x2::coin::Coin"}]}
      }).catch(e=>console.log(e));
      const nfts_objects = nfts_objects_response?.data.filter(o=>o?.data?.display?.data?.name != undefined || o?.data?.display?.data?.description != undefined);
      
      if(nfts_objects_response.hasNextPage){
        setCursors(cursors.concat(nfts_objects_response.nextCursor));
        setPage(page+1);
        setHasMore(true);
      }
      console.log(cursors);

      setNfts(nfts_objects);
  }

  const load_more = async  () => {
    if (!currentAccount?.address) return;
      let nfts_objects_response = await provider.getOwnedObjects({
        owner: currentAccount?.address, options: { showDisplay: true, showContent: true }
        //,filter: {StructType:SMART_CONTRACTS.NFT_TYPE}
        ,limit:50,cursor: cursors[page]
        ,filter: {MatchNone: [{StructType: "0x2::coin::Coin"}]}
      }).catch(e=>console.log(e));
      const nfts_objects = nfts_objects_response?.data.filter(o=>o?.data?.display?.data?.name != undefined || o?.data?.display?.data?.description != undefined);
      
      if(nfts_objects_response.hasNextPage){
        setCursors(cursors.concat(nfts_objects_response.nextCursor));
        setPage(page+1);
      }else{
        setHasMore(false);
      }
      console.log(cursors);

      setNfts(nfts.concat(nfts_objects));
  }

  const loadListings = () => {
    axios.get('/api/market/mylistings?address='+currentAccount?.address).then((response)=>{setListedNfts(response.data.result)}).catch((e)=>{console.log(e);});
  }

  const { trigger:t4, data: staked  } = useSWRMutation(
    'getstaked',
    async () => {
      if (!currentAccount?.address) return;
      const stakednfts_receipts_objects = await provider.getOwnedObjects({
        owner: currentAccount.address, options: { showDisplay: false, showContent: true },
        filter: {StructType:SMART_CONTRACTS.RECEIPT_TYPE}
      });
      //const stakednfts_receipts_objects = objects?.data?.filter(object => object?.data?.content?.type == SMART_CONTRACTS.RECEIPT_TYPE);
      let stakednfts_addresses = [];
      stakednfts_receipts_objects?.data?.map((nft) => {
        stakednfts_addresses.push(nft.data.content.fields.nft_id);
      });
      const staked = await provider.multiGetObjects({
        ids: stakednfts_addresses, options: { showDisplay: true, showContent: true }
      })
      stakednfts_receipts_objects?.data?.map((nft,i) => {
        stakednfts_addresses.push(nft.data.content.fields.nft_id);
        staked[i].data.content.fields.receiptId = nft.data.objectId;
        staked[i].data.content.fields.stakedAt = nft.data.content.fields.stakedAt;
        staked[i].data.content.fields.withdrawn_amount = nft.data.content.fields.withdrawn_amount;

      });
      return staked;
    },
    {
      revalidate: true,
      populateCache: true,
    }
  );

  useEffect(() => {
    if (currentAccount?.address?.toString() === undefined) return;
    get_nfts(); loadListings();  t4();
  }, [currentAccount]);

  
  const delistNFT = async (id,coin,type) => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_DELIST_FUNCTION,
      typeArguments: [coin, type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
      ],
    });

    let toastId;
    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
        (res) => {
          console.log(res);
          toast.update(toastId, {
            render: "Delisted successfully",
            type: toast.TYPE.SUCCESS,
            progress: undefined,
            hideProgressBar: true,
            autoClose: 5000,
            pauseOnFocusLoss: true,
            closeOnClick: true,
            isLoading: false
          });
          //loadNFT();
        }
      ).catch(
        (err) => {
          toast.update(toastId, {
            render: err.toString(),
            type: toast.TYPE.ERROR,
            progress: undefined,
            hideProgressBar: true,
            autoClose: 5000,
            pauseOnFocusLoss: true,
            closeOnClick: true,
            isLoading: false
          });
          //console.log(err);
        }
      );
    }).catch(
      (err) => {
        toast.update(toastId, {
          render: err.toString(),
          type: toast.TYPE.ERROR,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
        //console.log(err);
      }
    )
  };

  const Nfts = () => {
    if (!connected) return (<h3 className="mt-20 text-center text-base font-medium">
    Wallet Not connected </h3>);
    return (
      <div>
        <div className="mt-12 grid grid-cols-4 gap-8">
          {nfts?.map((stakedNft, i) => (
            <div key={i} className="inline-block rounded-2xl border border-[#9E8AA1]">
              <Link href={"/nft/" + stakedNft.data.objectId} className="relative">
              { stakedNft?.data?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value &&
               <span className="badge badge-success badge-lg absolute top-1 left-1 z-50">{stakedNft?.data?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value}</span>}
               { stakedNft?.data?.content?.fields?.rarity &&
               <span className="badge badge-success badge-lg absolute top-1 left-1 z-50">{stakedNft?.data?.content?.fields?.rarity}</span>}
                <Image
                  alt="NFT"
                  width={300}
                  height={297}
                  className="w-full rounded-2xl "
                  src={stakedNft.data.display?.data?.image_url?.replace("ipfs://", "https://ipfs.io/ipfs/") || stakedNft.data.display.data?.img_url?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  loader={() => stakedNft.data.display?.data?.image_url?.replace("ipfs://", "https://ipfs.io/ipfs/") || stakedNft.data.display.data?.img_url?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                />
                <button className="btn-sm btn absolute bottom-0 right-0 z-10">Sell</button>
              </Link>
              <div className="p-4">
                <h2 className="text-base font-bold text-white">
                  <Link href="">{stakedNft?.data?.display?.data?.name || formatAddress(stakedNft.data.objectId)}</Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
        {hasMore?<center><button onClick={load_more} className="btn-sm btn mt-5">Load More</button></center>:null}
      </div>);
  };
  
  const Hominids = () => {
    if (!connected) return (<h3 className="mt-20 text-center text-base font-medium">
    Wallet Not connected </h3>);
    return (
      <div>
        <div className="mt-12 grid grid-cols-4 gap-8">
          {nfts?.filter(n=>n.data.content.type==SMART_CONTRACTS.NFT_TYPE)?.map((stakedNft, i) => (
            <div key={i} className="inline-block rounded-2xl border border-[#9E8AA1]">
              <Link href={"/nft/" + stakedNft.data.objectId} className="relative">
              { stakedNft?.data?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value &&
               <span className="badge badge-success badge-lg absolute top-1 left-1 z-50">{stakedNft?.data?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value}</span>}
                <Image
                  width={300}
                  height={297}
                  className="w-full rounded-2xl "
                  src={stakedNft.data.display.data?.image_url?.replace("ipfs://", "https://ipfs.io/ipfs/") || stakedNft.data.display.data?.img_url.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  loader={() => stakedNft.data.display?.data?.image_url?.replace("ipfs://", "https://ipfs.io/ipfs/") || stakedNft.data.display.data?.img_url.replace("ipfs://", "https://ipfs.io/ipfs/")}
                />
                <button className="btn-sm btn absolute bottom-0 right-0 z-10">Sell</button>
              </Link>
              <div className="p-4">
                <h2 className="text-base font-bold text-white">
                  <Link href="">{stakedNft.data.display.data.name}</Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>);
  };

  const Listed = () => {
    if (!connected) return (<h3 className="mt-20 text-center text-base font-medium">
    Wallet Not connected </h3>);
    return (
      <div>
        <div className="mt-12 grid grid-cols-4 gap-8">
          {listedNfts?.map((listedNft, i) => (
            <div key={i} className="inline-block rounded-2xl border border-[#9E8AA1]">
              <div  className="relative">
              <Link href={"/nft/" + listedNft.nft_address}>
                <Image
                  width={300}
                  height={297}
                  className="w-full rounded-2xl"
                  src={listedNft.imageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/") || listedNft.imageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  loader={() => listedNft.imageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/") || listedNft.imageUrl?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                /> </Link>
                <button onClick={() => delistNFT(listedNft.nft_address,listedNft.coin,listedNft.type)} className="btn btn-connected absolute bottom-0 right-0 z-10">DeList</button>
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold text-white">
                  <Link href={"/nft/" + listedNft.nft_address}>{listedNft.name}</Link>
                </h2>
                <p className="mt-2 flex flex-row items-center justify-between">
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
                      {listedNft.price / 10**9} {listedNft.coin?.split("::")?.pop()}
                    </span>
                  </p>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>);
  };

  const Staked = () => {
    if (!connected) return (<h3 className="mt-20 text-center text-base font-medium">
      Wallet Not connected </h3>);
    return (
      <div>
        <div className="mt-12 grid grid-cols-4 gap-8">
          {staked?.map((stakedNft, i) => (
            <div key={i} className="inline-block rounded-2xl border border-[#9E8AA1]">
              <Link href={"/nft/" + stakedNft.data.objectId} className="relative">
              { stakedNft?.data?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value &&
               <span className="badge badge-success badge-lg absolute top-1 left-1 z-50">{stakedNft?.data?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value}</span>}
               
                <Image
                  width={300}
                  height={297}
                  className="w-full rounded-2xl  blur-[2px]"
                  src={stakedNft?.data?.display?.data?.image_url}
                  loader={() => stakedNft?.data?.display?.data?.image_url}
                />
                <Link href={"/staking"}>
                <button className="btn btn-connected absolute bottom-0 right-0 z-10">Unstake</button>
                </Link>
              </Link>
              <div className="p-4">
                <h2 className="text-base font-bold text-white">
                  <Link href={"/nft/" + stakedNft.data.objectId}>{stakedNft?.data?.display?.data?.name}</Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>);
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-bold">My Items</h1>
      <h3 className="mt-2 text-center text-base font-medium">
        Trade Nfts and Earn $HOMI token rewards
      </h3>
    <Tabs className="mt-12">
      <TabList className="tab-list">
        <Tab className="tab-title">On Wallet {nfts?.length==undefined?"(0)":"("+nfts?.length+")"}</Tab>
        <Tab className="tab-title">My Hominids {nfts?.filter(n=>n.data.content.type==SMART_CONTRACTS.NFT_TYPE)?.length==undefined?"(0)":"("+nfts?.filter(n=>n.data.content.type==SMART_CONTRACTS.NFT_TYPE)?.length+")"}</Tab>
        <Tab className="tab-title">Listed Items {listedNfts?.length==undefined?"(0)":"("+listedNfts?.length+")"}</Tab>
        <Tab className="tab-title">Staked Items {staked?.length==undefined?"(0)":"("+staked?.length+")"}</Tab>
        <Tab className="tab-title">History</Tab>
      </TabList>
      <div className="mt-12">
        <TabPanel className="">
          <Nfts />
        </TabPanel>
        <TabPanel className="">
          <Hominids />
        </TabPanel>
        <TabPanel className="">
          <Listed />
        </TabPanel>
        <TabPanel className="">
          <Staked />
        </TabPanel>
        <TabPanel>
         
        </TabPanel>
      </div>
    </Tabs>
    </div>
  );
}
