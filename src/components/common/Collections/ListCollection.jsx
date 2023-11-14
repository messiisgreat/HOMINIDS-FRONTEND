import React from 'react';
import { Pagination, NFTItemWithBuy } from '@components/common';
import { useState, useEffect } from "react";
import { useWallet } from '@suiet/wallet-kit';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { SMART_CONTRACTS, RPC } from '@constants/index';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { IoTrendingUpOutline, IoReorderThreeOutline, IoPricetagOutline, } from 'react-icons/io5';
import { formatAddress } from '@services/frontend';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';

export default function ListCollection() {

  const provider = new JsonRpcProvider(new Connection(RPC));
  const [nfts_objects, setNfts] = useState([]);
  const { account: currentAccount } = useWallet();
  const [cursors, setCursors] = useState([null]);
  const [history, setHistory] = useState([]);
  const [filtersearch, setFilter] = useState('');

  const loadNFTs = async () => {

    let dfos = await provider.getDynamicFields({
      parentId: SMART_CONTRACTS.MARKETPLACE_ID, options: { showDisplay: true, showContent: true }/*,limit:9,cursor: cursors[page]*/
    }
    ).catch((e) => {
      console.log('not Events!', e);
    });

    const dfos2 = await provider.getDynamicFields({
      parentId: SMART_CONTRACTS.BLAT_MARKETPLACE_ID, options: { showOwner: true, showDisplay: true, showContent: true }/*,limit:9,cursor: cursors[page]*/
    }).catch((e) => { console.log('not Events!', e); });
    
    if(dfos != undefined)
      dfos?.data.push.apply(dfos?.data, dfos2?.data.map(e=>{e.name.currency='BLAT';return e;}));
    else
      dfos = dfos2;

    let listings_addresses = [];
    let nfts_addresses = [];
    dfos?.data?.map((listing) => {
      listings_addresses.push(listing.objectId);
      nfts_addresses.push(listing.name.value);
    });

    const listings = await provider.multiGetObjects({ ids: listings_addresses, options: { showDisplay: true, showContent: true } });
    const nfts = await provider.multiGetObjects({ ids: nfts_addresses, options: { showDisplay: true, showContent: true } });

    nfts.map((e, i) => {
      e.data.content.fields.currency = dfos?.data[i].name.currency;
      e.data.content.fields.price = listings[i].data.content.fields.ask;
    });

    const nftsOrdered = [...nfts].sort((a, b) => parseInt(a.data.content.fields.price) - parseInt(b.data.content.fields.price));

    setNfts(nftsOrdered);
    /*if(dfos.hasNextPage){
        setCursors(cursors.concat(dfos.nextCursor));
        console.log(cursors);
    }*/
    //console.log(res)

    loadHistory();
  };

  useEffect(() => {
    //if (currentAccount?.address?.toString() === undefined) return;
    loadNFTs(0);
  }, [currentAccount]);

  //,MoveEventField:{path:'item_id',value:id} 
  const loadHistory = async () => {
    const res = await provider.queryEvents({
      query: {
        MoveModule: {
          package: SMART_CONTRACTS.MARKETPLACE_CONTRACT,
          module: 'marketplace'
        }
      }, limit: 20
    }
    ).catch((e) => {
      console.log('not Events!', e);
      setCursors([null]);
    });
    console.log(res?.data);
    setHistory(res?.data);
  };

  const filterItems = async (filter) => {
    let nftsOrdered;
    if (filter == 'Price low to high')
      nftsOrdered = [...nfts_objects].sort((a, b) => parseInt(a.data.content.fields.price) - parseInt(b.data.content.fields.price));
    else if (filter == 'Price high to low')
      nftsOrdered = [...nfts_objects].sort((b, a) => parseInt(a.data.content.fields.price) - parseInt(b.data.content.fields.price));
    else if (filter == 'Rarity')
      nftsOrdered = [...nfts_objects].sort((a, b) => a.data.content.fields.rarity > b.data.content.fields.rarity ? 1 : -1);
    setNfts(nftsOrdered);
  };

  return (
    <>
      <Tabs className="mt-24">
        <TabList className="tab-list">
          <Tab className="tab-title">Marketplace</Tab>
          <Tab className="tab-title">Activity</Tab>
        </TabList>
        <div className="mt-12">
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
                <option>Rarity</option>
              </select>
            </div>
          </div>
          <TabPanel className=""> 
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {nfts_objects.filter(nft=>nft.data.content.fields.name.includes(filtersearch) || filtersearch=='').map((collection) => (
                <NFTItemWithBuy key={collection.data.objectId} id={collection.data.objectId} nftname={collection.data.content.fields.name} nftimage={collection.data.content.fields.rarity}  
                nftprice={collection.data.content.fields.price / (collection.data.content.fields.currency==undefined?SMART_CONTRACTS.HOMI_DECIMAL:SMART_CONTRACTS.BLAT_DECIMAL)
                +" "+(collection.data.content.fields.currency==undefined?'$HOMI':'$BLAT')} />
              ))
              }
            </div>
            <Pagination loadNFTs={loadNFTs} pageCount={cursors.length} />
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
            </div>) : history?.map((element, i) =>
            (<div key={i} className="mt-3 flex flex-row justify-between rounded-2xl bg-[#030303] px-6 py-5">
              <div className="flex flex-row items-center gap-3">
                {element?.type?.toString()?.split('::')[2]?.split('Event')[0] == 'Listing' ? (<IoReorderThreeOutline className="text-2xl text-secondary" />) : (element?.type?.toString()?.split('::')[2]?.split('Event')[0] == 'Buy' ? (<IoPricetagOutline className="text-2xl text-secondary" />) : (<IoTrendingUpOutline className="text-2xl text-secondary" />))}
                <div>
                  <p className="text-sm font-medium">
                    {element?.type?.toString()?.split('::')[2]?.split('Event')[0] == 'Listing'
                      ? 'Listed by ' + formatAddress(element?.parsedJson?.seller) + ' for ' :
                      (element?.type?.toString()?.split('::')[2]?.split('Event')[0] == 'Buy' ?
                        'Sold by ' + formatAddress(element?.parsedJson?.buyer) + ' for ' :
                        (element?.type?.toString()?.split('::')[2]?.split('Event')[0] == 'ChangePrice' ?
                          'Price changed by ' + formatAddress(element?.parsedJson?.seller) + ' to ' :
                          'Delisted by ' + formatAddress(element?.parsedJson?.seller)))
                    }
                    {element?.parsedJson?.amount != undefined ? element?.parsedJson?.amount / 10 ** 9 + '  $Homi' : ''}</p>
                  <p className="mt-1 text-xs text-gray">{new Date(parseInt(element?.timestampMs)).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-sm text-secondary">
                <Link href={"/nft/" + element?.parsedJson?.item_id} className="gradient-text text-sm font-medium">
                  {formatAddress(element?.parsedJson?.item_id)}
                </Link>
              </p>
            </div>)
            )}
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
}
