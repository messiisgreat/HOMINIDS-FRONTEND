import TransferTab from './TransferTab/TransferTab';
export default function TransferPage() {
  const data = [
    {
      label: 'Transfer',
      value: 'Transfer',
      desc: `Wallet Not connected`,
    },
    {
      label: 'Reedeem',
      value: 'Reedeem',
      desc: `Wallet connected`,
    },
    {
      label: 'History',
      value: 'History',
      desc: `Wallet connected`,
    },
  ];
  return (
    <div className={`relative pt-20`}>
      <div className="flex items-center gap-6 text-xl leading-6">
        <div>MAIN</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">Marketplace</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">transfer</div>
      </div>
      <div
        className="Black-fontfamily mt-14 text-center text-[64px] font-black uppercase leading-[80px]"
        style={{ marginBottom: '69px' }}
      >
        transfer
      </div>
      <div className="mb-[328px] mt-[104px]">
        <TransferTab data={data} />
      </div>
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
