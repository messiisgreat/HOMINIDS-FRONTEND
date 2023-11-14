import React, { useState } from 'react';
import AboutTab from './AboutTab';

const HowItWorks = () => {
  const [isSelected, setIsSelected] = useState('CONNECT YOUR WALLET');
  const worksData = [
    {
      title: 'CONNECT YOUR WALLET',
      description:
        'Connect your Metamask wallet by signing up in order to browse and sell your Nfs',
    },
    {
      title: 'CREATE YOUR OWN COLLECTION',
      description:
        'Connect your Metamask wallet by signing up in order to browse and sell your Nfs',
    },
    {
      title: 'ADD YOUR NTFS',
      description:
        'Connect your Metamask wallet by signing up in order to browse and sell your Nfs',
    },
    {
      title: 'PUT YOUR NTFS ON SALE',
      description:
        'Connect your Metamask wallet by signing up in order to browse and sell your Nfs',
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="Black-fontfamily flex items-center text-[64px] font-black uppercase leading-[80px] text-[#FFFFFF]">
          HOW IT WORKS?
        </div>
        {worksData.map((item, index) => (
          <div className="w-full" key={index}>
            <AboutTab
              id={index}
              title={item.title}
              description={item.description}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
            {index !== worksData.length - 1 && (
              <div
                className="w-full rounded-sm"
                style={{ backgroundColor: '#1C1D1F', height: '4px' }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
