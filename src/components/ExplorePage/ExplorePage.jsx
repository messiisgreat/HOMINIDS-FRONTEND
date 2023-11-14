
import { Collections } from '@components/common/';

export default function ExplorePage() {
  return (
    <div className="relative mb-[219px] mt-20">
      <div className="mb-14 flex items-center gap-6 text-xl leading-6">
        <div>MAIN</div>
        {/* <div className="w-10 border-[1px] h-0" style={{
        backgroundImage: 'linear-gradient(180deg, #111012 0%, #AF50BD 39.58%, #AF50BD 58.33%, #121013 100%)',
      // borderImageSource: 'linear-gradient(180deg, #111012 0%, #AF50BD 39.58%, #AF50BD 58.33%, #121013 100%)'
    }}
      ></div> */}
        <img src="/assets/connectBtns/Vector4587.png" alt="a" />
        <div className="uppercase">Explore</div>
      </div>
      <img
        className="rounded-bg-rotation left-[217px] top-[-217px]"
        src="/assets/connectBtns/Ellipse62.png"
        alt="a"
      />
      <img
        className="rounded-bg left-[946px] top-[210px] z-10 !opacity-100"
        width={56}
        src="/assets/connectBtns/Star2.png"
        alt=""
      />
      <img
        className="rounded-bg left-[-141.5px] top-[2750px] z-10 !opacity-100"
        width={56}
        src="/assets/connectBtns/Star2.png"
        alt=""
      />
      <div className="flex flex-col gap-[140px]">
        <Collections title={'Trending Collections'} mainTitle="Explore our marketplace" />
        <Collections title={'Latest Drops'} mainTitle="Latest Drops" />
        <Collections title={'Gaming Collection'} mainTitle="Gaming Collection" />
      </div>
    </div>
  );
}
