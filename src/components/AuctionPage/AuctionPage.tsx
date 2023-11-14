import CurrentMintCard from './CurrentMintCard';
import FinishedAuctions from './FinishedAuctions';

export default function AuctionPage() {
  return (
    <div className={`relative pt-20`}>
      <div className="flex items-center gap-6 text-xl leading-6">
        <div>MAIN</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">Marketplace</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">Auction</div>
      </div>
      <div
        className="Black-fontfamily mt-14 text-center text-[64px] font-black uppercase leading-[80px]"
        style={{ marginBottom: '69px' }}
      >
        Auctions
      </div>
      <div
        className="rounded-[40px] border-solid text-[#b780ff8c]"
        style={{
          border: '3px solid #b780ff8c',
          backgroundColor: '#b780ff14',
          // borderImageSource:
          //   'linear-gradient(107.18deg, #5D3068 1.11%, rgba(199, 173, 255, 0.2) 44.61%, #5D3068 97.47%)',
        }}
      >
        <div
          className="flex justify-between rounded-[40px]"
          style={{
            gap: '34px',
            // padding: '3px',
            // background:
            //   'linear-gradient(107.18deg, #5D3068 1.11%, rgba(199, 173, 255, 0.2) 44.61%, #5D3068 97.47%), linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))',
          }}
        >
          <div
            className="nato-fontfamily flex w-full flex-col items-start justify-start py-[45.5px] pl-[64px]"
            style={{
              paddingLeft: '64px',
              paddingTop: '45.5px',
              paddingBottom: '45.5px',
              gap: '29px',
            }}
          >
            <div className="Black-fontfamily text-[40px] leading-[50px]">
              The Breaker by Kirin Labs
            </div>
            <div className="text-2xl uppercase leading-[28.8px]">
              You are eligible to claim O HOMI
            </div>

            <div className="flex justify-between">
              <div className="flex items-start gap-[10px]">
                <img
                  className="h-12 w-12"
                  width={48}
                  height={48}
                  src="/assets/images/avatar.png"
                  alt=""
                />
                <div className="nato-fontfamily flex flex-col gap-1">
                  <div className="text-lg leading-[21.6px] text-[#9D9999]">Created by</div>
                  <div className=" text-lg font-bold leading-[21.6px]">Hominids</div>
                </div>
              </div>
              <div className="nato-fontfamily text-xl leading-6" style={{ width: '534px' }}>
                The Breaker - The time and space disruptor, weaving reality to their enigmatic will.
                Let&apos;s welcome… &apos;THE BREAKER&apos; One-of-a-kind art, but benefits too?…
              </div>
            </div>
            <CurrentMintCard />
            <div className="nato-fontfamily w-full rounded-[100px] bg-[#AF50BD] px-10 py-5 text-base font-medium uppercase leading-[19.2px]">
              Place your bid
            </div>
          </div>
          <img
            src="/assets/images/hominid1.png"
            width={567}
            height={567}
            className="rounded-[40px]"
          />
        </div>
      </div>
      <FinishedAuctions />
      <img
        className="rounded-bg left-[-200px] top-[-200px] h-[992px] w-[900px]"
        width={900}
        src="/assets/connectBtns/Ellipse64.png"
        alt=""
      />
      <img
        className="rounded-bg right-[50px] top-[-200px] h-[992px] w-[900px]"
        width={900}
        src="/assets/connectBtns/Ellipse64.png"
        alt=""
      />
      <img
        className="absolute"
        style={{ top: '270px', left: '-130px', transform: 'rotate(25.29deg)' }}
        width={30}
        src="/assets/connectBtns/Star1.png"
        alt=""
      />
      <img
        className="absolute"
        style={{ top: '210px', left: '1130px', transform: 'rotate(30deg)' }}
        width={56}
        src="/assets/connectBtns/Star2.png"
        alt=""
      />
    </div>
  );
}
