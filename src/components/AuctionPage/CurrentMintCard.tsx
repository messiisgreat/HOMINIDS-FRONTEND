import React from 'react';

const CurrentMintCard = () => {
  return (
    <>
      <div>
        <div
          className="flex justify-between"
          style={{
            backgroundColor: '#492072',
            borderRadius: '40px',
            paddingTop: '28px',
            paddingBottom: '28px',
            paddingRight: '59px',
            paddingLeft: '47px',
          }}
        >
          <div className="nato-fontfamily flex flex-col gap-3">
            <div className="text-lg" style={{ color: '#9D9999', lineHeight: '21.6px' }}>
              Current mint
            </div>
            <div
              className="text-5xl"
              style={{ lineHeight: '57.6px', color: '#AF50BD', fontWeight: 800 }}
            >
              1672 SUI
            </div>
            <div className="text-lg" style={{ color: '#9D9999', lineHeight: '21.6px' }}>
              ~$736.43
            </div>
          </div>
          <div className="nato-fontfamily flex flex-col gap-3">
            <div className="text-lg" style={{ color: '#9D9999', lineHeight: '21.6px' }}>
              Auction ended
            </div>
            <div className="flex" style={{ gap: '39px' }}>
              <div
                className="text-5xl"
                style={{ lineHeight: '57.6px', color: '#AF50BD', fontWeight: 800 }}
              >
                08
              </div>
              <div
                className="text-5xl "
                style={{ lineHeight: '57.6px', color: '#AF50BD', fontWeight: 800 }}
              >
                23
              </div>
              <div
                className="text-5xl"
                style={{ lineHeight: '57.6px', color: '#AF50BD', fontWeight: 800 }}
              >
                06
              </div>
            </div>
            <div className="flex" style={{ gap: '33px' }}>
              <div className="text-lg" style={{ color: '#9D9999', lineHeight: '21.6px' }}>
                Hours
              </div>
              <div className="text-lg" style={{ color: '#9D9999', lineHeight: '21.6px' }}>
                Minutes
              </div>
              <div className="text-lg" style={{ color: '#9D9999', lineHeight: '21.6px' }}>
                Seconds
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex text-xs uppercase" style={{ lineHeight: '14.4px' }}>
          <div>LAST BID BY&nbsp;</div>
          <div className="" style={{ textUnderlineOffset: '1px', textDecorationLine: 'underline' }}>
            jdhwsj_01
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentMintCard;
