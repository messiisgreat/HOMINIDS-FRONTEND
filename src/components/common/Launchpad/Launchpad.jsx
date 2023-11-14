import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useWallet } from '@suiet/wallet-kit';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SMART_CONTRACTS } from '@constants/index';
import { TransactionBlock } from '@mysten/sui.js';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';

export default function Launchpad() {
  //const wallet = useWallet()
  //const [open, setOpen] = useState(false);
  const { signAndExecuteTransactionBlock } = useWallet();
  const [count, setCount] = useState(1);
  const [minted, setMinted] = useState();

  const mint = async () => {
    const tx = new TransactionBlock();
    for (let index = 0; index < count; index++) {
      let [coin] = tx.splitCoins(tx.gas, [tx.pure(10 * 1e9)]);
      tx.moveCall({
        target: SMART_CONTRACTS.MINT_FUNCTION,
        arguments: [tx.object(SMART_CONTRACTS.NFT_COLLECTION_ADDRESS), coin],
      });
    }

    signAndExecuteTransactionBlock({ transactionBlock: tx })
      .then((res) => {
        console.log(res);
        toast('Mint successful');
        //loadNFT();
      })
      .catch((err) => {
        toast(err.message);
        console.log(err.message);
      });
  };

  const whitelist_mint = async () => {
    const tx = new TransactionBlock();
    let [coin] = tx.splitCoins(tx.gas, [tx.pure(5 * 1e9)]);
    tx.moveCall({
      target: SMART_CONTRACTS.WHITELIST_MINT_FUNCTION,
      arguments: [tx.object(SMART_CONTRACTS.NFT_COLLECTION_ADDRESS), coin],
    });
    signAndExecuteTransactionBlock({ transactionBlock: tx })
      .then((res) => {
        console.log(res);
        toast('Mint successful');
        //loadNFT();
      })
      .catch((err) => {
        toast(err.message);
        console.log(err.message);
      });
  };

  const freemint_mint = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: SMART_CONTRACTS.FREEMINT_MINT_FUNCTION,
      arguments: [tx.object(SMART_CONTRACTS.NFT_COLLECTION_ADDRESS)],
    });
    signAndExecuteTransactionBlock({ transactionBlock: tx })
      .then((res) => {
        console.log(res);
        toast('Mint successful');
        //loadNFT();
      })
      .catch((err) => {
        toast(err.message);
        console.log(err.message);
      });
  };

  const provider = new JsonRpcProvider(
    new Connection({
      fullnode: 'https://fullnode.mainnet.sui.io:443',
      faucet: 'https://fullnode.mainnet.sui.io:443/gas',
    })
  );

  const loadNFT = async () => {
    const object = await provider
      .getObject({
        id: SMART_CONTRACTS.NFT_COLLECTION_ADDRESS,
        options: { showDisplay: true, showContent: true },
      })
      .catch((e) => e);
    console.log(object);
    setMinted(object?.data?.content?.fields.minted);
  };

  useEffect(() => {
    loadNFT();
  }, [true]);

  return (
    <div>
      {/* PART 1 */}
      <div className="mt-12 flex flex-col items-center justify-center gap-12 sm:flex-row">
        <div className="ml-12 w-full">
        <Image
            src="https://cdn.discordapp.com/attachments/1049090805710729337/1109586234952650792/20230520_225625.gif"
            loader={() =>
              'https://cdn.discordapp.com/attachments/1049090805710729337/1109586234952650792/20230520_225625.gif'
            }
            width={500}
            height={500}
            className="relative z-10 rounded-2xl"
            alt=""
          />
        </div>
        <div className="w-full">
          <h2 className="text-[40px] font-bold">HOMI Token Sale</h2>
          <Tabs className="mt-12">
            <TabList className="tab-list">
              <Tab className="tab-title">HOMI</Tab>
            </TabList>
            <TabPanel>
              <br />
              <p className="font-bold">HOMI TOKEN SALE ENDED</p>
            </TabPanel>
          </Tabs>
          <br />
          <p className="font-bold">Total Raised: 3180.7 SUI</p>
          <br />
        </div>
      </div>

      {/* Part 2 */}
      <div className="mt-12 flex flex-col items-center justify-center gap-12 sm:flex-row">
        <div className="ml-12 w-full">
          <Image
            src="/assets/images/hominids_gif.gif"
            width={500}
            height={500}
            className="relative z-10 rounded-2xl"
            alt=""
          />
        </div>
        <div className="w-full">
          <h2 className="text-[40px] font-bold">Hominids X Cradle Minting soon</h2>
          <Tabs className="mt-12">
            <TabList className="tab-list">
              <Tab className="tab-title">Public</Tab>
              <Tab className="tab-title">Whitelist</Tab>
              <Tab className="tab-title">Freemint</Tab>
            </TabList>
            <TabPanel>
              <br />
              <p className="font-bold">Mint Price: 10 SUI</p>
              <br />
              <p className="font-bold">Max per wallet: 10</p>
              <br />
              <div className="flex flex-row gap-20">
                <button className="" onClick={() => setCount(count > 1 ? count - 1 : count)}>
                  <span
                    className="items-center text-sm font-medium text-white"
                    suppressHydrationWarning
                  >
                    <FiMinusCircle className="text-3xl" />
                  </span>
                </button>
                <span className="text-2xl">{count}</span>
                <button className="" onClick={() => setCount(count < 10 ? count + 1 : count)}>
                  <span
                    className="items-center text-sm font-medium text-white"
                    suppressHydrationWarning
                  >
                    <FiPlusCircle className="text-3xl" />
                  </span>
                </button>
              </div>

              <button onClick={mint} className="btn mt-12 min-w-[247px]">
                Mint
              </button>
            </TabPanel>
            <TabPanel>
              <br />
              <p className="font-bold">Mint Price: 5 SUI</p>
              <br />
              <p className="font-bold">Max per wallet: 1</p>

              <button onClick={whitelist_mint} className="btn mt-12 min-w-[247px]">
                Whitelist Mint
              </button>
            </TabPanel>
            <TabPanel>
              <br />
              <p className="font-bold">Mint Price: 0 SUI</p>
              <br />
              <p className="font-bold">Max per wallet: 1</p>

              <button onClick={freemint_mint} className="btn mt-12 min-w-[247px]">
                FreeMint
              </button>
            </TabPanel>
          </Tabs>
          <br />
          <p className="font-bold">Minted: {minted == undefined ? '-' : minted} / 333</p>
          <br />
        </div>
      </div>
    </div>
  );
}

/*
 const deploy_rarities = async () => {
    const rarities = [
      "Epic",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Mythical",
"Legendary",
"Epic",
"Epic",
"Mythical",
"Legendary",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Mythical",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Mythical",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Mythical",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Mythical",
"Legendary",
"Mythical",
"Mythical",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Mythical",
"Mythical",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Mythical",
"Legendary",
"Legendary",
"Legendary",
"Mythical",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Mythical",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Mythical",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Mythical",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Mythical",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Mythical",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Mythical",
"Epic",
"Mythical",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Mythical",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Mythical",
"Epic",
"Legendary",
"Epic",
"Epic",
"Mythical",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Mythical",
"Epic",
"Epic",
"Legendary",
"Mythical",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Mythical",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Legendary",
"Mythical",
"Epic",
"Mythical",
"Legendary",
"Legendary",
"Mythical",
"Legendary",
"Epic",
"Epic",
"Legendary",
"Epic",
"Epic",
"Epic",
"Mythical",
"Epic",
"Legendary",
"Legendary",
"Mythical",
"Legendary",
"Legendary",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Mythical",
"Legendary",
"Mythical",
"Epic",
"Legendary",
"Epic",
"Legendary",
"Legendary",
"Epic",
"Legendary",
"Epic",
"Epic",
"Mythical",
"Epic",
"Epic",
"Epic",
"Epic",
"Epic",
    ];
    const tx = new TransactionBlock();
    for (let index = 0; index < rarities.length; index++) {
      tx.moveCall({
        target: SMART_CONTRACTS.DEPLOY_RARITIES_FUNCTION,
        arguments: [
          tx.object(SMART_CONTRACTS.NFT_COLLECTION_ADDRESS),
          tx.pure(rarities[index])
        ],
      });
    }
    signAndExecuteTransactionBlock({ transactionBlock: tx }).then(
      (res) => {
        console.log(res);
        toast("Mint successful");
        //loadNFT();
      }
    )
      .catch(
        (err) => {
          toast(err.message);
          console.log(err.message);
        }
      );
  };

  const deploy_whitelist = async () => {
    const whitelist = [
"0x30485ec983c318d6f033c752db01f667b5a72c797087752f9ec7ae0310e46e99",
"0x48dd62d95119c844ac712f423fa06c4dd73e633649c4cc2d84b805f7580c6078",
"0x5200cd2212506c4be19a304440d24baa0c7f21a6b5021d15b8f93b9e69da35d5",
"0x2e950fd2e934c0f321cf13c5e1dfb7679673293dab1a2108708979ef5372f1e8",
"0x8b4afa2f7fb6dcc69706d49aae297ca30d799fd1c3b1b119fce4f1376c419eb8",
"0xb00b13fbd8cb651253666d5cf8594cb84bf4a47c1029185d509d669f257c48bf",
"0xcf1667eb50c6fc5663963402a1849c4f79ca2723bab8ebdce6519cf25fc4dc9b",
"0xd9e83ff7287d0b5432b024dcc9093b9954979ed451cad661dce3e1f28345f44f",
"0xc4722b229e7522fefe7cabb85afe959fa889609d4ca2ec3c0a1f442c9f9f1f92",
"0xb1bcdff7f20be1b7b7270bec208f50ba749fd0e63792514da982b03f3bb48d5d",
"0xecde8544c54882c0367f11427a46c7f6fae1e0419c24ea14ecacef27c095859b",
"0xe79c2824b69c27fc849eb8acb60f20e4fcac8b761500dc8c3b76d1c469a7abeb",
"0xb4c0c26b323c76dc5453942bf015a5ef77f7706c9b4f946b196a5258fa91eb79",
"0xf5c843a3c994768b1f30bcf82095592fc20bd4078db7a4906a472389099cd5fc",
"0xe1d213d3bae71751686e214e87810ed14d041bde67e90f2f3b9bac504b93bb32",
"0xba199bfc6709acd65c969c56a2b5e4871436f7d6161c5abe289ddf5236e70fdb",
"0x94a7417548ea7a28bac19e8c17f28a7d3ce3e7c0ba61067817088b31905e13d8",
"0x6e0046d887f3b4fc6c0bdb8a7a3ccc30a6adefba6ee84b1315e5d5bfc5d109d9",
"0x1b307b9d0cd28844869eb4e20ca98d448106be00e6f1b31a65fc38c3ea0c2d22",
"0x3ad5107f55ac7b3e5b601d6ed008ab34622888703804149a5a8ab25836fc2bf5",
"0xc8dc39a633375d988864b2a7d62e9fcab0f680a59f8633504749c2156bebb114",
"0x115f58a3332364e3a0fae7c2f249556a776e3e11d623bb9e3c06fe96e6b40b2a",
"0x73a79da507b6372c02d9f5d96c15eac424233edb0c21d1b550f5247ec88d1b36",
"0x269834fec3376c759769b1033b9e4538f421aba70c3f39cdee6d78812ffa9d64",
"0xbe3b8a2555387b0cc36a614512b77af60161f2837c037bfe44f9564f321d5bda",
"0x45eee807b6d6cccb1c6adfb0d4c59350adac74353af5b7f7ead7116e445974af",
"0x45092c341fd96a307ebc521e007841e5e8c3ba5b6fe9e1bd05f97641b926e983",
"0x0545d892b2a8131f7ebb1f5b273c89f7a58bdcaf8fc631f9deb8ca5bf9f23fc7",
"0x7a8cf403964c4003d18ca3ffe5e3ad2f5b1b8a28f1506c06c2b6ba2e25076cbd",
"0x89537157a7bb08b220e7a02dfb1f186884ea17bc2d4790330f46fbfa2e130d03",
"0x30006ca737ad9ee82ad9b2d00e2ca479415127a09201f314ba0b633383a6afd3",
"0x1fbb6a77354937325b3cb443c108049e788ade323d0c48d28dbb22ed992f57ed",
"0x758645889729b6c0f7f8452a6d05cc979ce95e71537ee391b6696f2a08b6d39e",
"0x94a7a2c6cb8d3c8d8767a4aeadcf2b04798f5dbf5d558663c273fda529ac24e2",
"0xa87da7eb4b67dc37976b69242832e039333542277f595690066b51c5fd4dc3e0",
"0xba76c85826e44a1a78f3b671946d360aed344c8dc11c575d30a0f106aae8185b",
"0x91940fc03124487ae688b02592fccb72fc9ff83ea38f37e8558a1fcc30127820",
"0xa12710c4fe7f953a77c4e4af439f115dd08d9d6eca3b5cb87d34ebcf1b7e7047",
"0x61eda12469b386908fd4a673833586ae942d4031641500a09e6be8413abe8e6d",
"0xfa50da9d98b087f966c28248b4ceb6ab2987e9dfdd4d605b59998b3aa174dad0",
"0x76926fb1ace52ced1901e1e4b5409742d2557658448147a32927a7db86d88b37",
"0xa49a9eb78f6d57cc49f816c45eca10850c7a09f7a3c2aadd303878981fe7718a",
"0x7383a6709d1b77a6450e8e1d653c210135534f9387628630997b4f6725e8a4ff",
"0xf6ce74e6df077602e46dd782351ca206ff7a36e5ca5538993eca60316c5da7c0",
"0x64a1f40f93809dc116e6036c6a2c447ce5528ceba0d0baab61d5e19d7c0e9868",
"0xbdecfb2c3ae13b0fd6103d89a59c46c8d90c84eecea4a0b1371805325596bd80",
"0xf64afad8d5445e954c18c8055ae817ec51d405ba5dfa8ba5124129f19d51cc2c",
    ];
    const tx = new TransactionBlock();
    for (let index = 0; index < whitelist.length; index++) {
      tx.moveCall({
        target: SMART_CONTRACTS.DEPLOY_WHITELIST_FUNCTION,
        arguments: [
          tx.object(SMART_CONTRACTS.NFT_COLLECTION_ADDRESS),
          tx.pure(whitelist[index])
        ],
      });
    }
    signAndExecuteTransactionBlock({ transactionBlock: tx }).then(
      (res) => {
        console.log(res);
        toast("Mint successful");
        //loadNFT();
      }
    )
      .catch(
        (err) => {
          toast(err.message);
          console.log(err.message);
        }
      );
  };

  const deploy_freemint = async () => {
    const freemint = [
"0x30485ec983c318d6f033c752db01f667b5a72c797087752f9ec7ae0310e46e99",
"0xba199bfc6709acd65c969c56a2b5e4871436f7d6161c5abe289ddf5236e70fdb",
"0xdfbb19bcb9b05df921beb29b906b8bcfac3f4a88317970aa9102fd106ed1a1ca",
"0xe1d213d3bae71751686e214e87810ed14d041bde67e90f2f3b9bac504b93bb32",
"0x889cf78ad2d18347dd96c15610182faadae96224cdc4ddc6493eea0f6a260d4c",
"0xfa1da19a1624e946204ed8114167c393da29eb93b90f2111e1ecbd2e5f570156",
"0xbf8630af2b34ba048f7bbb2541a861ecde90b7006b7305fdc15d187aa198a71b",
"0xc9c2cf7ff96ecd14281179591073c9f3ce0701a589a607a03776430f0f4eefa8",
"0x368c61bdb95293e3a1975fff08eccdb6e5f9b6b14216807c6dffa0b5d06bb42d",
"0x1b5679a500575261c888c011067ce27b65028d126487c77dd2744fb001cb0707",
"0xa626859c3ee3ba7596948bf20465ed5d73d6be1c46ae4d7100c6787b85e987e0",
"0x658dab09206f6e2085f560ef669bf5a6c273c607d95b717feedfc7a22b88f617",
"0x9ca6d7a14f99e2c1fd808d67df5fc39e3b91a76a830cfc33fc446b91acc3420f",
"0xdde10bf0c36e3c12eb76cd44d834edc919abe040f04629ecbea74566b8c68074",
"0x6c0ab37a950c958e6376dbf02e0fc2b18c32c3625d2c1f936a7b20e582743d7a",
"0x94a7417548ea7a28bac19e8c17f28a7d3ce3e7c0ba61067817088b31905e13d8",
"0xf5c843a3c994768b1f30bcf82095592fc20bd4078db7a4906a472389099cd5fc",
"0x63fb42b243eae3a09b3a027149e93ebe741373335ed8acf4c7a7f05b0db3e2dd",
"0x719b1d97698b4e0416fb3c2004fd501430f432c594dbaf8896ad4c0208a7c437",
"0xe79c2824b69c27fc849eb8acb60f20e4fcac8b761500dc8c3b76d1c469a7abeb",
"0xf5d1038b1a3c9da0865a99ac70ca97b6cd37034c20c280a81aa5b22e83bcc6ec",
"0xb3393e7acfada28343e65e4b445f5671ab334461a9b5e8c8490b09932bc31c3e",
"0x94a7a2c6cb8d3c8d8767a4aeadcf2b04798f5dbf5d558663c273fda529ac24e2",
"0x84f24a9d3a2611886e6dd1b4977ff24861c89261431e267f52c489965d4002ca",
"0xba76c85826e44a1a78f3b671946d360aed344c8dc11c575d30a0f106aae8185b",
"0xd2d4b787edd9e4c8a120b1f0045339033ad825a285e0269f3f922ec6c9486178",
"0x3e631254de9acc100f11498e939fb93f47eea78e1ffcd110708ff8304b769ef8",
"0x539cef03d57a1606efc624c94eb96384d32975f1f3f61dfc09be5f26c0d27fa4",
"0xfafa9d7927f54dac1f5130650f427e70ebd54201da33eddf1e165ed64e6426c6",
"0x56408b20059c1f80e1be569dd2b6747ffb1a9e151e7e6534e6676a483ba9d4fb",
"0xeb85fb4deea24513f8e7ad60505d650cf2b17f6c3f64a6b52200d1f4032d77c4",
"0x1b852e1f76b52b77ce56f3514dc66a29aa7b547dc22c52009f8c72b1125f8dfa",
"0xe9f5096ea0578db66ca53cfcac12fee03045102ed9ab1c7c6a8f2041055903e9",
"0x8648e141aba384db87378fa883ecbe1ed2756412601f403e1af9acbfeb22b81b",
"0xb0b439c2c0255970e6f0fb9f77050ed22b9d356cd0e3e650e8d49edebab4971b",
"0x4cb142a8b8f55dbad6237f5527b806dc5cfa9c451c1fe15903bfa8fc43f24d19",
"0x229efe76dcff87bfca54d5c6a319dd2509cafedd5b1498a5c8b09064b593ec84",
"0x60250103e8e44854a858e1116209a640729013dec25a08a33b99d448f2b5d1c7",
"0x352208a1115fc678b9d68b2aac6b106a3e021c1e7044fc87bcce8a92be6f8b87",
"0x4272b86e331db4925f3b71f41aa173c4164bd469706f39f3a2d4db83502e661a",
    ];
    const tx = new TransactionBlock();
    for (let index = 0; index < freemint.length; index++) {
      tx.moveCall({
        target: SMART_CONTRACTS.DEPLOY_FREEMINT_FUNCTION,
        arguments: [
          tx.object(SMART_CONTRACTS.NFT_COLLECTION_ADDRESS),
          tx.pure(freemint[index])
        ],
      });
    }
    signAndExecuteTransactionBlock({ transactionBlock: tx }).then(
      (res) => {
        console.log(res);
        toast("Mint successful");
        //loadNFT();
      }
    )
      .catch(
        (err) => {
          toast(err.message);
          console.log(err.message);
        }
      );
  };
*/
