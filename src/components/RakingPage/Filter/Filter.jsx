import ArrowDown from '../../../../public/assets/icons/arrow-down';

export default function FilterPage() {
  return (
    <>
      <div className="flex justify-between px-10 pt-10">
        <div
          className="nato-fontfamily mr-8 flex items-center justify-center rounded-[100px] border-[1px] border-solid border-[#5d306857] bg-[#5d306827] px-8 py-4 text-2xl font-medium leading-[30.24px]"
          style={{ padding: '16px 48px', backgroundColor: '#5d306827', borderColor: '#5d306857' }}
        >
          <div>All categories</div>
          <ArrowDown width="10" height="24" />
        </div>
        <div className="nato-fontfamily mr-[80px] flex items-center justify-center text-2xl font-medium leading-[30.24px]">
          <div
            className="rounded-[40px] px-8 py-4 w-fit"
            style={{
              background: 'linear-gradient(135.35deg, #5D3068 15.71%, #111012 42.68%)',
              background:
                'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
              border: '1px solid',
              borderImageSource: 'linear-gradient(135.35deg, #5D3068 15.71%, #111012 42.68%)',
            }}
          >
            All chains
          </div>
          <div className="rounded-[40px] px-8 py-4">1h</div>
          <div className="rounded-[40px] px-8 py-4">6h</div>
          <div className="rounded-[40px] px-8 py-4">6h</div>
        </div>
        <div className="nato-fontfamily mr-[82px] flex items-center justify-center text-2xl font-medium leading-[30.24px]">
          <div className="rounded-[40px] px-8 py-4">1h</div>
          <div className="rounded-[40px] px-8 py-4">6h</div>
          <div
            className="rounded-[40px] px-8 py-4"
            style={{
              background: 'linear-gradient(135.35deg, #5D3068 15.71%, #111012 42.68%)',
              background:
                'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
              border: '1px solid',
              borderImageSource: 'linear-gradient(135.35deg, #5D3068 15.71%, #111012 42.68%)',
            }}
          >
            24h
          </div>
          <div className="rounded-[40px] px-8 py-4">6h</div>
        </div>
      </div>
    </>
  );
}
