import React from 'react';

const CurrentBuyCard = (props) => {
  return (
    <>
      <div>
        <div
          className="flex  items-center justify-between"
          style={{
            backgroundColor: '#492072',
            borderRadius: '40px',
            paddingTop: '28px',
            paddingBottom: '28px',
            paddingRight: '59px',
            paddingLeft: '47px',
          }}
        >
          <div className="nato-fontfamily flex justify-between  gap-x-40">
            <div className="text-4xl" style={{ color: '#AF50BD', fontWeight: 800 }}>
              {props.collectionPrice}
            </div>

            <button
              className="buy-button"
              style={{
                backgroundColor: '#b780ff8c', // Background color
                color: 'white', // Text color
                border: '2px solid #b780ff8c', // Border color
                borderRadius: '8px', // Border radius
                padding: '10px 20px', // Padding
                fontSize: '18px', // Font size
                fontWeight: 'bold', // Font weight
              }}
              onClick={() => props.handleBuyTransaction()}
            >
              Buy NFT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentBuyCard;
