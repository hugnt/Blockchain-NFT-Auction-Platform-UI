import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { LuVote } from "react-icons/lu";

import nftImg from "~/assets/images/nft/nft4.png";
interface PropsVoting {
  className?: string;
}
export default function NFTOnVoting(props: PropsVoting) {
  let { className } = props;
  return (
    <div
      className={`flex justify-between items-center cursor-pointer ${className}`}
    >
      <div id="voting-nft-infor" className="flex items-center justify-start">
        <div className="me-5 font-semibold text-xl">1</div>
        <div
          id="voting-nft-image"
          className="me-3 h-32 w-32 rounded-lg overflow-hidden"
        >
          <img
            src={nftImg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div id="voting-nft-desc" className="h-32 flex flex-col justify-between">
          <div>
              <div id="voting-nft-name" className="mb-1 text-xl">Lorem</div>
              <div id="nft-view" className="flex items-center me-4 mb-1">
                <span style={{ color: "rgba(0, 255, 117, 0.50)" }}>1231&nbsp;</span>
                <MdOutlineRemoveRedEye size="1.5em" />
              </div>
              <div id="nft-like" className="flex items-center">
                <span style={{ color: "rgba(0, 255, 117, 0.50)" }}>1231&nbsp;</span>
                <FaRegHeart size="1.2em" />
              </div>
          </div>
          <div id="voting-nft-more" className="text-fog-1">
            View infor
          </div>
        </div>
      </div>
      <div id="voting-status" className="h-32 text-right flex flex-col justify-between">
        <div className="text-right">
            <div className="mb-2">
              Currrent Votes
            </div>
            <div id="voting-number" className="flex items-center justify-end" style={{ color: "rgba(0, 255, 117, 0.50)" }}>
              1231 &nbsp;<LuVote size={"1.5em"}/>
            </div>
        </div>
        <button className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2">
            Vote now
        </button>
      </div>
    </div>
  );
}
