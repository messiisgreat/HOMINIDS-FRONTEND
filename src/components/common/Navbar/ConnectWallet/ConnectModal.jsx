import React from 'react';

import WalletOptionsMenu from './WalletOptionsMenu';

const ConnectModal = (props) => {
  return (
    <React.Fragment>
      <div className={props.classes['connect-modal']} onClick={props.onClick}></div>
      <div id="modal-menu" className={props.classes['modal-menu']}>
        <h1>Connect a wallet to continue</h1>
        <p>
          Choose how you want to connect. If you do not have a wallet, you can select a provider and
          create one.
        </p>
        <WalletOptionsMenu
          setIsBitgetConnected={props.setIsBitgetConnected}
          setIsXdefiConnected={props.setIsXdefiConnected}
          setConnectedAccount={props.setConnectedAccount}
          classes={props.classes}
        />
      </div>
    </React.Fragment>
  );
};

export default ConnectModal;
