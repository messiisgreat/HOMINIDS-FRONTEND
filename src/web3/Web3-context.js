import React from 'react';

const Web3Context = React.createContext({
  isWalletConnected: false,
  web3: undefined,
  WalletAccounts: [],
  mainAccount: undefined,

  setWalletAccount: () => {},
  setIsWalletConnected: () => {},
  setWeb3Instance: () => {},

  checkAccountConnected: async () => {},
  setDefault: () => {},
});

export default Web3Context;
