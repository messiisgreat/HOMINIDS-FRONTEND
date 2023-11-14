import { useState, useEffect } from 'react';
// import { JsonRpcProvider, Connection } from '@mysten/sui.js';
// import { TransactionBlock } from '@mysten/sui.js';
// import { SMART_CONTRACTS, RPC } from '@constants/index';
// import { useWallet } from '@suiet/wallet-kit';
// import { toast } from 'react-toastify';

export default function RafflePage() {
  //const wallet = useWallet();
  //const [loading, setLoading] = useState(false);
  //const [stakedNfts, setstakedNfts] = useState([]);
  //const { account:currentAccount } = useWallet();
  // const { account: currentAccount, signTransactionBlock } = useWallet();
  // const connection = new Connection(RPC);
  // const provider = new JsonRpcProvider(connection);
  // const [staked, setStaked] = useState([]);
  // const [nfts, setNfts] = useState([]);
  // const [airdrop, setAirdrop] = useState(0);

  /*const connection = new Connection({
    fullnode: 'https://explorer-rpc.devnet.sui.io/',
    faucet: 'https://explorer-rpc.devnet.sui.io/gas',
  });*/

  //const provider = new JsonRpcProvider(devnetConnection);

  /*const loadNFTs = async () => {
    const objects = await provider.multiGetObjects({
      ids:["0x881f935caf6e0da235d4e20c4e21319b810c11cf840c471d7031a9a17549f35a","0x7dd32f552c54a969bb61e27357b12f362dea10c8f84833c68343ced8372503df"
      ],options:{showDisplay:true,showContent:true}}
    ).catch((e)=>{
      console.log(e);
    });
    console.log(objects);
    setstakedNfts(objects);
    console.log(objects);
    setLoading(false)
  };

  useEffect(() => {
    //if (currentAccount?.address?.toString() === undefined) return;

    //loadNFTs();

    //fetchCandyMachineData(true)
    //setInterval(fetchCandyMachineData, autoCmRefresh)
  }, [currentAccount]);*/

  // const loadNFTs = async () => {
  //   const stakednfts_receipts_objects = await provider
  //     .getOwnedObjects({
  //       owner: currentAccount.address,
  //       options: { showContent: true },
  //       filter: { StructType: SMART_CONTRACTS.RECEIPT_TYPE },
  //     })
  //     .catch((e) => console.log(e));
  //   const nfts_objects = await provider
  //     .getOwnedObjects({
  //       owner: currentAccount.address,
  //       options: { showContent: true, showDisplay: true },
  //       filter: { StructType: SMART_CONTRACTS.NFT_TYPE },
  //     })
  //     .catch((e) => console.log(e));

  //   const eligible_nft = [];
  //   const eligible_staked = [];

  //   stakednfts_receipts_objects?.data.map(async (item, i) => {
  //     let listing = await provider
  //       .getDynamicFieldObject({
  //         parentId: '0xae5fc700299d5c9b2236d61e1111b3f28b0ec8218abdcd498553877c3a137163',
  //         name: {
  //           type: '0x2::object::ID',
  //           value: item.data.content.fields.nft_id,
  //         },
  //       })
  //       .catch((e) => console.log(e));
  //     if (listing?.error != undefined) {
  //       eligible_staked.push(item);
  //     }
  //     if (i == stakednfts_receipts_objects?.data?.length - 1) setStaked(eligible_staked);
  //   });

  //   nfts_objects?.data.map(async (item, i) => {
  //     let listing = await provider
  //       .getDynamicFieldObject({
  //         parentId: '0xae5fc700299d5c9b2236d61e1111b3f28b0ec8218abdcd498553877c3a137163',
  //         name: {
  //           type: '0x2::object::ID',
  //           value: item.data.objectId,
  //         },
  //       })
  //       .catch((e) => console.log(e));
  //     if (listing?.error != undefined) {
  //       eligible_nft.push(item);
  //     }
  //     if (i == nfts_objects?.data?.length - 1) setNfts(eligible_nft);
  //   });

  //   //console.log(eligible_staked,eligible_nft);
  //   //setStaked(eligible_staked);
  //   //setNfts(eligible_nft);

  // };

  // useEffect(() => {
  //   if (currentAccount?.address?.toString() === undefined) return;
  //   setAirdrop(0);
  //   loadNFTs();
  // }, [currentAccount]);

  // useEffect(() => {
  //   setAirdrop(staked?.length * 1000 + nfts?.length * 1000);
  // }, [staked, nfts]);

  // useEffect(() => {
  //   if (currentAccount?.address?.toString() === undefined) return;
  //   setAirdrop(0);
  //   loadNFTs();
  // }, []);

  // const claim = async () => {
  //   //let address = wallet.account.address;
  //   console.log(nfts, staked);
  //   const tx = new TransactionBlock();

  //   staked.map((item) => {
  //     tx.moveCall({
  //       target:
  //         '0xebb793454650473ac283911251d68b654a092b44aec1900d27f08115bbbf65d7::airdrop::claim_airdrop_staked',
  //       typeArguments: [SMART_CONTRACTS.COIN_TYPE],
  //       arguments: [
  //         tx.object('0x6516a9dcf2e08c800b3a888a2353b612ac6e642dd781fa685bbd621da562df4b'),
  //         tx.object(item.data.objectId),
  //         tx.object(item.data.content.fields.nft_id),
  //       ],
  //     });
  //   });

  //   nfts.map((item) => {
  //     tx.moveCall({
  //       target:
  //         '0xebb793454650473ac283911251d68b654a092b44aec1900d27f08115bbbf65d7::airdrop::claim_airdrop',
  //       typeArguments: [SMART_CONTRACTS.COIN_TYPE],
  //       arguments: [
  //         tx.object('0x6516a9dcf2e08c800b3a888a2353b612ac6e642dd781fa685bbd621da562df4b'),
  //         tx.object(item.data.objectId),
  //       ],
  //     });
  //   });

  //   let toastId;
  //   signTransactionBlock({ transactionBlock: tx })
  //     .then((e) => {
  //       toastId = toast.loading('executing transaction...', {
  //         position: 'top-center',
  //         autoClose: false,
  //         theme: 'dark',
  //       });
  //       provider
  //         .executeTransactionBlock({
  //           transactionBlock: e.transactionBlockBytes,
  //           signature: e.signature,
  //         })
  //         .then((res) => {
  //           console.log(res);
  //           toast.update(toastId, {
  //             render: 'HOMI claimed successfully',
  //             type: toast.TYPE.SUCCESS,
  //             progress: undefined,
  //             hideProgressBar: true,
  //             autoClose: 5000,
  //             pauseOnFocusLoss: true,
  //             closeOnClick: true,
  //             isLoading: false,
  //           });
  //           setAirdrop(0);
  //         })
  //         .catch((err) => {
  //           toast.update(toastId, {
  //             render: err.toString(),
  //             type: toast.TYPE.ERROR,
  //             progress: undefined,
  //             hideProgressBar: true,
  //             autoClose: 5000,
  //             pauseOnFocusLoss: true,
  //             closeOnClick: true,
  //             isLoading: false,
  //           });
  //           //console.log(err);
  //         });
  //     })
  //     .catch((err) => {
  //       toast.update(toastId, {
  //         render: err.toString(),
  //         type: toast.TYPE.ERROR,
  //         progress: undefined,
  //         hideProgressBar: true,
  //         autoClose: 5000,
  //         pauseOnFocusLoss: true,
  //         closeOnClick: true,
  //         isLoading: false,
  //       });
  //       //console.log(err);
  //     });
  // };
  const [isHeight, setIsHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight) {
        setIsHeight(window.innerHeight - 182);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`relative pt-20`} style={{ height: `${isHeight}px` }}>
      <div className="flex items-center gap-6 text-xl leading-6">
        <div>MAIN</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">Airdrop</div>
      </div>
      <h1 className="Black-fontfamily my-14 text-center text-[64px] font-black uppercase leading-[80px]">
        Airdrop
      </h1>
      <div
        className="nato-fontfamily flex w-full flex-col items-center justify-center rounded-[40px] py-12"
        style={{
          border: '3px solid #b780ff8c',
          backgroundColor: '#b780ff14',
        }}
      >
        <div className="text-5xl font-black leading-[57.6px]">0</div>
        <div className="text-2xl uppercase leading-[28.8px]">You are eligible to claim O HOMI</div>
      </div>
      <img
        className="rounded-bg left-[-200px] top-[-200px] h-[992px] w-[900px]"
        width={900}
        src="/assets/connectBtns/Ellipse64.png"
        alt=""
      />
      <img
        className="rounded-bg right-[50px] top-[-200px] h-[992px] w-[900px]"
        width={900}
        src="/assets/connectBtns/Ellipse64.png"
        alt=""
      />
      <img
        className="rounded-bg left-[239px] top-[220px] z-10 !opacity-100"
        width={30}
        src="/assets/connectBtns/Star1.png"
        alt=""
      />
      <img
        className="rounded-bg right-[-105px] top-[380px] z-10 !opacity-100"
        width={56}
        src="/assets/connectBtns/Star2.png"
        alt=""
      />
    </div>
  );
}
