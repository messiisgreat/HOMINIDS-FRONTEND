import React from 'react';
import UserItem from './UserItem';

const TopSellers = () => {
  const userData = [
    { image: '/assets/images/avatar.png', name: '@dajfs', sub: '21887 SUI' },
    { image: '/assets/images/avatar1.png', name: 'pogg', sub: '21887 SUI' },
    { image: '/assets/images/avatar2.png', name: '@dsvvsd', sub: '21887 SUI' },
    { image: '/assets/images/avatar.png', name: '@dajfs', sub: '21887 SUI' },
    { image: '/assets/images/avatar1.png', name: 'pogg', sub: '21887 SUI' },
    { image: '/assets/images/avatar2.png', name: '@dsvvsd', sub: '21887 SUI' },
    { image: '/assets/images/avatar.png', name: '@dajfs', sub: '21887 SUI' },
    { image: '/assets/images/avatar1.png', name: 'pogg', sub: '21887 SUI' },
    { image: '/assets/images/avatar2.png', name: '@dsvvsd', sub: '21887 SUI' },
  ];
  return (
    <>
      <div className=" relative">
        <div className="Black-fontfamily text-center text-[64px] font-black uppercase leading-[80px] text-[#FFFFFF]">
          Top sellers this month
        </div>
        <div className="mt-14 flex justify-between" style={{ gap: '34px' }}>
          <div
            className=" flex flex-col border-[3px] border-solid border-[#5D3068]"
            style={{
              borderRadius: '40px',
              gap: '44px',
              padding: '56px 100px 56px 56px',
              border: '3px solid #b780ff8c',
              backgroundColor: '#b780ff14',
              width: '460px',
            }}
          >
            {userData.map(
              (item, index) =>
                index < 3 && (
                  <UserItem key={index} id={index} image={item.image} name={item.name} sub={item.sub} />
                )
            )}
          </div>
          <div
            className="flex border-[3px] border-solid border-[#5D3068]"
            style={{
              gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
              borderRadius: '40px',
              gap: '44px',
              columnGap: '135px',
              padding: '56px 157px 56px 56px',
              border: '3px solid #b780ff8c',
              backgroundColor: '#b780ff14',
              width: '948px',
            }}
          >
            <div className="flex flex-col" style={{ gap: '44px' }}>
              {userData.map(
                (item, index) =>
                  index > 2 &&
                  index < 6 && (
                    <UserItem key={index} id={index} image={item.image} name={item.name} sub={item.sub} />
                  )
              )}
            </div>
            <div className="flex flex-col" style={{ gap: '44px' }}>
              {userData.map(
                (item, index) =>
                  index > 5 && (
                    <UserItem key={index} id={index} image={item.image} name={item.name} sub={item.sub} />
                  )
              )}
            </div>
          </div>
        </div>
        <img
          className="absolute"
          style={{ transform: 'rotate(30deg)', top: '-180px', left: '-65px', opacity: '.3' }}
          width={683}
          src="/assets/images/Ellipse61.png"
          alt=""
        />
        <img
          className="absolute top-0"
          style={{ transform: 'rotate(21deg)', right: '85px', opacity: '.3' }}
          width={700}
          src="/assets/images/Ellipse661.png"
          alt=""
        />
      </div>
    </>
  );
};

export default TopSellers;
