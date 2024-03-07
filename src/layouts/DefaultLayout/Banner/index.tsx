import React from "react";
//banner
import banner from "~/assets/images/nft/nft3.png"
import banner2 from "~/assets/images/nft/nft6.png"
const bannerStyle = {
  backgroundPosition: "50%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 59.67%, #A259FF 100%)",
};

interface BannerProps{
    isBannerEmpty?:Boolean;
    pageName?:string;
}
export default function Banner(props: BannerProps) {
  let {isBannerEmpty = false, pageName=""} = props;
  return (
    <div id="banner" className="h-full relative">
      <img
        src={!isBannerEmpty?banner:banner2}
        className="w-full h-full object-cover object-center relative"
      />
      <div className="absolute inset-0 bg-fog-3"></div>
      <div className="absolute inset-0 z-8" style={bannerStyle}></div>
      {!isBannerEmpty&&<div className="absolute right-0 z-9 left-0 bottom-0 top-3/4 container max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="text-3xl">
            <p>Explore NFT on Auction, bid, buy, sell</p>
            <p>Create your own NFTs</p>
          </div>
          <div>
            <button className="rounded-[40px] bg-fog-1 px-16 py-4 border border-white">
              Explore now
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
}
