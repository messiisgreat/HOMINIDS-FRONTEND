import React from 'react';
import { SectionTitle } from '../../common';
import axios from 'axios';
import { useState, useEffect } from "react";
import Link from 'next/link';



export default function Volumes() {

  const [collections, setCollections] = useState([]);

  const loadCollectionsWithVolumes = () => {  
     axios.get('/api/statscollections').then((response)=>{

      console.log(response.data.result);

      response.data.result[0].map((result,i)=>{
        result.volume_total = response.data.result[0][i]?.volume || 0;
        result.floor_price = response.data.result[1].find((e)=>e.collection_address==result.collection_address)?.floor_price || 0;
        result.listings_count = response.data.result[1].find((e)=>e.collection_address==result.collection_address)?.listings_count || 0;
        result.volume_month = response.data.result[2].find((e)=>e.collection_address==result.collection_address)?.month_volume || 0;
        result.volume_week = response.data.result[3].find((e)=>e.collection_address==result.collection_address)?.week_volume || 0;
        result.volume_day = response.data.result[4].find((e)=>e.collection_address==result.collection_address)?.day_volume || 0;
        result.volume_1h = response.data.result[5].find((e)=>e.collection_address==result.collection_address)?.hour_volume || 0;
      });

      setCollections(response.data.result[0]);

    }).catch((e)=>{console.log(e);});
  } 

  useEffect(() => {
    loadCollectionsWithVolumes();
  }, []);

  return (
    <div className="mt-24">
      <SectionTitle title="Top Collections" des={"Explore Top Collections"} />
      <div className="">
      <div className="overflow-x-auto w-full mt-12">
            <table className="table w-full table-compact" data-theme="black">
              <thead>
                <tr>
                  <th>
                   Rank
                  </th>
                  <th>
                   Collection
                  </th>
                  <th>Floor Price</th>
                  <th>Listings</th>
                  <th>Total Volume</th>
                  <th>Volume 1h</th>
                  <th>Volume 24h</th>
                  <th>Volume 7d</th>
                  <th>Volume month</th>

                </tr>
              </thead>
              <tbody>
            {collections?.map((element, i) =>
            (<tr key={i}>
              <th>
                <label>
                <div className="font-bold">{i+1}</div>
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                 <Link href={"/collection/"+element.collection_address} className="gradient-text text-sm font-medium">      
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={element.logo} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  </Link>
                  <Link href={"/collection/"+element.collection_address} className="gradient-text text-sm font-medium">
                  <div>
                    <div className="font-bold">{element.name}</div>
                  </div>
                  </Link>
                </div>
              </td>
              <td>
               <div className="font-bold">{element?.floor_price/ 10 ** 9 + ' SUI'}</div>
              </td>
              <td>
               <div className="font-bold">{element?.listings_count}</div>
              </td>
              <td>
               <div className="font-bold">{(element?.volume_total/ 10 ** 9)?.toFixed(2) + ' SUI'}</div>
              </td>
              <td>
               <div className="font-bold">{(element?.volume_1h/ 10 ** 9)?.toFixed(2) + ' SUI'}</div>
              </td>
              <td>
               <div className="font-bold">{(element?.volume_day/ 10 ** 9)?.toFixed(2) + ' SUI'}</div>
              </td>
              <td>
               <div className="font-bold">{(element?.volume_week/ 10 ** 9)?.toFixed(2) + ' SUI'}</div>
              </td>
              <td>
               <div className="font-bold">{(element?.volume_month/ 10 ** 9)?.toFixed(2) + ' SUI'}</div>
              </td>  
            </tr>)
            )}
             </tbody>
            </table>
            </div>
      </div>
    </div>
  );
}
