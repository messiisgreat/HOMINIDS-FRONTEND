import React from 'react';
import SubmitForm from './SubmitForm';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
        <div className="Black-fontfamily text-[64px] font-black leading-[80px] text-[#FFFFFF]">
          Do you want to contact us?
        </div>
        <div
          className="nato-fontfamily mt-8 text-2xl"
          style={{ lineHeight: '31.2px', letterSpacing: '1px' }}
        >
          We will gladly consider your cooperation proposals
        </div>
        <div className="z-20 mt-14">
          <SubmitForm />
        </div>
        <Image
          className="absolute"
          style={{ width: '1952px !important',
                    maxWidth: 'none',
                    top: '-176px'
        }}
          src="/assets/images/bg-1.png"
          width={1952}
          height={1100}
          alt="a"
        />
      </div>
    </>
  );
};

export default ContactUs;
