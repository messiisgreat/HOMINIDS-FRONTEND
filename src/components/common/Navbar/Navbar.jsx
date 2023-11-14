// import next js files
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// import components
import Logo from './Logo';

import WalletConnectBtn from './ConnectWallet/WalletConnectBtn';
import ConnectedWalletMenu from './ConnectWallet/ConnectedWalletMenu';
// import style files
import classes from '@styles/compenentsStyle/common/Navbar/Navbar.module.css';

// import components
import ChainLogos from './ChainLogos';
import SearchBar from './SearchBar';
import SwapDropDownMenu from './SwapDropDownMenu';
import StakingDropDownMenu from './StakingDropDownMenu';
import ConnectModal from './ConnectWallet/ConnectModal';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

// import Web3Context from 'src/web3/Web3-context';

function getProvider() {
  if (window.bitkeep && window.bitkeep.ethereum !== undefined) {
    const provider = new ethers.providers.Web3Provider(window.bitkeep && window.bitkeep.ethereum);
    if (provider === undefined) {
      window.open('https://web3.bitget.com/en/wallet-download?type=2');
      throw 'Please go to our official website to download!!';
    }
    return { provider: provider, chainId: provider.provider.networkId };
  }
  return { provider: null, chainId: null };
}

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const [connectedAccount, setConnectedAccount] = useState();
  const [isBitgetConnected, setIsBitgetConnected] = useState(false);
  const [isXdefiConnected, setIsXdefiConnected] = useState(false);
  const [chainId, setChainId] = useState(null);

  console.log( connectedAccount, " Connected" );
  // console.log('xdefi :', isXdefiConnected);
  // State variables
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isBtnClikced, setIsBtnClicked] = useState(false);

  // Handler Functions
  const connectWalletClikedHandler = () => {
      setIsBtnClicked(!isBtnClikced);
  };

  const toogleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    const { provider, chainId: xchain } = getProvider();

    if (provider !== null && xchain !== null) {
      setChainId(xchain); // Set initial chainId

      const handleChainChange = (newChainId) => {
        setChainId(newChainId);

        // console.log('chiand changed : ', newChainId);
      };

      provider.provider.on('chainChanged', handleChainChange);
    }
  }, []);

  useEffect(()=>{
    if(connectedAccount ){
      setIsBtnClicked(false)
    }
  },[ connectedAccount ])

  return (
    <React.Fragment>
      {isBtnClikced && !isBitgetConnected.selectedAddress ? (
        <ConnectModal
          setIsBitgetConnected={setIsBitgetConnected}
          setIsXdefiConnected={setIsXdefiConnected}
          setConnectedAccount={setConnectedAccount}
          classes={classes}
          onClick={connectWalletClikedHandler}
        />
      ) : null}
      <nav className={classes.navbar}>
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className={classes.menu} onClick={toogleMenu}>
              <span className={classes.bar}></span>
              <span className={classes.bar}></span>
              <span className={classes.bar}></span>
            </div>

            <ul className={classes['main-list']} style={{ marginLeft: '79px' }}>
              <Logo className={classes.logo} />
              <li className="gap-7">
                <ChainLogos chainId={chainId} />

                <div className={`${classes.links} ${menuIsOpen ? classes.active : ''}`}>
                  <ul
                    className="flex h-full items-center gap-3 rounded-[99px] border-[3px] border-[#5D3068] px-10 py-[17.5px]"
                    style={{
                      border: '3px solid #5d3068',
                      backgroundImage:
                        'linear-gradient(107.18deg, #5D3068 1.11%, rgba(199, 173, 255, 0.2) 44.61%, #5D3068 97.47%), linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))',
                      // borderImageSource:
                      //   'linear-gradient(107.18deg, #5D3068 1.11%, rgba(199, 173, 255, 0.2) 44.61%, #5D3068 97.47%)',
                    }}
                  >
                    <li className="!m-0">
                      <Link
                        href="/list-nft"
                        className="text-[14px] uppercase leading-[19.2px] hover:text-secondary"
                      >
                        LIST NFT
                      </Link>
                    </li>

                    <li className="!m-0">
                      <Link
                        href="/buy-nft"
                        className="text-[14px] uppercase leading-[19.2px] hover:text-secondary"
                      >
                        BUY NFT
                      </Link>
                    </li>

                    {/* <li className="!m-0 uppercase">
                      <StakingDropDownMenu />
                    </li>

                    <li className="!m-0 uppercase">
                      <SwapDropDownMenu />
                    </li> */}
                  </ul>
                </div>
                <SearchBar classes={classes} />

                {address || isBitgetConnected.selectedAddress || isXdefiConnected ? (
                  <ConnectedWalletMenu
                    address={address || isBitgetConnected.selectedAddress || isXdefiConnected}
                  />
                ) : (
                  <>
                    <WalletConnectBtn classes={classes} onClick={connectWalletClikedHandler} />
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
