import React, { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BiChevronUp } from 'react-icons/bi';
import { useDisconnect } from 'wagmi';

import classes from '@styles/compenentsStyle/common/Navbar/ConnectWallet/ConnectedWallet.module.css';

const ConnectedWalletMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const [showAcc, setShowAcc] = useState('');

  // Check if props.address is defined and a non-empty string before using slice
  console.log({ chaindid: props.address.chainId });

  useEffect(() => {
    if (props.address.chainId !== 'bitcoin') {
      setShowAcc(
        props.address ? `${props.address?.slice(0, 7)}...${props.address?.slice(-3)}` : ''
      );
    } else {
      if (window.xfi && window.xfi.bitcoin) {
        window.xfi.bitcoin.request(
          { method: 'request_accounts', params: [] },
          (error, accounts) => {
            if (!error && Array.isArray(accounts) && accounts.length > 0) {
              const bitcoinAccount = accounts[0];
              setShowAcc(`${bitcoinAccount.slice(0, 4)}...${bitcoinAccount.slice(-4)}`);
            } else {
              console.error(`Error getting Bitcoin accounts: ${error}`);
            }
          }
        );
      }
    }
  }, [props.address]);

  console.log({ showAcc });

  const WOIcon = ({ src }) => {
    return <img src={src} alt="icon" className={classes.icon} />;
  };
  const specificDivRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!specificDivRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const WalletMenu = () => {
    return (
      <div className={classes['menu-area']}>
        <ul>
          <li>
            <WOIcon src={'/assets/connectBtns/myItems.png'} />
            My Items
          </li>
          <li>
            <WOIcon src={'/assets/connectBtns/myRewards.png'} />
            My Rewards
          </li>
          <li>
            <WOIcon src={'/assets/connectBtns/settings.png'} />
            Settings
          </li>

          <li onClick={disconnect}>
            <WOIcon src={'/assets/connectBtns/disruption.png'} />
            Disconnect Wallet
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className={classes['btn-area']} ref={specificDivRef}>
      <button
        className={`btn btn-sm ${classes['wallet-menu-btn']}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {showAcc}
        {isOpen ? (
          <BiChevronUp className={classes.arrow} />
        ) : (
          <BiChevronDown className={classes.arrow} />
        )}
      </button>
      {isOpen && <WalletMenu />}
    </div>
  );
};

export default ConnectedWalletMenu;
