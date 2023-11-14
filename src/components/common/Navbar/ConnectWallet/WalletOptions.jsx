import React, { useState, useEffect } from 'react';
import classes from '@styles/compenentsStyle/common/Navbar/ConnectWallet/WalletOptions.module.css';
import { useConnect } from 'wagmi';

const WalletOptions = (props) => {
  console.log('dsss', props);
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  function useBitgetWallet() {
    const [provider, setProvider] = useState(null);

    useEffect(() => {
      // Check if Bitget Wallet provider is available, otherwise, provide a link for download
      const bitgetProvider = window.bitkeep && window.bitkeep.ethereum;
      if (!bitgetProvider) {
        window.open('https://web3.bitget.com/en/wallet-download?type=2');
        return;
      }

      setProvider(bitgetProvider);
      props.setIsBitgetConnected(bitgetProvider);

      // Remove listeners when the address or network changes
      bitgetProvider.on('accountsChanged', (accounts) => {
        props.setConnectedAccount(accounts[0]);
      });

      bitgetProvider.on('chainChanged', (chainId) => {
        console.log('Chain ID changed:', chainId);
      });

      return () => {
        // Clean up listeners when the component unmounts
        bitgetProvider.removeAllListeners('accountsChanged');
        bitgetProvider.removeAllListeners('chainChanged');
      };
    }, []);

    return provider;
  }

  // use xdefi wallet
  function useXDEFIWallet() {
    const [provider, setProvider] = useState(null);

    console.log('provider : ', provider);

    useEffect(() => {
      const xdefiPprovider = window.xfi && window.xfi.bitcoin;
      if (!xdefiPprovider) {
        console.log('xdefi wallet is not installed');
        return;
      }

      setProvider(xdefiPprovider);

      console.log({ xdefiPprovider });

      props.setIsXdefiConnected(xdefiPprovider);

      // Remove listeners when the address or network changes
      xdefiPprovider.on('accountsChanged', (accounts) => {
        console.log({ accounts });
        console.log('Accounts changed:', accounts);
      });

      xdefiPprovider.on('chainChanged', (chainId) => {
        console.log('Chain ID changed:', chainId);
      });

      return () => {
        // Clean up listeners when the component unmounts
        xdefiPprovider.removeAllListeners('accountsChanged');
        xdefiPprovider.removeAllListeners('chainChanged');
      };
    }, []);

    return provider;
  }

  const bitProvider = useBitgetWallet();
  const connectToBitgetWallet = async () => {
    if (bitProvider) {
      try {
        await bitProvider.request({ method: 'eth_requestAccounts' });
        console.log('Connected to Bitget Wallet');
      } catch (error) {
        console.error('Error connecting to Bitget Wallet:', error);
      }
    }
  };

  const xDefiProvider = useXDEFIWallet();

  const connectToXdefiWallet = async () => {
    console.log('in option : ', xDefiProvider);
    if (xDefiProvider) {
      try {
        await xDefiProvider.request({ method: 'request_accounts', params: [] }, (error, accounts) =>
          console.log(`Bitcoin accounts ${accounts}`)
        );
      } catch (error) {
        console.error('Error connecting to XDefi Wallet:', error);
      }
    }
  };

  const Zeta = () => {
    return (
      <div>
        <ul className={classes.wallets}>
          {connectors.map((connector) => (
            <li
              style={{ marginBottom: '-30px' }} // Adjust the margin as needed
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              <img
                src={`/assets/walletIcons/${connector.name}.svg`}
                className={classes['wallet-icon']}
                alt={connector.name}
              />
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
            </li>
          ))}

          <li
            style={{ marginBottom: '5px' }} // Adjust the margin as needed
            onClick={connectToBitgetWallet}
          >
            <img
              src={`/assets/chainLogo/bitget.svg`}
              className={classes['wallet-icon']}
              alt={'bitget'}
            />
            Bitget
          </li>

          <li
            style={{ marginBottom: '5px' }} // Adjust the margin as needed
            onClick={connectToXdefiWallet}
          >
            <img
              src={`/assets/chainLogo/bitget.svg`}
              className={classes['wallet-icon']}
              alt={'xdefi'}
            />
            XDefi
          </li>

          {error && <div className="ms-4">{error.message}</div>}
        </ul>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Zeta />
      {/* Add other chain options */}
    </React.Fragment>
  );
};

export default WalletOptions;
