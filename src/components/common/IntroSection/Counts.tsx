import React from 'react';

const Counts = () => {
  return (
    <>
      <div className="flex justify-between uppercase" style={{ gap: '94.25px' }}>
        <div className='flex flex-col gap-2'>
          <div className='nato-fontfamily font-black text-5xl' style={{lineHeight : "57.6px"}}>950</div>
          <div className='Actay-fontfamily text-2xl' style={{ lineHeight: "29.81px"}}>ART WORKS</div>
        </div>
        <img src="/assets/images/Vector4586.png" alt="a" />
        <div className='flex flex-col gap-2'>
          <div className='nato-fontfamily font-black text-5xl' style={{lineHeight : "57.6px"}}>214</div>
          <div className='Actay-fontfamily text-2xl' style={{ lineHeight: "29.81px"}}>Artist</div>
        </div>
        <img src="/assets/images/Vector4586.png" alt="a" />
        <div className='flex flex-col gap-2'>
          <div className='nato-fontfamily font-black text-5xl' style={{lineHeight : "57.6px"}}>651</div>
          <div className='Actay-fontfamily text-2xl' style={{ lineHeight: "29.81px"}}>auction</div>
        </div>
      </div>
    </>
  );
};
export default Counts;
