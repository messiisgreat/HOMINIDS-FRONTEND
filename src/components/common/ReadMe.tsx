import React from 'react';

const ReadMe = () => {
  return (
    <>
      <div
        className="flex justify-between rounded-full relative"
        style={{
          backgroundColor: '#b780ff14',
          border: '3px solid #b780ff8c',
        }}
      >
        <div style={{
          paddingLeft: '123px',
          paddingTop: '64px',
          paddingBottom: '44px',}}>
          <div className=' text-xl nato-fontfamily' style={{lineHeight: '24.6px'}}>Dive into the Era-Homi metaverse!</div>
          <div className='mt-4 Black-fontfamily font-black text-2xl' style={{lineHeight: '29.52px', width: '475px'}}>
            Enjoy a never-before-seen social and artistic experience within our connected metaverse
          </div>
          <div
            className={`flex gap-[10px] rounded-full font-medium text-base uppercase !text-white mt-5`}
            style={{
              background:
                'linear-gradient(97.97deg, #F8D46B 1.78%, #A74FBE 37.37%, #302072 89.89%)',
                padding: '34px 74px',
                lineHeight: "19.2px"
            }}
          >
            read more about us
          </div>
        </div>
        <div className='rounded-full overflow-visible flex justify-center' style={{
          backgroundColor: '#b780ff14',
          border: '3px solid #b780ff8c',
          width: '800px',
        //   height: '349px'
        }}>
        {/* <img src='/assets/images/Mask.png' width={700} height={349} style={{
            // height:'349px !important'
        }}
        //  className='absolute' style={{top: '292px', right:'538px'}} 
         /> */}
        </div>
        <img src='/assets/images/Mask.png' width={700} 
         className='absolute' style={{top: '-69px', right:'43px'}} 
         />
      </div>
    </>
  );
};

export default ReadMe;
