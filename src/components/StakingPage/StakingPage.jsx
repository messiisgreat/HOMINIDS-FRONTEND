import { useState, useEffect } from 'react';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { TransactionBlock } from '@mysten/sui.js';
import { SMART_CONTRACTS, RPC } from '@constants/index';
import { useWallet } from '@suiet/wallet-kit';
import Tab from '../Tab';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function StakingPage() {
  const { account: currentAccount, signTransactionBlock, connected } = useWallet();
  const connection = new Connection(RPC);
  const [reward, setreward] = useState(0);
  const provider = new JsonRpcProvider(connection);

  const {
    reset: r1,
    trigger: t1,
    data: nfts,
    error,
    isMutating: isLoading,
    isValidating,
  } = useSWRMutation(
    'getnfts',
    async () => {
      if (!currentAccount?.address) return;
      const nfts_objects = await provider
        .getOwnedObjects({
          owner: currentAccount.address,
          options: { showContent: true, showDisplay: true },
          filter: { StructType: SMART_CONTRACTS.NFT_TYPE },
        })
        .catch((e) => console.log(e));

      return nfts_objects?.data;
    },
    {
      revalidate: true,
      populateCache: true,
    }
  );

  const {
    reset: r2,
    trigger: t2,
    data: staked,
    error: error2,
    isMutating: isLoading2,
    isValidating: isValidating2,
  } = useSWRMutation(
    'getstaked',
    async () => {
      if (!currentAccount?.address) return;
      const stakednfts_receipts_objects = await provider
        .getOwnedObjects({
          owner: currentAccount.address,
          options: { showDisplay: false, showContent: true },
          filter: { StructType: SMART_CONTRACTS.RECEIPT_TYPE },
        })
        .catch((e) => console.log(e));
      //const stakednfts_receipts_objects = objects?.data?.filter(object => object?.data?.content?.type == SMART_CONTRACTS.RECEIPT_TYPE);
      let stakednfts_addresses = [];
      stakednfts_receipts_objects?.data?.map((nft) => {
        stakednfts_addresses.push(nft.data.content.fields.nft_id);
      });
      const staked = await provider
        .multiGetObjects({
          ids: stakednfts_addresses,
          options: { showDisplay: true, showContent: true },
        })
        .catch((e) => console.log(e));
      stakednfts_receipts_objects?.data?.map((nft, i) => {
        stakednfts_addresses.push(nft.data.content.fields.nft_id);
        staked[i].data.content.fields.receiptId = nft.data.objectId;
        staked[i].data.content.fields.stakedAt = nft.data.content.fields.stakedAt;
        staked[i].data.content.fields.withdrawn_amount = nft.data.content.fields.withdrawn_amount;
        staked[i].data.content.fields.rarity = nft.data.content.fields.rarity;
      });
      return staked;
    },
    {
      revalidate: true,
      populateCache: true,
    }
  );

  const loadNFTs = async () => {
    let newreward = 0;
    staked.map((nft) => {
      let rnum = undefined;

      if (nft.data.content.fields.rarity == 'Common') rnum = 10;
      else if (nft.data.content.fields.rarity == 'Rare') rnum = 20;
      else if (nft.data.content.fields.rarity == 'Epic') rnum = 50;
      else if (nft.data.content.fields.rarity == 'Legendary') rnum = 100;
      let reward_tmp =
        (((Date.now() - parseInt(nft.data.content.fields.stakedAt)) / 1000) * rnum) / 86400 -
        nft.data.content.fields.withdrawn_amount / 10 ** 9;
      console.log(
        nft.data.content.fields.rarity,
        reward_tmp,
        nft.data.content.fields.stakedAt,
        Date.now()
      );
      newreward = reward_tmp > 0 ? newreward + reward_tmp : 0;
    });
    setreward(newreward.toString().substring(0, 5));
    console.log(newreward);
  };

  useEffect(() => {
    if (staked === undefined) return;
    loadNFTs();
  }, [staked]);

  const claim = async () => {
    const tx = new TransactionBlock();
    staked.map((stake) => {
      let rnum = undefined;
      if (stake.data.content.fields.rarity == 'Common') rnum = 10;
      else if (stake.data.content.fields.rarity == 'Rare') rnum = 20;
      else if (stake.data.content.fields.rarity == 'Epic') rnum = 50;
      else if (stake.data.content.fields.rarity == 'Legendary') rnum = 100;
      let reward_tmp =
        (((Date.now() - stake.data.content.fields.stakedAt) / 1000) * rnum) / 86400 -
        stake.data.content.fields.withdrawn_amount / 10 ** 9;
      if (reward_tmp > 0) {
        tx.moveCall({
          target: SMART_CONTRACTS.CLAIM_FUNCTION,
          typeArguments: [SMART_CONTRACTS.COIN_TYPE, SMART_CONTRACTS.NFT_TYPE],
          arguments: [
            tx.object(SMART_CONTRACTS.VAULT_ADDRESS),
            tx.object(stake.data.content.fields.receiptId),
            tx.object(SMART_CONTRACTS.CLOCK_ADDRESS),
          ],
        });
      }
    });

    let toastId;
    signTransactionBlock({ transactionBlock: tx })
      .then((e) => {
        toastId = toast.loading('executing transaction...', {
          position: 'top-center',
          autoClose: false,
          theme: 'dark',
        });
        provider
          .executeTransactionBlock({
            transactionBlock: e.transactionBlockBytes,
            signature: e.signature,
          })
          .then((res) => {
            console.log(res);
            toast.update(toastId, {
              render: 'Rewards claimed successfully',
              type: toast.TYPE.SUCCESS,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            updateAll();
          })
          .catch((err) => {
            toast.update(toastId, {
              render: err.toString(),
              type: toast.TYPE.ERROR,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            //console.log(err);
          });
      })
      .catch((err) => {
        toast.update(toastId, {
          render: err.toString(),
          type: toast.TYPE.ERROR,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false,
        });
        //console.log(err);
      });
  };

  const stakeNFT = async (objectId) => {
    //let address = wallet.account.address;
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.STAKE_FUNCTION,
      typeArguments: [SMART_CONTRACTS.COIN_TYPE, SMART_CONTRACTS.NFT_TYPE],
      arguments: [
        tx.object(SMART_CONTRACTS.VAULT_ADDRESS),
        tx.object(objectId),
        tx.object(SMART_CONTRACTS.CLOCK_ADDRESS),
      ],
    });
    let toastId;
    signTransactionBlock({ transactionBlock: tx })
      .then((e) => {
        toastId = toast.loading('executing transaction...', {
          position: 'top-center',
          autoClose: false,
          theme: 'dark',
        });
        provider
          .executeTransactionBlock({
            transactionBlock: e.transactionBlockBytes,
            signature: e.signature,
          })
          .then((res) => {
            console.log(res);
            toast.update(toastId, {
              render: 'NFT staked successfully',
              type: toast.TYPE.SUCCESS,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            updateAll();
          })
          .catch((err) => {
            toast.update(toastId, {
              render: err.toString(),
              type: toast.TYPE.ERROR,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            //console.log(err);
          });
      })
      .catch((err) => {
        toast.update(toastId, {
          render: err.toString(),
          type: toast.TYPE.ERROR,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false,
        });
        //console.log(err);
      });
  };

  const unstakeNFT = async (objectId) => {
    //let address = wallet.account.address;
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.UNSTAKE_FUNCTION,
      typeArguments: [SMART_CONTRACTS.COIN_TYPE, SMART_CONTRACTS.NFT_TYPE],
      arguments: [tx.object(SMART_CONTRACTS.VAULT_ADDRESS), tx.object(objectId)],
    });

    let toastId;
    signTransactionBlock({ transactionBlock: tx })
      .then((e) => {
        toastId = toast.loading('executing transaction...', {
          position: 'top-center',
          autoClose: false,
          theme: 'dark',
        });
        provider
          .executeTransactionBlock({
            transactionBlock: e.transactionBlockBytes,
            signature: e.signature,
          })
          .then((res) => {
            console.log(res);
            toast.update(toastId, {
              render: 'Unstaked successfully',
              type: toast.TYPE.SUCCESS,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            updateAll();
          })
          .catch((err) => {
            toast.update(toastId, {
              render: err.toString(),
              type: toast.TYPE.ERROR,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            //console.log(err);
          });
      })
      .catch((err) => {
        toast.update(toastId, {
          render: err.toString(),
          type: toast.TYPE.ERROR,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false,
        });
        //console.log(err);
      });
  };

  const stakeAll = async () => {
    //let address = wallet.account.address;
    const tx = new TransactionBlock();
    nfts.map((nft) => {
      tx.moveCall({
        target: SMART_CONTRACTS.STAKE_FUNCTION,
        typeArguments: [SMART_CONTRACTS.COIN_TYPE, SMART_CONTRACTS.NFT_TYPE],
        arguments: [
          tx.object(SMART_CONTRACTS.VAULT_ADDRESS),
          tx.object(nft.data.objectId),
          tx.object(SMART_CONTRACTS.CLOCK_ADDRESS),
        ],
      });
    });

    let toastId;
    signTransactionBlock({ transactionBlock: tx })
      .then((e) => {
        toastId = toast.loading('executing transaction...', {
          position: 'top-center',
          autoClose: false,
          theme: 'dark',
        });
        provider
          .executeTransactionBlock({
            transactionBlock: e.transactionBlockBytes,
            signature: e.signature,
          })
          .then((res) => {
            console.log(res);
            toast.update(toastId, {
              render: 'NFTs staked successfully',
              type: toast.TYPE.SUCCESS,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            updateAll();
          })
          .catch((err) => {
            toast.update(toastId, {
              render: err.toString(),
              type: toast.TYPE.ERROR,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            //console.log(err);
          });
      })
      .catch((err) => {
        toast.update(toastId, {
          render: err.toString(),
          type: toast.TYPE.ERROR,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false,
        });
        //console.log(err);
      });
  };

  const unstakeAll = async () => {
    //let address = wallet.account.address;
    const tx = new TransactionBlock();
    staked.map((stake) => {
      tx.moveCall({
        target: SMART_CONTRACTS.UNSTAKE_FUNCTION,
        typeArguments: [SMART_CONTRACTS.COIN_TYPE, SMART_CONTRACTS.NFT_TYPE],
        arguments: [
          tx.object(SMART_CONTRACTS.VAULT_ADDRESS),
          tx.object(stake.data.content.fields.receiptId),
        ],
      });
    });

    let toastId;
    signTransactionBlock({ transactionBlock: tx })
      .then((e) => {
        toastId = toast.loading('executing transaction...', {
          position: 'top-center',
          autoClose: false,
          theme: 'dark',
        });
        provider
          .executeTransactionBlock({
            transactionBlock: e.transactionBlockBytes,
            signature: e.signature,
          })
          .then((res) => {
            console.log(res);
            toast.update(toastId, {
              render: 'NFTs Unstaked successfully',
              type: toast.TYPE.SUCCESS,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            updateAll();
          })
          .catch((err) => {
            toast.update(toastId, {
              render: err.toString(),
              type: toast.TYPE.ERROR,
              progress: undefined,
              hideProgressBar: true,
              autoClose: 5000,
              pauseOnFocusLoss: true,
              closeOnClick: true,
              isLoading: false,
            });
            //console.log(err);
          });
      })
      .catch((err) => {
        toast.update(toastId, {
          render: err.toString(),
          type: toast.TYPE.ERROR,
          progress: undefined,
          hideProgressBar: true,
          autoClose: 5000,
          pauseOnFocusLoss: true,
          closeOnClick: true,
          isLoading: false,
        });
        //console.log(err);
      });
  };

  useEffect(() => {
    if (currentAccount?.address?.toString() === undefined) return;
    t1();
    t2();
  }, [currentAccount]);

  const Nfts = () => {
    if (error)
      return (
        <h3 className="mt-20 text-center text-base font-medium">
          Sui RPC issue while fetching tokens: {error}
        </h3>
      );
    if (!connected)
      return <h3 className="mt-20 text-center text-base font-medium">Wallet Not connected </h3>;
    if (isLoading || isValidating)
      return <h3 className="mt-20 text-center text-base font-medium">Loading Hominids...</h3>;
    return (
      <div>
        {nfts != undefined && nfts?.length > 0 ? (
          <button className="btn mt-2 text-center" onClick={() => stakeAll()}>
            Stake All
          </button>
        ) : null}
        <div className="mt-12 grid grid-cols-4 gap-8">
          {nfts?.map((nft, i) => (
            <div key={i} className="inline-block rounded-2xl border border-[#9E8AA1]">
              <div className="relative">
                <Image
                  src={nft?.data?.display?.data?.image_url}
                  loader={() => nft?.data?.display?.data?.image_url}
                  width={300}
                  height={297}
                  className="w-full rounded-2xl"
                />
                <button
                  className="btn btn-md absolute bottom-0 right-0 z-10"
                  onClick={() => stakeNFT(nft?.data?.objectId)}
                >
                  Stake
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold text-white">
                  <Link href="">{nft?.data?.display?.data?.name}</Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Staked = () => {
    if (error2)
      return (
        <h3 className="mt-20 text-center text-base font-medium">
          Sui RPC issue while fetching tokens
        </h3>
      );
    if (!connected)
      return <h3 className="mt-20 text-center text-base font-medium">Wallet Not connected</h3>;
    if (isLoading2 || isValidating2)
      return (
        <h3 className="mt-20 text-center text-base font-medium">Loading Staked Hominids...</h3>
      );
    return (
      <div>
        {staked != undefined && staked?.length > 0 ? (
          <button className="btn-connected btn mt-2 text-center" onClick={() => unstakeAll()}>
            Unstake All
          </button>
        ) : null}
        <div className="mt-12 grid grid-cols-4 gap-8">
          {staked?.map((stakedNft, i) => (
            <div key={i} className="inline-block rounded-2xl border border-[#9E8AA1]">
              <div className="relative">
                <Image
                  src={stakedNft?.data?.display?.data?.image_url}
                  loader={() => stakedNft?.data?.display?.data?.image_url}
                  width={300}
                  height={297}
                  className="w-full rounded-2xl  blur-[2px]"
                />
                <button
                  className="btn btn-md absolute bottom-0 right-0 z-10"
                  onClick={() => unstakeNFT(stakedNft.data.content.fields.receiptId)}
                >
                  {'Unstake'}
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-base font-bold text-white">
                  <Link href="">{stakedNft?.data?.display?.data?.name}</Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const updateAll = () => {
    r1();
    r2();
    t1();
    t2();
  };

  const { data: stakingInfo } = useSWR(
    'getStakedCountM',
    async () => {
      const object = await provider
        .getObject({
          id: SMART_CONTRACTS.VAULT_ADDRESS,
          options: { showDisplay: false, showContent: true },
        })
        .catch((e) => console.log(e));
      return object.data.content.fields;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );

  const data = [
    {
      label: 'Your Hominids',
      value: 'Your Hominids',
      desc: `Wallet Not connected`,
    },
    {
      label: 'Staked Hominids',
      value: 'Staked Hominids',
      desc: `Wallet connected`,
    },
  ];

  return (
    <div className="mt-20">
      <div className="flex items-center gap-6 text-xl leading-6">
        <div>MAIN</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">NFT_Staking</div>
      </div>
      <h1 className="Black-fontfamily mb-6 mt-14 text-center text-[64px] font-black uppercase leading-[80px]">
        STAKING
      </h1>
      <div className="nato-fontfamily text-center text-2xl" style={{ lineHeight: '33.6px' }}>
        Earn $HOMI tokens staking your NFTs
      </div>
      <div
        className="nato-fontfamily relative mt-14 flex w-full items-center justify-center gap-12 rounded-[40px] py-12"
        style={{
          border: '3px solid #b780ff8c',
          backgroundColor: '#b780ff14',
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-black leading-[57.6px]">1017</div>
          <div className="text-2xl uppercase leading-[28.8px]">Total Hominids</div>
        </div>
        <img src="/assets/images/Vector4586.png" alt="a" />
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-black leading-[57.6px]">759</div>
          <div className="text-2xl uppercase leading-[28.8px]">Staked Hominids</div>
        </div>
        <img src="/assets/images/Vector4586.png" alt="a" />
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-black leading-[57.6px]">468698.15 HOMI</div>
          <div className="text-2xl uppercase leading-[28.8px]">Total Rewarded</div>
        </div>
        <img
          className="rounded-bg left-[-200px] top-[-350px] h-[992px] w-[900px]"
          width={900}
          src="/assets/connectBtns/Ellipse64.png"
          alt=""
        />
        <img
          className="rounded-bg right-[50px] top-[-350px] h-[992px] w-[900px]"
          width={900}
          src="/assets/connectBtns/Ellipse64.png"
          alt=""
        />
        <img
          className="rounded-bg right-[300px] top-[-170px] z-10 !opacity-100"
          width={30}
          src="/assets/connectBtns/Star1.png"
          alt=""
        />
        <img
          className="rounded-bg left-[-150px] top-[50px] z-10 !opacity-100"
          width={56}
          src="/assets/connectBtns/Star2.png"
          alt=""
        />
      </div>
      <div className="mb-[328px] mt-[104px]">
        <Tab data={data} />
      </div>
    </div>
  );
}
