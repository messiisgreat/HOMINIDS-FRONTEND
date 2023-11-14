import React from 'react';
import { Pagination, NFTItemWithBuy,CollectionInfo } from '@components/common';
import { useState, useEffect } from "react";
import { useWallet } from '@suiet/wallet-kit';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { SMART_CONTRACTS, RPC } from '@constants/index';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { formatAddress } from '@services/frontend';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router'
import { TiDelete } from 'react-icons/ti';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { TransactionBlock } from "@mysten/sui.js";
import axios from 'axios';

export default function CollectionDetailPage() {
  const provider = new JsonRpcProvider(new Connection(RPC));
  const [nfts_objects, setNfts] = useState([]);
  const [history, setHistory] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [cardItem, setCardItem] = useState();
  const [totalCard, setTotalCard] = useState(0);
  const [stats, setStats] = useState();

  const { account:currentAccount, signAndExecuteTransactionBlock } = useWallet();

  const [filtersearch, setFilter] = useState('');
  const router = useRouter();
  const { id } = router.query;
  

  useEffect(() => {
    if (cardItem == undefined) return;
    if(cardItems.find(item=>item.id==cardItem.id)) return;
    cardItems.push(cardItem);
    setCardItems(cardItems);
    setTotalCard(totalCard+cardItem.price);
    setCardItem(undefined);
  }, [cardItem]);

  const filterItems = async (filter) => {
    let nftsOrdered;
    if (filter == 'Price low to high')
      nftsOrdered = [...nfts_objects].sort((a, b) => parseInt(a.price) - parseInt(b.price));
    else if (filter == 'Price high to low')
      nftsOrdered = [...nfts_objects].sort((b, a) => parseInt(a.price) - parseInt(b.price));
    else if (filter == 'Recently Listed')
      nftsOrdered = [...nfts_objects].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else if (filter == 'Ending Soon')
    nftsOrdered = [...nfts_objects].sort((a, b) => new Date(b.expires).getTime() - new Date(a.expires).getTime());
    setNfts(nftsOrdered);
  };

  const bulkBuy = async () => {
    //let address = wallet.account.address;
    if(!cardItems.length) return;
    const tx = new TransactionBlock();    
    cardItems.map(async (item)  => {
    let seletedCoinId;
    let coinToUse;
      if (item.currency == "0x2::sui::SUI") {
      coinToUse = tx.splitCoins(tx.gas, [tx.pure(item.price*10**9)]);
      tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_BUY_FUNCTION,
      typeArguments: [item.currency, item.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(SMART_CONTRACTS.LOCAL_ROYALTY_ID),
        tx.object(item.id),
        coinToUse
      ],
    });
      } else {
      let coins = await provider.getCoins({ owner: currentAccount?.address, coinType: item.currency  });
      coins?.data?.some((coin) => {
       if (parseInt(coin.balance) >= parseInt(item.price*10**9)) {
          //console.log(coin.balance, item.price*10**9, coin.coinObjectId);
          seletedCoinId = coin.coinObjectId;
          coinToUse = tx.splitCoins(tx.object(seletedCoinId), [tx.pure(item.price*10**9)]);
          //console.log(coin);
          return true;
        }
      });
      if (seletedCoinId == undefined) {
        let total = 0;
        let coinsTomerge = [];
        coins?.data?.some((coin) => {
          if (total >= parseInt(item.price*10**9)) return true;
          if (parseInt(coin.balance) > 0 && parseInt(coin.balance) < parseInt(item.price*10**9)) {
            //console.log(coin.balance, listing?.data?.content?.fields?.ask);
            coinsTomerge.push(tx.object(coin.coinObjectId));
            total += parseInt(coin.balance);
          }
        });
        if (coinsTomerge.length >= 2 && total >= parseInt(item.price*10**9)) {
          //console.log(total, item.price*10**9);
          //console.log(coinsTomerge[0], coinsTomerge.slice(1));
          tx.mergeCoins(coinsTomerge[0], coinsTomerge.slice(1));
          coinToUse = tx.splitCoins(coinsTomerge[0], [tx.pure(item.price*10**9)]);
        }
      }
      if (coinToUse == undefined) {
        toast.error("insufficient " + item.currency.split('::').pop() + " balance", {
          position: "top-center",
          autoClose: false,
          theme: "dark",
        });
        return;
      }
      tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_BUY_FUNCTION,
      typeArguments: [item.currency, item.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(SMART_CONTRACTS.LOCAL_ROYALTY_ID),
        tx.object(item.id),
        coinToUse
      ],
      });
      }
    });

    const toastId = toast.loading("executing transaction...", {
      position: "top-center",
      autoClose: false,
      theme: "dark",
    });

     signAndExecuteTransactionBlock({ transactionBlock: tx }).then(
      (res) => {
        toast.update(toastId, {
          render: "Congratulations! NFTs baught successfully",
          type: toast.TYPE.SUCCESS,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
        console.log(res);
      }
     )
      .catch(
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
          console.log(err);
        }
      );
  };

  const CartItem = ({info}) => {
    return(
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
      <span className="text-xs font-bold text-[#34cb55]">{info?.price} {info?.currency.split('::').pop()}</span>
      <button onClick={()=>{setTotalCard(totalCard-info.price);setCardItems(cardItems.filter(item=>item.id!=info.id))}} className="absolute -top-1 -right-1 z-10 text-2xl text-red-500">
        <TiDelete />
      </button>
    </h3>
    );
  };

  const SideCart = () => {
    return (
      <div className="sticky top-6 h-full w-1/4 shrink-0 grow-0 ">
        <div className="rounded-2xl border-2 border-[#9E8AA1] px-4 py-6">
          <h2 className="text-base font-bold">Cart</h2>
          <p className="mt-2 flex flex-row justify-between text-sm">
            {cardItems?.length} items <button onClick={()=>{setCardItems([]);setTotalCard(0);}} className="text-red-500">Clear All</button>
          </p>
          <div className="h-[200px] overflow-y-auto">

          {cardItems?.map((e,key)=>
             <CartItem key={key} info={{id:e.id,name:e.name,price:e.price,image:e.image,currency:e.currency}} />
          )}
          </div>
          <p className="mt-5 flex flex-row items-center justify-between px-3 text-base font-bold">
            Total <span className="text-xs font-bold text-[#34cb55]">{totalCard.toFixed(2)} SUI</span>
          </p>
          <button onClick={()=>bulkBuy()} className="btn mt-6 w-full">Buy Now</button>
          <p className="mt-4  text-gray">
            By clicking &ldquo;Buy now&ldquo;, you agree to Era-Homi Terms of Service
          </p>
          <p className="mt-2 text-xs text-gray">
            Each transaction will incure non-refundable gas fees.
          </p>
        </div>
      </div>
    );
  };

  const [collection, setCollection] = useState();
  useEffect(() => {
    if(router.isReady){
        loadCollections();
        loadListings();
        loadCollectionActivities();
        loadCollectionStats();
     }
  }, [router.isReady]);

  const loadCollections = () => {
     axios.get('/api/getcollection?address='+id).then((response)=>{console.log(response.data.result);setCollection(response.data.result[0])}).catch((e)=>{console.log(e);});
  }
  const loadListings = () => {
    axios.get('/api/market/listings?address='+id).then((response)=>{console.log(response.data.result);setNfts(response.data.result)}).catch((e)=>{console.log(e);});
  }

  const loadCollectionActivities = () => {
    axios.get('/api/activitycollection?address='+id).then((response)=>{console.log(response.data.result);setHistory(response.data.result)}).catch((e)=>{console.log(e);});
 }

 const loadCollectionStats = () => {
  axios.get('/api/collectionstats?address='+id).then((response)=>{console.log(response.data.result);setStats(response.data.result)}).catch((e)=>{console.log(e);});
 }

  const Badge = ({status}) =>{
    if(status=='Bought') return <span className="badge badge-success badge-outline badge-md">{status}</span>;
    if(status=='Listed') return <span className="badge badge-info badge-outline badge-md">{status}</span>;
    if(status=='Delisted') return <span className="badge badge-secondary badge-outline badge-md">{status}</span>;
    if(status=='Changed Price') return <span className="badge badge-ghost badge-outline badge-md">{status}</span>;
  }
 
  return (
    <div className="mt-12">
     <CollectionInfo collectionName={collection?.name} totalSupply={collection?.supply} listedItems={stats?.listings_count} floorPrice={stats?.floor_price/ 10 **9} totalVolume={stats?.total_volume/ 10 **9} collectionImage={collection?.logo} collectionDescription={collection?.description} />
      <Tabs className="mt-12">
        <TabList className="tab-list">
          <Tab className="tab-title">Explore</Tab>
          <Tab className="tab-title">Activity</Tab>
        </TabList>
        <div className="mt-12">
         
          <TabPanel className=""> 
          <div className="flex justify-between">
            <div className="">
              <span className="relative mx-auto block w-full max-w-md rounded-full border border-white py-1">
                <input
                  type="text"
                  placeholder="Search Items"
                  className="relative z-10 h-10 w-full rounded-full border-none bg-transparent px-6 align-top text-[18px]  outline-none"
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                />
                <button className="absolute top-3 right-4 z-20 text-2xl text-white">
                  <BsSearch />
                </button>
              </span>
            </div>

            <div className="">
              <select className="select max-w-[180px] bg-black"
                onChange={(e) => {
                  filterItems(e.target.value);
                }}>
                <option selected>Price low to high</option>
                <option >Price high to low</option>
                <option>Recently Listed</option>
                <option>Ending Soon</option>
              </select>
            </div>
          </div>
          <div className="mt-12 flex flex-row gap-2">
            <div className="">
             <div className={cardItems.length>0?"grid grid-cols-1 gap-8 sm:grid-cols-3":"grid grid-cols-1 gap-8 sm:grid-cols-4"}>
              {nfts_objects.filter(nft=>nft.name.toLowerCase().includes(filtersearch) || filtersearch=='').map((nft) => (
                <NFTItemWithBuy setCardItem={setCardItem}
                key={nft.nft_address} 
                id={nft.nft_address}
                nftname={nft.name} 
                nftimage={nft.imageUrl}
                nftprice={nft.price / 10**9}
                currency={nft.coin}
                type={nft.type}
                expires={nft.expires}
                selected={cardItems.some((item)=>item.id == nft.nft_address)}
                />
              ))}
             </div>
            </div>
            {cardItems.length>0?<SideCart/>:null}
          </div>
            <Pagination loadNFTs={undefined} pageCount={1} />
          </TabPanel>
          <TabPanel>
            {history == undefined ? (<div className="w-full drop-shadow-md rounded-lg">
              <div className="p-3 space-y-4">
                <div className="flex space-x-4">
                  <div className="animate-pulse w-48 h-[50px] bg-sky-200"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="animate-pulse w-48 h-[50px] bg-sky-200"></div>
                </div>
              </div>
            </div>) : 

            (<div className="overflow-x-auto w-full mt-12">
            <table className="table w-full table-compact" data-theme="black">
              <thead>
                <tr>
                  <th>
                   ID
                  </th>
                  <th>NFT</th>
                  <th>Activity</th>
                  <th>Price</th>
                  <th>User</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
            {history?.map((element, i) =>
            (<tr key={i}>
              <th>
                <label>
                <div className="font-bold">{i+1}</div>
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={element.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                  <Link href={/nft/+element.nft_address} className="gradient-text text-sm font-medium">
                    <span className="font-bold">{element.name}</span></Link>
                    <div className="text-sm opacity-50">
                    <Link href={/nft/+element.nft_address} className="gradient-text text-sm font-medium">
                    {formatAddress(element.nft_address)}</Link>
                      </div>
                  </div>
                </div>
              </td>
              <td>
                <Badge status={element.type}/>
              </td>
              <td>{element.price && element.price/ 10 ** 9 +' '+element.coin.split('::').pop()}</td>
              <th>
              <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-6 h-6">
                      <img src="/assets/images/profile.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                  <div className="font-bold">{formatAddress(element.user_address)}</div>
                  </div>
                </div>
              </th>
              <td>{new Date(element?.created_at).toLocaleString()}</td>
            </tr>)
            )}
             </tbody>
            </table>
            </div>)

            }
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}


/*
const loadNFTs = async () => {

    let dfos = await provider.getDynamicFields({
      parentId: SMART_CONTRACTS.LOCAL_MARKETPLACE_ID, options: { showDisplay: true, showContent: true, showType:true }
      //,limit:9,cursor: cursors[page]
    }
    ).catch((e) => {
      console.log('not Events!', e);
    });

    let listings_addresses = [];
    let nfts_addresses = [];
    dfos?.data?.map((listing) => {
       listings_addresses.push(listing.objectId);
       nfts_addresses.push(listing.name.value);
    });

    const listings = await provider.multiGetObjects({ ids: listings_addresses, options: { showDisplay: true, showContent: true } });

    const nfts = await provider.multiGetObjects({ ids: nfts_addresses, options: { showDisplay: true, showContent: true } });

    
    nfts.map((e, i) => {
      e.data.content.fields.currency = dfos?.data[i]?.objectType?.split(',')[0]?.split('<').pop();
      e.data.content.fields.price = listings[i].data.content.fields.ask;
      e.data.content.fields.bid_amount = listings[i].data.content.fields.bid_amount;
      e.data.content.fields.expires = listings[i].data.content.fields.expires;
    });

    const nftsOrdered = [...nfts].sort((a, b) => parseInt(a.data.content.fields.price) - parseInt(b.data.content.fields.price));

    setNfts(nftsOrdered);
    if(dfos.hasNextPage){
        setCursors(cursors.concat(dfos.nextCursor));
        console.log(cursors);
    }
    console.log(nftsOrdered)

    loadHistory();
  };
*/