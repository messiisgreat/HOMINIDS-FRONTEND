import React from 'react';
import { formatAddress } from '@services/frontend';
import Image from 'next/image';
import Link from 'next/link';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useRouter } from 'next/router'
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { useState, useEffect } from "react";
import { SMART_CONTRACTS, RPC } from '@constants/index';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from "@mysten/sui.js";
import { IoPersonSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { CountdownItem } from '@components/common';
import axios from 'axios';
import moment from 'moment';

export default function NFTDetail() {
  const router = useRouter();
  const { id } = router.query;
  const provider = new JsonRpcProvider(new Connection(RPC));
  const [nft, setNft] = useState();
  const [listing, setListing] = useState();
  const [owner, setOwner] = useState();
  const {account,signTransactionBlock } = useWallet();
  const [events, setEvents] = useState([]);
  const [offers, setOffers] = useState();
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [openedOffer, setOpenOffer] = useState(false);
  const [openedAuction, setOpenedAuction] = useState(false);
  const [openedBid, setOpenedBid] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [price, setPrice] = useState();
  const [minBidIncrement, setminBidIncrement] = useState();
  const [starts, setStarts] = useState();
  const [expires, setExpires] = useState();
  const [selectedcurrency, setSelectedCurrency] = useState('SUI');
  const [collection, setCollection] = useState();

  const handleChange = event => {
    setPrice(event.target.value);
  };

  const loadNFT = async () => {
    setListing(undefined); setNft(undefined); setOwner(undefined);
    let listing = await provider.getDynamicFieldObject({
      parentId: SMART_CONTRACTS.LOCAL_MARKETPLACE_ID, name:
      {
        type: "0x2::object::ID",
        value: id
      }
    }
    ).catch((e) => console.log(e));

    console.log(listing);
    if (listing?.data?.content != undefined) {
        if(listing?.data?.content?.fields?.offers != undefined){
        let pureOffers = []
        let i = 0;
        while(i<parseInt(listing?.data?.content?.fields?.offers)) {
          let offer = await provider.getDynamicFieldObject({
            parentId: listing?.data?.objectId, name:
            {
              type: "u64",
              value: i.toString()
            }
          }
          ).catch((e) => console.log(e));
          if(offer!= undefined && offer?.data != undefined)
            pureOffers.push({ coinType: offer?.data?.content?.fields?.paid?.type, offerer: offer?.data?.content?.fields?.offerer, id: i, amount: offer?.data?.content?.fields?.paid?.fields?.balance })
          i = i + 1;
        }
         setOffers(pureOffers);
        }else{
          setIsAuction(true);
          setPrice((parseInt(listing?.data?.content?.fields?.bid_amount)+parseInt(listing?.data?.content?.fields?.min_bid_increment)) / 10 ** 9);
        }
        setSelectedCurrency(listing?.data?.type?.split(',')[0]?.split('::').pop());
    }else{
      setOffers([]);
    }

    const object = await provider.getObject({
      id: id, options: { showDisplay: true, showContent: true, showOwner: true, showType: true }
    }).catch((e) => e);

    
    setListing(listing);
    setNft(object?.data);
    setOwner(object?.data?.owner?.AddressOwner);
    loadNFTActivities();
    //setEvents([])
  };

  const listNFT = async () => {    
    if (price == undefined) return;
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_LIST_FUNCTION,
      typeArguments: [SMART_CONTRACTS.COINS[selectedcurrency], nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
        tx.pure(price * 10 ** 9)
      ],
    });

    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
        (res) => {
          console.log(res);
          loadNFT();
          setOpened(false);
          toast.update(toastId, {
            render: "NFT Listed for " + price + " $" + selectedcurrency + " successfully",
            type: toast.TYPE.SUCCESS,
            progress: undefined,
            hideProgressBar: true,
            autoClose: 5000,
            pauseOnFocusLoss: true,
            closeOnClick: true,
            isLoading: false
          });

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
          console.log(err);
        }
      );
    })
  };

  const buyNFT = async () => {
    //let address = wallet.account.address;
    console.log(listing?.data?.type?.split(',')[0]?.split('<').pop());
    const tx = new TransactionBlock();
    let seletedCoinId;
    let coinToUse;
    //console.log(listing?.data?.type?.split(',')[0]?.split('<').pop());
    if (listing?.data?.type?.split(',')[0]?.split('<').pop() == "0x2::sui::SUI") {
      coinToUse = tx.splitCoins(tx.gas, [tx.pure(listing?.data?.content?.fields?.ask)]);
    } else {
      let coins = await provider.getCoins({ owner: account?.address, coinType: listing?.data?.type?.split(',')[0]?.split('<').pop() });
      coins?.data?.some((coin) => {
        if (parseInt(coin.balance) >= parseInt(listing?.data?.content?.fields?.ask)) {
          console.log(coin.balance, listing?.data?.content?.fields?.ask, coin.coinObjectId);
          seletedCoinId = coin.coinObjectId;
          coinToUse = tx.splitCoins(tx.object(seletedCoinId), [tx.pure(listing?.data?.content?.fields?.ask)]);
          console.log(coin);
          return true;
        }
      });
      if (seletedCoinId == undefined) {
        let total = 0;
        let coinsTomerge = [];
        coins?.data?.some((coin) => {
          if (total >= parseInt(listing?.data?.content?.fields?.ask)) return true;
          if (parseInt(coin.balance) > 0 && parseInt(coin.balance) < parseInt(listing?.data?.content?.fields?.ask)) {
            //console.log(coin.balance, listing?.data?.content?.fields?.ask);
            coinsTomerge.push(tx.object(coin.coinObjectId));
            total += parseInt(coin.balance);
          }
        });
        if (coinsTomerge.length >= 2 && total >= parseInt(listing?.data?.content?.fields?.ask)) {
          console.log(total, listing?.data?.content?.fields?.ask);
          console.log(coinsTomerge[0], coinsTomerge.slice(1));
          tx.mergeCoins(coinsTomerge[0], coinsTomerge.slice(1));
          coinToUse = tx.splitCoins(coinsTomerge[0], [tx.pure(listing?.data?.content?.fields?.ask)]);
        }
      }
      if (coinToUse == undefined) {
        toast.error("insufficient " + selectedcurrency + " balance", {
          position: "top-center",
          autoClose: false,
          theme: "dark",
        });
        return
      }
    }
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_BUY_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(SMART_CONTRACTS.LOCAL_ROYALTY_ID),
        tx.object(id),
        coinToUse
      ],
    });

    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
        (res) => {
        toast.update(toastId, {
          render: "Congratulations! NFT baught successfully",
          type: toast.TYPE.SUCCESS,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
        console.log(res);
        loadNFT();
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
          console.log(err);
        }
      );
    })
  };

  const delistNFT = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_DELIST_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
      ],
    });

    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
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
          loadNFT();
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
          console.log(err);
        }
      );
    })
  };

  const changePrice = async () => {
    //let address = wallet.account.address;
    if (price == undefined) return;
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_CHANGE_PRICE_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
        tx.pure(price * 10 ** 9)
      ],
    });

    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
        (res) => {
          console.log(res)
          toast.update(toastId, {
            render: "Price changed successfully",
            type: toast.TYPE.SUCCESS,
            progress: undefined,
            hideProgressBar: true,
            autoClose: 5000,
            pauseOnFocusLoss: true,
            closeOnClick: true,
            isLoading: false
          });
          loadNFT();
          setOpened2(false);
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
          console.log(err);
        }
      );
    })
  };

  const makeOffer = async () => {
    //let address = wallet.account.address;
    const tx = new TransactionBlock();
    let seletedCoinId;
    let coinToUse;
    console.log(listing?.data?.type?.split(',')[0]?.split('<').pop());
    if (listing?.data?.type?.split(',')[0]?.split('<').pop() == "0x2::sui::SUI") {
      coinToUse = tx.splitCoins(tx.gas, [tx.pure(price * 10 ** 9)]);
    } else {
      let coins = await provider.getCoins({ owner: account?.address, coinType: listing?.data?.type?.split(',')[0]?.split('<').pop() });
      coins?.data?.some((coin) => {
        if (parseInt(coin.balance) >= price) {
          console.log(coin.balance, price, coin.coinObjectId);
          seletedCoinId = coin.coinObjectId;
          coinToUse = tx.splitCoins(tx.object(seletedCoinId), [tx.pure(price * 10 ** 9)]);
          console.log(coin);
          return true;
        }
      });
      if (seletedCoinId == undefined) {
        let total = 0;
        let coinsTomerge = [];
        coins?.data?.some((coin) => {
          if (total >= parseInt(price * 10 ** 9)) return true;
          if (parseInt(coin.balance) > 0 && parseInt(coin.balance) < price * 10 ** 9) {
            //console.log(coin.balance, listing?.data?.content?.fields?.ask);
            coinsTomerge.push(tx.object(coin.coinObjectId));
            total += parseInt(coin.balance);
          }
        });
        if (coinsTomerge.length >= 2 && total >= parseInt(price * 10 ** 9)) {
          console.log(total, price);
          console.log(coinsTomerge[0], coinsTomerge.slice(1));
          tx.mergeCoins(coinsTomerge[0], coinsTomerge.slice(1));
          coinToUse = tx.splitCoins(coinsTomerge[0], [tx.pure(price * 10 ** 9)]);
        }
      }
      if (coinToUse == undefined) {
        toast.error("insufficient " + selectedcurrency + " balance", {
          position: "top-center",
          autoClose: false,
          theme: "dark",
        });
        return
      }
    }


    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_MAKE_OFFER_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
        coinToUse
      ],
    });
    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
        (res) => {
          toast.update(toastId, {
            render: "Offer placed successfully",
            type: toast.TYPE.SUCCESS,
            progress: undefined,
            hideProgressBar: true,
            autoClose: 5000,
            pauseOnFocusLoss: true,
            closeOnClick: true,
            isLoading: false
          });
          console.log(res);
          setOpenOffer(false);
          loadNFT();
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
          console.log(err);
        }
      );
    })

  };

  const acceptOffer = async (offer) => {
    console.log(offer);
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_ACCEPT_OFFER_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(SMART_CONTRACTS.LOCAL_ROYALTY_ID),
        tx.object(id),
        tx.pure(offer.id)
      ],
    });
    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
      (res) => {
        console.log(res);
        loadNFT();
        setOpened(false);
        toast.update(toastId, {
          render: "Offer accepted successfully",
          type: toast.TYPE.SUCCESS,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
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
      );})
  };

  const removeOffer = async (offer) => {
 
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_REMOVE_OFFER_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
        tx.pure(offer.id)
      ],
    });
    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
      (res) => {
        console.log(res);
        loadNFT();
        setOpened(false);
        toast.update(toastId, {
          render: "Offer removed successfully",
          type: toast.TYPE.SUCCESS,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
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
      );})
  };

  const listNFTAuction = async () => {
    if (price == undefined || expires == undefined) return;
   
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_AUCTION_LIST_FUNCTION,
      typeArguments: [SMART_CONTRACTS.COINS[selectedcurrency], nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
        tx.pure(price * 10 ** 9),
        tx.pure(minBidIncrement * 10 ** 9),
        tx.pure(starts != undefined ? new Date(starts).getTime(): 0),
        tx.pure(new Date(expires).getTime()),
      ],
    });
    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
      (res) => {
        console.log(res);
        loadNFT();
        setOpenedAuction(false);
        toast.update(toastId, {
          render: "NFT Auction started for" + price + " $" + selectedcurrency + " successfully",
          type: toast.TYPE.SUCCESS,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
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
      );})
  };

  const endAuction = async () => {
   
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_AUCTION_END_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(SMART_CONTRACTS.LOCAL_ROYALTY_ID),
        tx.object(id),
      ],
    });
    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
      (res) => {
        console.log(res);
        loadNFT();
        setOpened(false);
        toast.update(toastId, {
          render: "NFT auction ended successfully",
          type: toast.TYPE.SUCCESS,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
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
      );})
  };

  const bid = async () => {
    if (price == undefined) return;
    const tx = new TransactionBlock();
    let seletedCoinId;
    let coinToUse;
    console.log(listing?.data?.type?.split(',')[0]?.split('<').pop());
    if (listing?.data?.type?.split(',')[0]?.split('<').pop() == "0x2::sui::SUI") {
      coinToUse = tx.splitCoins(tx.gas, [tx.pure(price*10**9)]);
    } else {
      let coins = await provider.getCoins({ owner: account?.address, coinType: listing?.data?.type?.split(',')[0]?.split('<').pop() });
      coins?.data?.some((coin) => {
        //console.log(parseInt(coin.balance) , price*10**9)
        if (parseInt(coin.balance) >= parseInt(price*10**9)) {
          console.log(coin.balance, price*10**9, coin.coinObjectId);
          seletedCoinId = coin.coinObjectId;
          coinToUse = tx.splitCoins(tx.object(seletedCoinId), [tx.pure(price*10**9)]);
          console.log(coin);
          return true;
        }
      });
      if (seletedCoinId == undefined) {
        let total = 0;
        let coinsTomerge = [];
        coins?.data?.some((coin) => {
          if (total >= parseInt(price*10**9)) return true;
          if (parseInt(coin.balance) > 0 && parseInt(coin.balance) < parseInt(price*10**9)) {
            //console.log(coin.balance, listing?.data?.content?.fields?.ask);
            coinsTomerge.push(tx.object(coin.coinObjectId));
            total += parseInt(coin.balance);
          }
        });
        if (coinsTomerge.length >= 2 && total >= parseInt(price*10**9)) {
          console.log(total, price*10**9);
          console.log(coinsTomerge[0], coinsTomerge.slice(1));
          tx.mergeCoins(coinsTomerge[0], coinsTomerge.slice(1));
          coinToUse = tx.splitCoins(coinsTomerge[0], [tx.pure(price*10**9)]);
        }
      }
      if (coinToUse == undefined) {
        toast.error("insufficient " + selectedcurrency + " balance", {
          position: "top-center",
          autoClose: false,
          theme: "dark",
        });
        return
      }
    }
   
    tx.moveCall({
      target: SMART_CONTRACTS.LOCAL_AUCTION_BID_FUNCTION,
      typeArguments: [listing?.data?.type?.split(',')[0]?.split('<').pop(), nft?.type],
      arguments: [
        tx.object(SMART_CONTRACTS.LOCAL_MARKETPLACE_ID),
        tx.object(id),
        coinToUse,
        tx.object(SMART_CONTRACTS.CLOCK_ADDRESS)
      ],
    });
    signTransactionBlock({ transactionBlock: tx }).then(e=>{
      const toastId = toast.loading("executing transaction...", {
        position: "top-center",
        autoClose: false,
        theme: "dark",
      });
      provider.executeTransactionBlock({ transactionBlock: e.transactionBlockBytes,signature:e.signature })
      .then(
      (res) => {
        console.log(res);
        loadNFT();
        setOpenedBid(false);
        toast.update(toastId, {
          render: "Bid placed successfully",
          type: toast.TYPE.SUCCESS,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false
        });
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
      );})
  };

  useEffect(() => {
    if (id == undefined) return;
    loadNFT();
  }, [id, account]);

  useEffect(() => {
    if (nft?.type?.split('::')[0] == undefined) return;
    console.log(nft?.type?.split('::')[0]);
    loadCollections();
  }, [nft]);

  const loadNFTActivities = () => {
    axios.get('/api/activitynft?address='+id).then((response)=>{console.log(response.data.result);setEvents(response.data.result)}).catch((e)=>{console.log(e);});
  }

  const Badge = ({status}) =>{
  if(status=='Bought') return <span className="badge badge-success badge-outline badge-md">{status}</span>;
  if(status=='Listed') return <span className="badge badge-info badge-outline badge-md">{status}</span>;
  if(status=='Delisted') return <span className="badge badge-secondary badge-outline badge-md">{status}</span>;
  if(status=='Changed Price') return <span className="badge badge-ghost badge-outline badge-md">{status}</span>;

  }

  const loadCollections = () => {
    axios.get('/api/getcollection?address='+nft?.type?.split('::')[0]).then((response)=>{console.log(response.data.result);setCollection(response.data.result[0])}).catch((e)=>{console.log(e);});
  }

  return (
    <div className="flex flex-col sm:flex-row gap-16">
      <div>
        {nft?.display.data.image_url == undefined ? <div className="w-full drop-shadow-md rounded-lg">
          <div className="p-3 space-y-4">
            <div className="animate-pulse w-full h-[450px] w-[450px] bg-slate-200"></div>
            <div className="flex space-x-4">
              <div className="animate-pulse w-1/3 h-3 bg-sky-200"></div>
            </div>
          </div>
        </div>
          :
          <div className="relative">
            { nft?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value &&
            <span className="badge badge-success badge-lg absolute top-1 left-1 z-50">{nft?.content?.fields?.atributes?.fields?.map?.fields?.contents[0]?.fields?.value}</span>}
            { nft?.content?.fields?.rarity &&
               <span className="badge badge-success badge-lg absolute top-1 left-1 z-50">{nft?.content?.fields?.rarity}</span>}
            <Image
            src={nft?.display.data.image_url.replace("ipfs://", "https://ipfs.io/ipfs/")}
            loader={() => nft?.display.data.image_url.replace("ipfs://", "https://ipfs.io/ipfs/")}
            height={516}
            width={460}
            alt=""
            className="rounded-2xl"
          /></div>}
        <h1 className="text-3xl mt-5 font-bold visible sm:invisible">{nft?.display.data.name}</h1>

        <p className="mt-8 text-[18px] font-medium">Details</p>
        <p className="mt-5 flex flex-row items-center justify-between rounded-2xl bg-[#030303] p-4 text-xs text-gray">
          Owner
          <span className="text-sm font-bold text-secondary">
                <Link href={"/nft/" + id}>{formatAddress(listing?.data?.content?.fields?.owner != undefined ? listing?.data?.content?.fields?.owner : owner)}</Link>
              </span>
        </p>
        <p className="mt-5 flex flex-row items-center justify-between rounded-2xl bg-[#030303] p-4 text-xs text-gray">
          Nft Address{' '}
          <span className="text-sm font-bold text-secondary">
            {formatAddress(id)}
          </span>
        </p>
        <p className="mt-5 flex flex-row items-center justify-between rounded-2xl bg-[#030303] p-4 text-xs text-gray">
          Royalties Fee ($HOMI)
          <span className="text-sm font-bold text-secondary">0%</span>
        </p>
        <p className="mt-5 flex flex-row items-center justify-between rounded-2xl bg-[#030303] p-4 text-xs text-gray">
          Listing/Bidding/Cancel
          <span className="text-sm font-bold text-secondary">Free</span>
        </p>
      </div>
      <div>
        {nft?.display?.data?.name == undefined ? <div className="w-full drop-shadow-md rounded-lg">
          <div className="p-3 space-y-4">
            <div className="flex space-x-4">
              <div className="animate-pulse w-2/3 h-6 bg-sky-200"></div>
            </div>
          </div>
        </div> : <h1 className="text-3xl font-bold invisible sm:visible">{nft?.display?.data?.name || formatAddress(nft?.data?.objectId)}</h1>}
        <div className="mt-4 flex flex-row items-center gap-2">
          {collection?.logo !=undefined ? <Link href={"/collection/"+collection?.collection_address}>
            <Image
              src={collection?.logo}
              loader={() => collection?.logo}
              alt="Colection"
              height={35}
              width={35}
              className="rounded-full"
            />
          </Link>:null}
          {nft?.display.data.name == undefined ? <div className="w-full drop-shadow-md rounded-lg">
            <div className="p-3 space-y-4">
              <div className="flex space-x-4">
                <div className="animate-pulse w-2/3 h-6 bg-sky-200"></div>
              </div>
            </div>
          </div> :
            <div>
              <h2 className="text-[18px] font-bold">
                <Link href={"/nft/" + id}>{collection?.name}</Link>
              </h2>
              <p className="text-sm text-gray">Creator</p>
            </div>}
        </div>

        {listing?.data != undefined ? (<div><p className="mt-10 text-sm text-gray">Current Price</p>
          <div className="mt-2 flex flex-row items-center gap-2 rounded-xl border border-secondary py-2 px-4">
            <span className="text-3xl font-bold text-secondary">{!isAuction ? listing?.data?.content?.fields?.ask / 10 ** 9 : listing?.data?.content?.fields?.bid_amount / 10 ** 9} {selectedcurrency}</span>
            <span className="text-base text-gray"></span>
          </div>
          {isAuction && new Date().getTime()<parseInt(listing?.data?.content?.fields?.starts) ? (<div><p className="mt-2 text-sm text-gray">Starts In</p>
          <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl border border-secondary py-2 px-4">
            <span className="text-3xl font-bold"><CountdownItem time={new Date(parseInt(listing?.data?.content?.fields?.starts))} /></span>
            <span className="text-base text-gray"></span>
          </div></div>): null}
          {isAuction && new Date().getTime()>parseInt(listing?.data?.content?.fields?.starts) ? (<div><p className="mt-2 text-sm text-gray">Ends In</p>
          <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl border border-secondary py-2 px-4">
            <span className="text-3xl font-bold"><CountdownItem time={new Date(parseInt(listing?.data?.content?.fields?.expires))} /></span>
            <span className="text-base text-gray"></span>
          </div></div>): null}
        </div>) : null}

        {!isAuction ? <div className="mt-4 flex flex-row items-center gap-2">
          {account?.address != owner && listing?.data != undefined && listing?.data?.content?.fields?.owner != account?.address ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
            <button onClick={() => buyNFT()} className="btn-md btn  bottom-0 right-0 z-10">Buy Now</button>
          </div> : null}
          {account?.address != owner && listing?.data != undefined && listing?.data?.content?.fields?.owner != account?.address ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
            <button onClick={() => setOpenOffer(true)} className="btn-md btn  bottom-0 right-0 z-10">Make Offer</button>
          </div> : null}
        </div>: <div className="mt-4 flex flex-row items-center gap-2">
          {account?.address != owner && listing != undefined && listing?.data?.content?.fields?.owner != account?.address ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
            <button onClick={() => setOpenedBid(true)} className="btn-md btn  bottom-0 right-0 z-10">Bid</button>
          </div> : null}
        </div>}

        {!isAuction ? (<div className="mt-4 flex flex-row items-center gap-2">
          {listing?.data != undefined && listing?.data?.content?.fields?.owner == account?.address ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
            <button onClick={() => delistNFT()} className="btn-md btn btn-connected bottom-0 right-0 z-10">Delist</button>
          </div> : null}
          {listing?.data != undefined && listing?.data?.content?.fields?.owner == account?.address ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
            <button onClick={() => setOpened2(true)} className="btn-md btn btn-connected  bottom-0 right-0 z-10">Edit Price</button>
          </div> : null}
        </div>) : <div className="mt-4 flex flex-row items-center gap-2">
          {listing?.data != undefined && listing?.data?.content?.fields?.owner == account?.address ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
            <button onClick={() => endAuction()} className="btn-md btn btn-connected  bottom-0 right-0 z-10">End Auction</button>
          </div> : null}
        </div>}

        <div className="mt-4 flex flex-row items-center gap-4">
        {account?.address != undefined && account?.address == owner ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
          <button onClick={() => setOpened(true)} className="btn-md btn  bottom-0 right-0 z-10">List</button>
        </div> : null}
        {account?.address != undefined && account?.address == owner ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
          <button onClick={() => setOpenedAuction(true)} className="btn-md btn  bottom-0 right-0 z-10">Start Auction</button>
        </div> : null}
        </div>
      
        <Tabs className="mt-10" >
          <TabList className="tab-list">
            <Tab className="tab-title">Offers</Tab>
            <Tab className="tab-title">History</Tab>
          </TabList>
          <TabPanel>
            {offers == undefined && !isAuction ? (<div className="w-full drop-shadow-md rounded-lg">
              <div className="p-3 space-y-4">
                <div className="flex space-x-4">
                  <div className="animate-pulse w-48 h-[50px] bg-sky-200"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="animate-pulse w-48 h-[50px] bg-sky-200"></div>
                </div>
              </div>
            </div>) : offers?.map((element, i) =>
            (<div key={i} className="mt-3 flex flex-row justify-between rounded-2xl bg-[#030303] px-6 py-5">
              <div className="flex flex-row items-center gap-3">
                <IoPersonSharp className="text-2xl text-secondary" />
                <div>
                  <p className="text-sm font-medium">{element.amount / 10 ** 9} SUI</p>
                  <p className="mt-1 text-xs text-gray">{formatAddress(element.offerer)}</p>
                </div>
                {element.offerer == account?.address ?
                  <button onClick={() => removeOffer(element)} className="btn-sm btn btn-connected right-0 z-10">Remove Offer</button>
                  : null}

                {listing != undefined && listing?.data?.content?.fields?.owner == account?.address ? <div className="mt-2 flex max-w-xl flex-row items-center gap-2 rounded-xl  py-2 ">
                  <button onClick={() => acceptOffer(element)} className="btn-sm btn  bottom-0 right-0 z-10">Accept Offer</button>
                </div> : null}

              </div>
              <p className="text-sm text-secondary">
              </p>
            </div>)
            )}
          </TabPanel>
          <TabPanel>
            {
            (<div className="overflow-x-auto w-full mt-12">
            <table className="table w-full table-compact" data-theme="black">
              <thead>
                <tr>
                  <th>
                   ID
                  </th>
                  <th>Activity</th>
                  <th>Price</th>
                  <th>User</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
            {events?.map((element, i) =>
            (<tr key={i}>
              <th>
                <label>
                <div className="font-bold">{i+1}</div>
                </label>
              </th>
              <td>
                <Badge status={element.type}/>
              </td>
              <td>{element.price && element.price/ 10 ** 9 +' '+element.coin.split('::').pop() }</td>
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
              <td>{moment(new Date(element?.created_at)).fromNow()}</td>
            </tr>)
            )}
             </tbody>
            </table>
            </div>)
            }
          </TabPanel>
        </Tabs>
      </div>
      <div className={openedOffer ? 'modal modal-bottom sm:modal-middle modal-open' : 'modal modal-bottom sm:modal-middle'}>
        <div className="modal-box" style={{ backgroundColor: 'black' }}>
          <h3 className="font-bold text-lg ">Offer</h3>
          <div className="flex  justify-between">
            <input
              type="number"
              onChange={handleChange}
              value={price}
              placeholder="Offer Price"
              className="relative z-10 h-10 w-full rounded-full bg-transparent px-6 align-top text-[18px]  outline-none"
            />

            <select className="select max-w-[180px] bg-black"
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
              }}>
              <option selected>{selectedcurrency}</option>
            </select>
          </div>
          <div className="modal-action">
            <button onClick={() => setOpenOffer(false)} className="btn-md btn-connected  bottom-0 right-0 z-10">Cancel</button>
            <button onClick={() => makeOffer()} className="btn-md btn  bottom-0 right-0 z-10">Submit</button>
          </div>
        </div>
      </div>
      <div className={opened ? 'modal modal-bottom sm:modal-middle modal-open' : 'modal modal-bottom sm:modal-middle'}>
        <div className="modal-box" style={{ backgroundColor: 'black' }}>
          <h3 className="font-bold text-lg ">Listing Price and Token</h3>
          <div className="flex  justify-between">
            <input
              type="number"
              onChange={handleChange}
              value={price}
              placeholder="Enter selling price"
              className="relative z-10 h-10 w-full rounded-full bg-transparent px-6 align-top text-[18px]  outline-none"
            />

            <select className="select max-w-[180px] bg-black"
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
              }}>
              <option selected>SUI</option>
              <option>HOMI</option>
            </select>
          </div>
          <div className="modal-action">
            <button onClick={() => setOpened(false)} className="btn-md btn-connected  bottom-0 right-0 z-10">Cancel</button>
            <button onClick={() => listNFT()} className="btn-md btn  bottom-0 right-0 z-10">List</button>
          </div>
        </div>
      </div>
      <div className={opened2 ? 'modal modal-bottom sm:modal-middle modal-open' : 'modal modal-bottom sm:modal-middle'}>
        <div className="modal-box" style={{ backgroundColor: 'black' }}>
          <h3 className="font-bold text-lg ">Edit Price</h3>
          <input
            type="number"
            onChange={handleChange}
            value={price}
            placeholder="Enter selling price"
            className="relative z-10 h-10 w-full rounded-full bg-transparent px-6 align-top text-[18px]  outline-none"
          />
          <div className="modal-action">
            <button onClick={() => setOpened2(false)} className="btn-md btn-connected  bottom-0 right-0 z-10">Cancel</button>
            <button onClick={() => changePrice()} className="btn-md btn  bottom-0 right-0 z-10">Edit</button>
          </div>
        </div>
      </div>
      <div className={openedAuction ? 'modal modal-bottom sm:modal-middle modal-open' : 'modal modal-bottom sm:modal-middle'}>
        <div className="modal-box" style={{ backgroundColor: 'black' }}>
          <h3 className="font-bold text-lg ">Auction</h3>
          <div className="flex mt-5 justify-between">
            <input
              type="number"
              onChange={handleChange}
              value={price}
              placeholder="Starting Price"
              className="relative z-10 h-12 w-full rounded-full bg-gray-700 px-6 align-top text-[18px]  outline-none"
            />
            <select className="ml-5 select max-w-[180px] bg-black"
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
              }}>
              <option selected>SUI</option>
              <option>HOMI</option>
            </select>
          </div>
          <input
            type="number"
            onChange={(event) => setminBidIncrement(event.target.value)}
            value={minBidIncrement}
            placeholder="Min bid increment"
            className="mt-5 relative z-10 h-10 w-full rounded-full bg-gray-700 px-6 align-top text-[18px]  outline-none"
          />
          <input
            type="datetime-local"
            onChange={(event) => setStarts(event.target.value)}
            value={starts}
            placeholder="Starting Date"
            className="mt-5 relative z-10 h-10 w-full rounded-full bg-gray-700 px-6 align-top text-[18px]  outline-none"
          />
          <input
            type="datetime-local"
            onChange={(event) => setExpires(event.target.value)}
            value={expires}
            placeholder="Ending Date"
            className="mt-5 relative z-10 h-10 w-full rounded-full bg-gray-700 px-6 align-top text-[18px]  outline-none"
          />
          <div className="modal-action">
            <button onClick={() => setOpenedAuction(false)} className="btn-md btn-connected  bottom-0 right-0 z-10">Cancel</button>
            <button onClick={() => listNFTAuction()} className="btn-md btn  bottom-0 right-0 z-10">Submit</button>
          </div>
        </div>
      </div>
      <div className={openedBid ? 'modal modal-bottom sm:modal-middle modal-open' : 'modal modal-bottom sm:modal-middle'}>
        <div className="modal-box" style={{ backgroundColor: 'black' }}>
          <h3 className="font-bold text-lg ">Bidding</h3>
          <div className="flex mt-5 justify-between">
            <input
              type="number"
              onChange={handleChange}
              value={price}
              placeholder="Bid Price"
              className="relative z-10 h-10 w-full rounded-full bg-transparent px-6 align-top text-[18px]  outline-none"
            />

            <select className="select max-w-[180px] bg-black"
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
              }}>
              <option selected>{selectedcurrency}</option>
            </select>
          </div>
          <div className="modal-action">
            <button onClick={() => setOpenedBid(false)} className="btn-md btn-connected  bottom-0 right-0 z-10">Cancel</button>
            <button onClick={() => bid()} className="btn-md btn  bottom-0 right-0 z-10">Bid</button>
          </div>
        </div>
      </div>
    </div>
  );
}

