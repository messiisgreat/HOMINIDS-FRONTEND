import React from 'react';

export default function CollectionTable() {
  return (
    <table className="mt-[62px] w-full">
      <thead className="">
        <tr className="nato-fontfamily text-2xl font-black" style={{ lineHeight: '28.8px' }}>
          <th className="pb-5">Collection</th>
          <th className="pb-5">Floor</th>
          <th className="pb-5">Offer</th>
          <th className="pb-5">24h Vol</th>
          <th className="pb-5">24h % Vol</th>
          <th className="pb-5">Sales</th>
          <th className="pb-5">Total Vol</th>
          <th className="pb-5">Owners</th>
          <th className="pb-5">Supply</th>
        </tr>
      </thead>
      <tbody className=" nato-fontfamily text-lg font-bold leading-[21.6px]">
        <tr>
          <td className="flex items-center gap-[10px] pb-5 text-center justify-center">
            1{' '}
            <img className="h-12 w-12" width={48} height={48} src="/assets/images/bg.png" alt="" />
            Hominids
          </td>
          <td className="pb-5  text-center text-[#50BD75]">1672 SUI</td>
          <td className="pb-5  text-center text-[#AF50BD]">1672 SUI</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center text-[#F8B22A] flex items-center justify-center gap-2">
            <img className="h-6 w-6" width={24} height={24} src="/assets/images/Play.svg" alt="" />0.76%</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">888</td>
        </tr>
        <tr>
          <td className="flex items-center gap-[10px] pb-5 text-center justify-center">
            2{' '}
            <img className="h-12 w-12" width={48} height={48} src="/assets/images/bg.png" alt="" />
            Hominids
          </td>
          <td className="pb-5  text-center text-[#50BD75]">1672 SUI</td>
          <td className="pb-5  text-center text-[#AF50BD]">1672 SUI</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center text-[#F8B22A] flex items-center justify-center gap-2">
            <img className="h-6 w-6" width={24} height={24} src="/assets/images/Play.svg" alt="" />0.76%</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">888</td>
        </tr>
        <tr>
          <td className="flex items-center gap-[10px] pb-5 text-center justify-center">
            3{' '}
            <img className="h-12 w-12" width={48} height={48} src="/assets/images/bg.png" alt="" />
            Hominids
          </td>
          <td className="pb-5  text-center text-[#50BD75]">1672 SUI</td>
          <td className="pb-5  text-center text-[#AF50BD]">1672 SUI</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center text-[#F8B22A] flex items-center justify-center gap-2">
            <img className="h-6 w-6" width={24} height={24} src="/assets/images/Play.svg" alt="" />0.76%</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">888</td>
        </tr>
        <tr>
          <td className="flex items-center gap-[10px] pb-5 text-center justify-center">
            4{' '}
            <img className="h-12 w-12" width={48} height={48} src="/assets/images/bg.png" alt="" />
            Hominids
          </td>
          <td className="pb-5  text-center text-[#50BD75]">1672 SUI</td>
          <td className="pb-5  text-center text-[#AF50BD]">1672 SUI</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center text-[#F8B22A] flex items-center justify-center gap-2">
            <img className="h-6 w-6" width={24} height={24} src="/assets/images/Play.svg" alt="" />0.76%</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">888</td>
        </tr>
        <tr>
          <td className="flex items-center gap-[10px] pb-5 text-center justify-center">
            5{' '}
            <img className="h-12 w-12" width={48} height={48} src="/assets/images/bg.png" alt="" />
            Hominids
          </td>
          <td className="pb-5  text-center text-[#50BD75]">1672 SUI</td>
          <td className="pb-5  text-center text-[#AF50BD]">1672 SUI</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center text-[#F8B22A] flex items-center justify-center gap-2">
            <img className="h-6 w-6" width={24} height={24} src="/assets/images/Play.svg" alt="" />0.76%</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">1672 SUI</td>
          <td className="pb-5  text-center">888</td>
          <td className="pb-5  text-center">888</td>
        </tr>
      </tbody>
    </table>
  );
}
