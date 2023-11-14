import React from 'react';
import Image from 'next/image';

// import Chain Logos
import polyLogo from 'public/assets/chainLogo/poly.svg';
import suiLogo from 'public/assets/chainLogo/sui.svg';
import zetaLogo from 'public/assets/chainLogo/zeta.svg';
import btcLogo from 'public/assets/chainLogo/btc.svg';

// import style files
import classes from '@styles/compenentsStyle/common/Navbar/Navbar.module.css';

const ChainLogos = (props) => {
  const chainId = props.chainId;

  const getLogoAndHighlight = (logo, isHighlighted) => {
    const logoSize = isHighlighted ? 48 : 32;
    const logoClassName = isHighlighted ? classes['highlighted-logo'] : classes['chain-logo'];

    return (
      <Image
        className={logoClassName}
        src={logo}
        alt={props.chainName}
        width={logoSize}
        height={logoSize}
      />
    );
  };

  const renderChainLogos = () => {
    const isPoly = chainId === '0x13881';
    const isZeta = chainId === '0x1b59'; // Check if the chain ID is for Zeta
    return (
      <div
        className={`flex items-center gap-3 rounded-[1000px] px-6 py-[8px] ${
          isPoly ? classes['highlighted-chain'] : isZeta ? classes['highlighted-chain'] : ''
        }`}
        style={{
          border: '3px solid #5d3068',
          backgroundImage: `linear-gradient(107.18deg, #5D3068 1.11%, rgba(199, 173, 255, 0.2) 44.61%, #5D3068 97.47%), linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)`,
        }}
      >
        {getLogoAndHighlight(polyLogo, isPoly)}
        {getLogoAndHighlight(zetaLogo, isZeta)}
        {getLogoAndHighlight(suiLogo, chainId === 'sui')}
        {getLogoAndHighlight(btcLogo, chainId === 'btc')}
      </div>
    );
  };

  return <React.Fragment>{renderChainLogos()}</React.Fragment>;
};

export default ChainLogos;
