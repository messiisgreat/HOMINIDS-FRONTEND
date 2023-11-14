import NftCard from "@components/AuctionPage/NftCard";
import React from "react";


const SelectedNFTs = () => {
    return <>
    <div className="grid gap-9" style={{
            gridTemplateColumns: 'repeat(3,minmax(0,1fr))',}}>
        <NftCard
          id={"collection.collection_address"}
          name={"collection.name"}
          image={"/assets/images/image.png"}
        />
        <NftCard
          id={"collection.collection_address"}
          name={"collection.name"}
          image={"/assets/images/image.png"}
        />
        <NftCard
          id={"collection.collection_address"}
          name={"collection.name"}
          image={"/assets/images/image.png"}
        />
        <NftCard
          id={"collection.collection_address"}
          name={"collection.name"}
          image={"/assets/images/image.png"}
        />
        <NftCard
          id={"collection.collection_address"}
          name={"collection.name"}
          image={"/assets/images/image.png"}
        />
        <NftCard
          id={"collection.collection_address"}
          name={"collection.name"}
          image={"/assets/images/image.png"}
        />
        </div>
    </>
}

export default SelectedNFTs;