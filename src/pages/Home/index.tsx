import React from "react";
import { NFT, NFTModal, UserRow } from "~/components";
import NFTCategory from "~/components/NFTCategory";
import SlideHaft from "~/components/SlideArea";

export default function Home() {
  
  return (
    <div className="py-12">
       
      <div id="nft-category">
        <div className="text-3xl font-semibold text-center mb-12">
          NFT Category
        </div>
        <SlideHaft
            className ="category"
          autoPlay={false}
          lstComponent={[
            <NFTCategory label="Art" />,
            <NFTCategory label="Song" />,
            <NFTCategory label="Abstract" />,
            <NFTCategory label="Song" />,
            <NFTCategory label="Brain" />,
            <NFTCategory label="Video" />,
            <NFTCategory label="Brand" />,
            <NFTCategory label="Coca" />
          ]}
        />
      </div>
      <div id="area-onauction" className="my-12 mt-24">
        <div className="container max-w-7xl flex items-center mb-8">
          <span className="font-semibold text-3xl">NFTs on Voting</span>
        </div>
        <SlideHaft
         className ="onauction"
          lstComponent={[
            <NFT onBidding={false} />,
            <NFT onBidding={false} />,
            <NFT onBidding={false} />,
            <NFT onBidding={false} />,
            <NFT onBidding={false} />,
            <NFT onBidding={false} />,
          ]}
        />
      </div>
      <div id="area-onbidding" className="my-12 mt-24">
        <div className="container max-w-7xl flex items-center mb-8">
          <span className="font-semibold text-3xl">NFTs on Bidding</span>
        </div>
        <SlideHaft
         className ="onbidding"
          lstComponent={[
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
          ]}
        />
      </div>
      <div id="area-top-user" className="my-12 mt-24 container max-w-7xl">
        <div className="flex items-center mb-8">
          <span className="font-semibold text-3xl">Top users on Auction</span>
        </div>
        <div className="rounded-[20px] bg-fog-4 py-10 px-10 mt-8 grid grid-cols-3 gap-x-28 gap-y-10">
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />

        </div>
      </div>
    </div>
  );
}
