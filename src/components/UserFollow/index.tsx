import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { RiNftLine } from "react-icons/ri";
import { RiAuctionLine } from "react-icons/ri";
import nftImg from "~/assets/images/nft/nft4.png";

interface PropsFollow {
  className?: string;
}
export default function UserFollow(props: PropsFollow) {
  let { className } = props;
  return (
    <div
      className={`flex justify-between items-center cursor-pointer ${className}`}
    >
      <div id="follow-user-infor" className="flex items-center justify-start">
        <div
          id="follow-user-image"
          className="me-3 h-24 w-24 rounded-lg overflow-hidden"
        >
          <img
            src={nftImg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div id="follow-user-desc">
          <div id="follow-user-name" className="mb-5">Lorem</div>
          <div id="follow-user-more" className="text-fog-1">
            View infor
          </div>
        </div>
      </div>
      <div id="follow-hot-archive" className="flex justify-end items-center">
        <div id="follow-status" className="text-right me-8">
          <div className="flex mb-5">
            <div id="follow-view" className="flex items-center me-4">
              <span style={{ color: "rgba(0, 255, 117, 0.50)" }} className="me-1">
                1231&nbsp;
              </span>
              <MdOutlineRemoveRedEye size="1.5em" />
            </div>
            <div id="follow-like" className="flex items-center" >
              <span style={{ color: "rgba(0, 255, 117, 0.50)" }} className="me-1">
                1231&nbsp;
              </span>
              <FaRegHeart size="1.2em" />
            </div>
          </div>
          <div className="flex">
            <div id="follow-view" className="flex items-center me-4">
              <span style={{ color: "rgba(0, 255, 117, 0.50)" }} className="me-1">
                1231&nbsp;
              </span>
              <RiNftLine size="1.5em" />
            </div>
            <div id="follow-like" className="flex items-center">
              <span style={{ color: "rgba(0, 255, 117, 0.50)" }} className="me-1">
                1231&nbsp;
              </span>
              <RiAuctionLine size="1.2em" />
            </div>
          </div>
        </div>
        <div className="me-4 h-24 w-24 rounded-lg overflow-hidden">
          <img
            src={nftImg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="me-4 h-24 w-24 rounded-lg overflow-hidden">
          <img
            src={nftImg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="me-4 h-24 w-24 rounded-lg overflow-hidden">
          <img
            src={nftImg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="h-24 w-24 rounded-lg overflow-hidden">
          <img
            src={nftImg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
