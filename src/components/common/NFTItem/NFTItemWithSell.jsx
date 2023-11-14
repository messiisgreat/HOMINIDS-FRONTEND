import Image from 'next/image';
import Link from 'next/link';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from "@mysten/sui.js";
import { toast } from 'react-toastify';
import { SMART_CONTRACTS } from '@constants/index';

export default function NFTItemWithSell({ id, nftname, nftimage, nftaddress,buttonText,reload }) {

  //const wallet = useWallet(); <NFTItemWithSell reload={loadNFTs} key={stakedNft.data.content.fields.name} nftname={stakedNft.data.content.fields.name} nftimage={stakedNft.data.content.fields.rarity} nftaddress={stakedNft.data.objectId} buttonText={"Stake"} />
  
  const { signAndExecuteTransactionBlock } = useWallet();

  const stakeNFT = async () => {
    //let address = wallet.account.address;
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.STAKE_FUNCTION,
      typeArguments:[SMART_CONTRACTS.COIN_TYPE,SMART_CONTRACTS.NFT_TYPE],
      arguments: [
        tx.object(SMART_CONTRACTS.VAULT_ADDRESS),
        tx.object(nftaddress),
        tx.object(SMART_CONTRACTS.CLOCK_ADDRESS)
      ],
    });
    signAndExecuteTransactionBlock({ transactionBlock: tx }).then(
      (res) => {
        //setOpen(false);
        console.log(res);
        toast.success("NFT staked successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        //window.location.reload(true);
        reload();
      }
    )
    .catch(
      (err) => {
        //setOpen(false);
        toast("Issue staking NFT!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(err.message,id);

      }
    );
  };

  const unstakeNFT = async () => {
    //let address = wallet.account.address;
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.UNSTAKE_FUNCTION,
      typeArguments:[SMART_CONTRACTS.COIN_TYPE,SMART_CONTRACTS.NFT_TYPE],
      arguments: [
        tx.object(SMART_CONTRACTS.VAULT_ADDRESS),
        tx.object(nftaddress),
      ],
    });
    signAndExecuteTransactionBlock({ transactionBlock: tx }).then(
      (res) => {
        //setOpen(false);
        console.log(res);
        toast("Unstaking sucessful");
        //window.location.reload(true);
        reload();
      }
    )
    .catch(
      (err) => {
        //setOpen(false);
        toast("You need to connect your wallet in order to mint a hominid.");
        console.log(err.message);
      }
    );
  };

  return (
    <div className="inline-block rounded-2xl border border-[#9E8AA1]">
      <div className="relative">
        <Image
           src={"https://hominids.io/hominids_ipfs/"+nftimage+".png"}
           loader={() => "https://hominids.io/hominids_ipfs/"+nftimage+".png"}
          width={300}
          height={297}
          className={buttonText=="Unstake" ? "w-full rounded-2xl  blur-[2px]	" : "w-full rounded-2xl"}
        />
        <button className="btn btn-md btn absolute bottom-0 right-0 z-10" onClick={() => buttonText == 'Stake' ? stakeNFT() : unstakeNFT()}>{buttonText}</button>
      </div>
      <div className="p-4">
        <h2 className="text-base font-bold text-white">
          <Link href="">Hominid #{nftname}</Link>
        </h2>
      </div>
    </div>
  );
}
