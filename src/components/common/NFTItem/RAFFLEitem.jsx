import Image from 'next/image';
//import Link from 'next/link';
import { useWallet } from '@suiet/wallet-kit';
import { CountdownItem } from '@components/common';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useWalletKit } from "@mysten/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js";

export default function RAFFLEitem({ id, rafflename, raffleimage, rafflespots, raffleprice, endsIn, raffle_address, raffle_field_Address }) {
  //const wallet = useWallet();
  const connection = new Connection({
    fullnode: 'https://explorer-rpc.devnet.sui.io/',
    faucet: 'https://explorer-rpc.devnet.sui.io/gas',
  });
  const provider = new JsonRpcProvider(connection);

  const { account:currentAccount,signAndExecuteTransactionBlock } = useWallet();

  const stakeNFT = async () => {
    //let address = wallet.account.address;
    let coin = "";

    /*const dfs = await provider.getDynamicFields(
      raffle_field_Address
    ).catch((e) => {
      console.log('not enaugh $HOMI balance');
    });
    */console.log(raffle_field_Address,id);

    const objects = await provider.getCoins({
      owner:currentAccount.address, coinType:"0xb4101a8dc77458ff91eb327fbcf9a8e29e253a31cab9b8030a35f4cef22cfc8b::homi::HOMI"}
    ).catch((e) => {
      console.log('not Homi!',e);
    });

    

    console.log(objects);
    objects?.data.map((object) => {
      if (object?.balance == raffleprice) {
        coin = object?.coinObjectId;
        console.log(raffleprice, coin);
      }
    });
    if(coin.length == 0){
      toast.info("Not enough $HOMI funds.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const tx = new TransactionBlock();
    tx.moveCall({
      target: "0x42a47f1af43a4d031779fe13dca4da18e0c773f09a8dc5ef29e831cfd65f6080::raffle::join_raffle",
      typeArguments:["0xb4101a8dc77458ff91eb327fbcf9a8e29e253a31cab9b8030a35f4cef22cfc8b::homi::HOMI"],
      arguments: [
        tx.object(raffle_address),
        tx.object(coin),
      ],
    });
    signAndExecuteTransactionBlock({ transactionBlock: tx }).then(
      (res) => {
        //setOpen(false);
        //toast("Mint sucessful");
        if(res != undefined)
        toast.success("Ticket bought successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    )
    .catch(
      (err) => {
        //setOpen(false);
        //toast("You need to connect your wallet in order to mint a hominid.");
        console.log(err.message);
        toast("Issue bying Ticket!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    );
/*
    wallet.signAndExecuteTransaction({
      transaction: {
        kind: "moveCall",
        data: {
          packageObjectId: "0x42a47f1af43a4d031779fe13dca4da18e0c773f09a8dc5ef29e831cfd65f6080",
          module: "raffle",
          function: "join_raffle",
          typeArguments: ["0xb4101a8dc77458ff91eb327fbcf9a8e29e253a31cab9b8030a35f4cef22cfc8b::homi::HOMI"],
          arguments: [
            raffle_address,
            coin
          ],
          gasBudget: 3000,
        },
      }
    })
      .then(
        (res) => {
          //setOpen(false);
          //toast("Mint sucessful");
          if(res != undefined)
          toast.success("Ticket bought successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      )
      .catch(
        (err) => {
          //setOpen(false);
          //toast("You need to connect your wallet in order to mint a hominid.");
          console.log(err.message);
          toast("Issue bying Ticket!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      );*/

  };

  return (
    <div className="inline-block rounded-2xl border border-[#9E8AA1]">
      <div className="relative">
        <Image
          src={raffleimage}
          width={400}
          height={400}
          loader={() => raffleimage}
          style={{ height: '400px', width: '400px' }}
          className="w-full rounded-2xl"
        />
        <button className="btn btn-md btn absolute bottom-0 right-0 z-10" onClick={() => stakeNFT()}>Buy Ticket</button>
      </div>
      <div className="p-4">
        <h2 className="text-base pb-3 font-bold text-white">
          <span className="text-2xl font-bold text-white">{rafflename}</span>
        </h2>
        <h2 className="text-base font-bold text-white">
          Raffle Spots Available:
          <span className="text-1xl font-bold text-secondary pl-2">{rafflespots}</span>
        </h2>
        <h2 className="text-base font-bold text-white">
          Price:
          <span className="text-1xl font-bold text-secondary pl-2">{raffleprice==1000000 ? 'TBD' : raffleprice / 1000 + ' $HOMI/ticket'}</span>
        </h2>
        <h2 className="text-base font-bold text-white">
          Winner is
          <span className="text-1xl font-bold text-secondary pl-2">Not selected yet</span>
        </h2>
        <p className="mt-3 font-medium text-[#9e9e9e]">Ending</p>
        <div className=" flex flex-row items-center justify-between">
          <CountdownItem time={new Date(endsIn * 1000)} />
          <button>
            <Image src="/assets/images/add.png" height={27} width={27} alt="Buy" onClick={() => stakeNFT()} />
          </button>
        </div>
      </div>
    </div>
  );
}
