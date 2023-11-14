import React, { useState } from 'react';
import {
  Navbar,
  //  Footer, 
   LeftMenu
} from '../../common';
// import Background from './Background';
//import { WalletKitProvider } from "@mysten/wallet-kit";
import { WalletProvider } from '@suiet/wallet-kit';
import Web3Provider from 'src/web3/Web3Provider';

import Head from 'next/head';
// import { useState } from 'react';
/*import {
  WalletProvider,
  SuiWallet,
  //defineWallet*/

/*const CustomizeWallet = defineWallet({
  name: "BitKeep wallet",
  iconUrl: "/assets/images/BitKeeplogo.svg",
  downloadUrl: {
    browserExtension: 'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak'
  },
})
<WalletProvider chains={[{
        id: "dev",
        name: "devnet",
        rpcUrl: "https://explorer-rpc.devnet.sui.io/",
      }]} defaultWallets={[
        SuiWallet,
      ]}>*
*/

const Layout = ({ children }) => {
  const [isShowMenu, setisShowMenu] = useState(false);

  return (
    <>
      <WalletProvider>
        <Web3Provider>
          <div>
            <Head>
              <title>Era Homi</title>
              <link rel="icon" type="image/jpeg" href="/photo_2023-10-31_09-27-45.jpg" />
            </Head>

            {/* <Background /> */}
            <div className="flex bg-[#111012] overflow-hidden">
              <LeftMenu isShowMenu={isShowMenu} setisShowMenu={setisShowMenu} />
              <div
                //  className={`pl-0 ${isShowMenu ? "pl-[310px]" : "pl-[60px]"} py-10 min-h-screen pt-20`}
                className="flex w-full items-center justify-center pt-[183px]"
              >
                <Navbar />

                {/* <img
                  src="/assets/banner.svg"
                  width={'100%'}
                  alt="banner Logo"
                  style={{ marginTop: '5.2rem' }}
                /> */}
                <div className="container mx-[240px]">{children}</div>
                {/* <Footer /> */}
              </div>
            </div>
          </div>
        </Web3Provider>
      </WalletProvider>
    </>
  );
};

export default Layout;
