import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import nftImg from "~/assets/images/nft/nft4.png";

interface NFTProps {
  imgSrc?: string;
  width?: number;
  className?: string;
  name?: string;
  link?: string;
}
export default function NFT(props:NFTProps) {
let {imgSrc, width, className, name, link} = props;
  return (
    <div className={`rounded-[20px] border p-3.5 bg-fog-1 ${className}`}>
          <div className={`h-72 w-30 nft-image rounded-[20px] relative overflow-hidden `}>
            <img
              src={nftImg}
              className="w-full h-full object-cover object-center relative"
            />
            <div className="absolute inset-0 top-3 left-3 ntf-vote font-semibold">
              150 Votes
            </div>
          </div>
          <div className="nft-pre-infor flex justify-between my-2">
            <div className="nft-name font-semibold">3D Art</div>
            <div className="nft-like flex items-center ">
              <FaRegHeart color="red" />
              &nbsp;300
            </div>
          </div>
          <div className="nft-desc text-fog-2  my-2">Descriptions</div>
          <div className="nft-more-infor font-semibold flex justify-between  my-2">
            <div className="bidding-time ">6d 12h 30ph 50s</div>
            <div className="nft-ada">1600 ADA</div>
          </div>
        </div>
  )
}
