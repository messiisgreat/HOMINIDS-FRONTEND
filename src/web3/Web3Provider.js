import React from 'react';
import { useState, useCallback } from 'react';
import Web3Context from './Web3-context.js';
import Web3 from 'web3';

const Web3Provider = (props) => {
  const [WalletAccounts, setWalletAccount] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [web3, setWeb3] = useState(undefined);

  const checkAccountConnected = useCallback(async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const acc = await web3.eth.getAccounts();
      if (acc.length > 0) {
        setIsWalletConnected(true);
        setWalletAccount(acc);
        setWeb3Instance(web3);
      } else {
        setIsWalletConnected(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const setWeb3Instance = (web3) => {
    try {
      setWeb3(web3);
      window.ethereum.on('accountsChanged', function () {
        checkAccountConnected();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const setDefault = () => {
    setWalletAccount([]);
    setIsWalletConnected(false);
    setWeb3(undefined);
  };

  // Assign all data
  const web3Context = {
    isWalletConnected: isWalletConnected,
    WalletAccounts: WalletAccounts,
    web3: web3,
    mainAccount: WalletAccounts[0],

    setWalletAccount: setWalletAccount,
    setIsWalletConnected: setIsWalletConnected,
    setWeb3Instance: setWeb3Instance,
    checkAccountConnected: checkAccountConnected,
    setDefault: setDefault,
  };

  return (
    <React.Fragment>
      <Web3Context.Provider value={web3Context}>{props.children}</Web3Context.Provider>
    </React.Fragment>
  );
};

export default Web3Provider;
