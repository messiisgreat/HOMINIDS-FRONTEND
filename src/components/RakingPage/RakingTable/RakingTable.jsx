import React from 'react';

export default function RakingTable() {
  return (
    <table className="mt-[42px] w-full">
      <thead className="">
        <tr className="nato-fontfamily text-2xl font-black" style={{ lineHeight: '28.8px' }}>
          <th className="pb-5">Collection</th>
          <th className="pb-5">Volume</th>
          <th className="pb-5">% Change</th>
          <th className="pb-5">Floor price</th>
          <th className="pb-5">Sales</th>
          <th className="pb-5">% Unique owners</th>
          <th className="pb-5">% Items listed</th>
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
          <td className="pb-5  text-center text-[#F8B22A] flex items-center justify-center gap-2">
            <img className="h-6 w-6" width={24} height={24} src="/assets/images/Play.svg" alt="" />0.76%</td>
          <td className="pb-5  text-center">0.01 ETH</td>
          <td className="pb-5  text-center"> 4 015</td>
          <td className="pb-5  text-center">20%</td>
          <td className="pb-5  text-center">12%</td>
        </tr>
      </tbody>
    </table>
  );
}
