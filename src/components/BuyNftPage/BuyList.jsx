import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import BuyNftCard from './BuyNftCard';
import { buy, getNftLists } from '../../backendConnectors/eraConnector';
import { ColorRing } from 'react-loader-spinner';

import ReactModal from 'react-modal';
import BuyModal from './BuyModal';

ReactModal.setAppElement('#__next'); // this is for accessibility purpose. we want other page content to be hidden to assistive technology when this modal is opened
if (ReactModal.defaultStyles.overlay?.backgroundColor != null) {
  ReactModal.defaultStyles.overlay.backgroundColor = '#000000a8';
  ReactModal.defaultStyles.overlay.zIndex = 200;
}
const customStyles = {
  content: {
    display: 'flex',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};
const BuyList = () => {
  const [collections, setCollections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Buy');
  const [listedNfts, setListedNfts] = useState([]);
  const [collectionAddress, setCollectionAddress] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionImg, setCollectionImg] = useState('');
  const [collectionPrice, setCollectionPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleBuyClick = (id, name, image, price) => {
    setIsOpen(true);
    setCollectionAddress(id);
    setCollectionName(name);
    setCollectionImg(image);
    setCollectionPrice(price);
  };
  const handleBuyTransaction = async () => {
    if (buttonText === 'Buy') {
      // Only attempt to buy if the button text is 'Buy'
      try {
        const result = await buy(collectionAddress, collectionPrice);
        if (result.success) {
          console.log('NFT bought successfully');
          setButtonText('Purchased');
        } else {
          console.error('NFT purchase failed');
        }
      } catch (error) {
        console.error('Error: ' + error.message);
      }
    }
  };
  const loadCollections = () => {
    axios
      .get('/api/collections')
      .then((response) => {
        const newCollections =
          response?.data?.result?.error == undefined ? response?.data?.result : [];
        setCollections([manuallyAddedCollection, ...newCollections]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    loadCollections();
    getNftLists()
      .then((res) => {
        setIsLoading(false);
        setListedNfts(res);
      })
      .catch((error) => {
        console.error('Error loading NFT lists:', error);
      });
  }, []);
  // Manually added collection
  const manuallyAddedCollection = {
    collection_address: '',
    name: 'Hominids',
    logo: '/assets/images/hominid1.png',
  };
  return (
    <div style={{ marginTop: '153px', marginBottom: '221px' }}>
      <div className="flex items-center justify-between">
        <div className="your-div-class text-[64px] font-black uppercase leading-[80px] text-[#FFFFFF]">
          Listed
        </div>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#8d949e', '#8d949e', '#8d949e', '#8d949e', '#8d949e']}
          />
        </div>
      )}
      <Swiper slidesPerView={'auto'} spaceBetween={36} style={{ marginTop: '89px' }}>
        {listedNfts.length > 0 &&
          listedNfts.map((collection, key) => (
            <SwiperSlide key={key}>
              <BuyNftCard
                id={parseInt(collection[0])}
                name={collections[key].name}
                image={collections[key].logo}
                isOpen={isOpen}
                handleBuyClick={handleBuyClick}
                isTwoUSDT={collection[5]._hex} // Pass the isTwoUSDT prop
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <ReactModal
        isOpen={isOpen}
        onAfterClose={() => setIsOpen(false)}
        closeTimeoutMS={300}
        onRequestClose={() => setIsOpen(false)}
        contentLabel={'props.label'}
        style={customStyles}
        className={'z-50 text-white'}
      >
        <BuyModal
          setIsOpen={setIsOpen}
          handleBuyTransaction={handleBuyTransaction}
          collectionImg={collectionImg}
          collectionPrice={collectionPrice}
        />
      </ReactModal>
    </div>
  );
};

export default BuyList;
