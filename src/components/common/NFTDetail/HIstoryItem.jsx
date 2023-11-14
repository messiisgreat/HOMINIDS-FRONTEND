import React from 'react';
import { IoPersonSharp } from 'react-icons/io5';

export default function HIstoryItem() {
  return (
    <div className="mt-3 flex flex-row justify-between rounded-2xl bg-[#030303] px-6 py-5">
      <div className="flex flex-row items-center gap-3">
        <IoPersonSharp className="text-2xl text-secondary" />
        <div>
          <p className="text-sm font-medium">Sold for 100 $Homi</p>
          <p className="mt-1 text-xs text-gray">Mar 18st 2023, 5:56:25 am</p>
        </div>
      </div>
      <p className="text-sm text-secondary"></p>
    </div>
  );
}
