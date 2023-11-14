import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import WalletNotConnected from 'public/assets/icons/wallet-not-connected';
import { useState } from 'react';

const TransferTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  console.log('***************', data);

  return (
    <Tabs value={data[activeTab].value}>
      <TabsHeader>
        {data.map(({ label, value }, index) => (
          <div className="relative w-full">
            <Tab
              key={value}
              value={value}
              className="z-20 w-full py-12"
              onClick={() => setActiveTab(index)}
            >
              {label}
            </Tab>
            <img
              className={
                activeTab === index ? 'absolute z-10 flex w-full' : 'absolute z-0 hidden w-full'
              }
              style={{
                top: '3px',
                left: '0px',
                height: data.length > 2 && index === 1 ? '103%' : '171%',
              }}
              width={56}
              src={
                index === 0
                  ? '/assets/images/first_tab.png'
                  : data.length > 2 && index === 1
                  ? '/assets/images/middle_tab.png'
                  : '/assets/images/last_tab.png'
              }
              alt=""
            />
          </div>
        ))}
      </TabsHeader>
      <TabsBody
        style={{
          backgroundImage: 'url("/assets/images/tab_body.png")',
          // height: "100%",
          // width: "100%",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <TabPanel
          key={'Transfer'}
          value={'Transfer'}
          className="flex w-full flex-col items-center justify-center"
          style={{ height: '646px' }}
        >
          <div className="mb-20 ml-[108px] w-full text-[#AAA5A5]">
            <div className="Inter-fontfamily text-base">Enter your name:</div>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1 rounded-2xl border-[1px] border-solid border-[#434243] bg-transparent px-[23px] py-[18px] align-top text-[16px] text-white outline-none"
            />
          </div>
          <div className="flex items-center justify-center">
            <WalletNotConnected width="72" height="72" />
            <div
              className="nato-fontfamily text-2xl font-black"
              style={{ marginLeft: '32px', lineHeight: '28.8px' }}
            >
              Transfer
            </div>
          </div>
        </TabPanel>
        <TabPanel
          key={'Reedeem'}
          value={'Reedeem'}
          className="flex items-center justify-center"
          style={{ height: '646px' }}
        >
          <WalletNotConnected width="72" height="72" />
          <div
            className="nato-fontfamily text-2xl font-black"
            style={{ marginLeft: '32px', lineHeight: '28.8px' }}
          >
            Reedeem
          </div>
        </TabPanel>
        <TabPanel
          key={'History'}
          value={'History'}
          className="flex items-center justify-center"
          style={{ height: '646px' }}
        >
          <WalletNotConnected width="72" height="72" />
          <div
            className="nato-fontfamily text-2xl font-black"
            style={{ marginLeft: '32px', lineHeight: '28.8px' }}
          >
            History
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default TransferTab;
