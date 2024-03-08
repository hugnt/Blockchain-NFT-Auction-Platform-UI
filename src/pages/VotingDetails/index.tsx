import React from "react";
import "./VotingDetails.css";
import { NFT, NFTOnVoting } from "~/components";
import SlideHaft from "~/components/SlideArea";

export default function VotingDetails() {
  return (
    <div className="py-12">
      <div id="area-onvoting" className="container max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div className="font-semibold text-2xl">On Voting</div>
          <span
            style={{ color: "rgba(0, 255, 117, 0.50)" }}
            className="cursor-pointer"
          >
            View more
          </span>
        </div>
        <div
          id="lst-voting-nft"
          className="mb-20 rounded-[20px] bg-fog-4 py-10 px-8 mt-8  grid grid-cols-2 gap-y-14 gap-x-28"
        >
          <NFTOnVoting className="" />
          <NFTOnVoting className="" />
          <NFTOnVoting className="" />
          <NFTOnVoting className="" />
          <NFTOnVoting className="" />
          <NFTOnVoting className="" />
          <NFTOnVoting className="" />
          <NFTOnVoting className="" />
        </div>
      </div>
      <div id="area-onauction" className="mb-12">
        <div className="container max-w-7xl flex items-center mb-12">
          <span className="font-semibold text-2xl">List NFT on  Auction</span>
        </div>
        <SlideHaft lstComponent={[<NFT onBidding={false}/>, <NFT onBidding={false}/>, <NFT onBidding={false}/>, <NFT onBidding={false}/>, <NFT onBidding={false}/>, <NFT onBidding={false}/>]}/>
      </div>
    </div>
  );
}
