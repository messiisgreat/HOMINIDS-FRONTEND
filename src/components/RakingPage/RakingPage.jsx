import RakingTab from './RakingTab/RakingTab';

export default function RakingPage() {
  const data = [
    {
      label: 'All collections',
      value: 'All collections',
    },
    {
      label: 'My watchlist',
      value: 'My watchlist',
    },
  ];

  return (
    <div className="relative mt-20">
      <div className="flex items-center gap-6 text-xl leading-6">
        <div>MAIN</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">Marketplace</div>
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">Ranking</div>
      </div>
      <h1 className="Black-fontfamily mb-6 mt-14 text-center text-[64px] font-black uppercase leading-[80px]">
      Ranking
      </h1>
      <div className="mb-[328px] mt-[104px]">
        <RakingTab data={data} />
      </div>
      <img
        className="rounded-bg left-[-200px] top-[-350px] h-[992px] w-[900px]"
        width={900}
        src="/assets/connectBtns/Ellipse64.png"
        alt=""
      />
      <img
        className="rounded-bg right-[50px] top-[-350px] h-[992px] w-[900px]"
        width={900}
        src="/assets/connectBtns/Ellipse64.png"
        alt=""
      />
      <img
        className="rounded-bg left-[200px] top-[150px] z-10 !opacity-100"
        width={30}
        src="/assets/connectBtns/Star1.png"
        alt=""
      />
      <img
        className="rounded-bg right-[-150px] top-[280px] z-10 !opacity-100"
        width={56}
        src="/assets/connectBtns/Star2.png"
        alt=""
      />
    </div>
  );
}
