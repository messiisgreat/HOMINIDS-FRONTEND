import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import WalletNotConnected from 'public/assets/icons/wallet-not-connected';
import { useState } from 'react';
import RakingTable from '../RakingTable/RakingTable';
import FilterPage from '../Filter/Filter';

const RakingTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Tabs value={data[activeTab].value} onChange={setActiveTab}>
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
              style={{ top: '4.82px', left: '0px', height: '171%' }}
              width={56}
              src={index === 0 ? '/assets/images/first_tab.png' : '/assets/images/last_tab.png'}
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
          key={'All collections'}
          value={'All collections'}
          className=""
          style={{ height: '646px' }}
        >
          <FilterPage />
          <RakingTable />
        </TabPanel>
        <TabPanel
          key={'My watchlist'}
          value={'My watchlist'}
          className="flex items-center justify-center"
          style={{ height: '646px' }}
        >
          <WalletNotConnected width="72" height="72" />
          <div
            className="nato-fontfamily text-2xl font-black"
            style={{ marginLeft: '32px', lineHeight: '28.8px' }}
          >
            My watchlist
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default RakingTab;
