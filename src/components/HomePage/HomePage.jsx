'use client';
import React from 'react';
import { Category } from '@components/common/';
import TopCollections from '../common/Collections/TopCollections';
import ReadMe from '../common/ReadMe';
OurPartners;
import TopSellers from '../common/TopSellers';
HowItWorks;
import OurPartners from '../common/OurPartners';
ContactUs;
import HowItWorks from '../common/HowItWorks';
import ContactUs from '../common/ContactUs';
import MarketPlace from '../common/MarketPlace/MarketPlace';
import IntroSection from '../common/IntroSection/IntroSection';

export default function Home() {
  return (
    <>
      {/* <Launchpad /> */}
      <div>
        <IntroSection />
      </div>
      <div className="mt-44">
        <MarketPlace />
      </div>
      <div className="mt-44">
        <ReadMe />
      </div>
      <div className="mt-24">
        <TopCollections />
      </div>
      <div className="" style={{ marginTop: '200px' }}>
        <TopSellers />
      </div>
      <div style={{ marginTop: '200px' }}>
        <Category />
      </div>
      <div style={{ marginTop: '200px' }}>
        <OurPartners />
      </div>
      <div style={{ marginTop: '200px' }}>
        <HowItWorks />
      </div>
      <div style={{ marginTop: '200px', marginBottom: '470px' }}>
        <ContactUs />
      </div>
    </>
  );
}
