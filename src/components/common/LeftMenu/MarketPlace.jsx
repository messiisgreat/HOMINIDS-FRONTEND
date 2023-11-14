import React from 'react';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BiChevronUp } from 'react-icons/bi';

const MarketPlace = (props) => {
  const [isMarketPlaceOpen, setisMarketPlaceOpen] = useState();

  const marketPlaceHandler = () => {
    setisMarketPlaceOpen(!isMarketPlaceOpen);
  };

  return (
    <React.Fragment>
      <img
        src="/assets/LeftMenu/marketPlace.png"
        alt="icon"
        className={`${props.isShow ? props.classes.hide : props.classes.icon}`}
      />
      <button onClick={marketPlaceHandler} className={props.isShow ? '' : props.classes.hide}>
        <img src="/assets/LeftMenu/marketPlace.png" alt="icon" className={props.classes.icon} />
        Marketplace
        {isMarketPlaceOpen ? (
          <BiChevronUp className={props.classes.arrow} />
        ) : (
          <BiChevronDown className={props.classes.arrow} />
        )}{' '}
      </button>
      <ul
        className={`${isMarketPlaceOpen ? props.classes['market-place-item'] : props.classes.hide}`}
      >
        <li>Item - 1</li>
        <li>Item - 1</li>
        <li>Item - 1</li>
      </ul>
    </React.Fragment>
  );
};

export default MarketPlace;
