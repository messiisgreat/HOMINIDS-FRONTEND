import React, { useState, useEffect } from 'react';
import { list } from '../../backendConnectors/eraConnector';
import { FaCamera } from 'react-icons/fa';

export default function ListNftPage() {
  const [nftContractAddress, setNftContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [paymentTokenAddress, setPaymentTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [minAmount, setMinAmount] = useState();
  const [maxAmount, setMaxAmount] = useState(5);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toggle, setToggle] = useState('list');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log({
        nftAddress: nftContractAddress,
        tokendId: tokenId,
        paymentToken: paymentTokenAddress,
        ask: amount,
      });
      // Call the list function with the form values
      const result = await list({
        nftAddress: nftContractAddress,
        tokendId: tokenId,
        paymentToken: paymentTokenAddress,
        ask: amount,
      });

      if (result.success) {
        // Transaction was successful
        console.log('Transaction was successful.');
      } else {
        // Transaction failed
        console.error('Transaction failed:', result.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  return (
    <div className="mb-40 mt-20 flex items-center justify-center rounded-3xl bg-[#2727279e] text-white">
      <div className="flex w-full max-w-md flex-col rounded-lg py-12">
        <div className="mb-2 flex w-max items-center justify-center self-center rounded-xl  bg-[#ffffff1e]  ">
          <div
            className={` cursor-pointer rounded-xl p-4 text-center text-2xl transition-colors hover:bg-gray-700 ${
              toggle === 'list' ? `bg-[#fefefe56]` : ''
            }`}
            onClick={() => {
              setToggle('list');
            }}
          >
            List NFT
          </div>
          <div
            className={` cursor-pointer rounded-xl p-4 text-center text-2xl transition-colors hover:bg-gray-700 ${
              toggle === 'auction' ? `bg-[#ffffff1e]` : ''
            }`}
            onClick={() => {
              setToggle('auction');
            }}
          >
            Auction NFT
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          {/* <img className="mb-6 w-full" src="assets/images/hominid2.png" alt="img" /> */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="relative block h-64 w-full cursor-pointer overflow-hidden rounded-md bg-gray-100"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-gray-500 font-bold text-[#3c3838]">Select image +</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <FaCamera className="h-8 w-8 text-white" />
              </div>
            </label>
          </div>
          <div className="">
            <label htmlFor="nftContractAddress" className="block text-lg font-semibold">
              NFT Contract Address
            </label>
            <input
              type="text"
              id="nftContractAddress"
              value={nftContractAddress}
              onChange={(e) => setNftContractAddress(e.target.value)}
              className="my-3 w-full rounded-lg border bg-white p-3  text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
              // required
            />
          </div>
          <div>
            <label htmlFor="tokenId" className="block text-lg font-semibold">
              Token ID
            </label>
            <input
              type="text"
              id="tokenId"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="my-3 w-full rounded-lg border bg-white p-3 text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
              // required
            />
          </div>
          <div>
            <label htmlFor="paymentTokenAddress" className="block text-lg font-semibold">
              Payment Token Address
            </label>
            <input
              type="text"
              id="paymentTokenAddress"
              value={paymentTokenAddress}
              onChange={(e) => setPaymentTokenAddress(e.target.value)}
              className="my-3 w-full rounded-lg border bg-white p-3 text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
              // required
            />
          </div>
          {toggle === 'list' && (
            <div>
              <label htmlFor="amount" className="block text-lg font-semibold">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="my-3 w-full rounded-lg border bg-white p-3 text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
                // required
              />
            </div>
          )}
          <>
            {toggle === 'auction' && (
              <div className="flex flex-wrap">
                <div className=" w-3/6 ">
                  <label htmlFor="amount" className="block text-lg font-semibold">
                    Start
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="my-3 w-full rounded-lg border bg-white p-3 text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
                    // required
                  />
                </div>
                <div className=" w-3/6 ">
                  <label htmlFor="amount" className="block text-lg font-semibold">
                    Expiration
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="my-3 w-full rounded-lg border bg-white p-3 text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
                    // required
                  />
                </div>
                <div className=" w-3/6 ">
                  <label htmlFor="amount" className="block text-lg font-semibold">
                    Min Bid
                  </label>
                  <input
                    type="number"
                    id="minBid"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="my-3 w-full rounded-lg border bg-white p-3 text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
                    // required
                  />
                </div>
                <div className=" w-3/6 ">
                  <label htmlFor="amount" className="block text-lg font-semibold">
                    Min Bid Increment(%)
                  </label>
                  <input
                    type="number"
                    id="maxBid"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="my-3 w-full rounded-lg border bg-white p-3 text-black shadow-md focus:border-blue-300 focus:outline-none focus:ring"
                    // required
                  />
                </div>
              </div>
            )}
          </>
          <div>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
