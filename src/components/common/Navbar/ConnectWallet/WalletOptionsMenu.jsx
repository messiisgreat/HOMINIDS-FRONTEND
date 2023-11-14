import React, { useState } from 'react';
import { useRef } from 'react';

import WalletOptions from './WalletOptions';

const WalletOptionsMenu = (props) => {
  const chainRef = useRef();
  const [ID, setID] = useState('POLY');

  const selectChainHandler = (e) => {
    const CHAIN = e.target.id;
    if (CHAIN === '') return;
    setID(CHAIN);
  };

  return (
    <React.Fragment>
      {/* <div className={props.classes['chain-menu']}>
        <ul onClick={selectChainHandler} ref={chainRef}>
          <li className={ID === 'POLY' && props.classes['active-chain']} id="POLY">
            <img src="/assets/chainLogo/poly.svg" alt="poly" />
            Polygon
          </li>
          <li className={ID === 'SUI' && props.classes['active-chain']} id="SUI">
            <img src="/assets/chainLogo/sui.svg" alt="sui" />
            Sui
          </li>
          <li className={ID === 'VENOM' && props.classes['active-chain']} id="VENOM">
            <img src="/assets/chainLogo/btc.svg" alt="btc" />
            BRC-20
          </li>
          <li className={ID === 'ZETA' && props.classes['active-chain']} id="ZETA">
            <img src="/assets/chainLogo/zeta.svg" alt="zeta" />
            Zeta
          </li>
        </ul>
      </div> */}

      <WalletOptions
        id={ID}
        setIsBitgetConnected={props.setIsBitgetConnected}
        setIsXdefiConnected={props.setIsXdefiConnected}
        setConnectedAccount={props.setConnectedAccount}
      />
    </React.Fragment>
  );
};

export default WalletOptionsMenu;
