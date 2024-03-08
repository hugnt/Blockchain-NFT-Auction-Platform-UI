import React from "react";
import nftImg from "~/assets/images/nft/nft4.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import "./BiddingDetails.css";
import { TabBox, SlideArea, NFT, BidInforRow } from "~/components";
import SlideHaft from "~/components/SlideArea";

var lstComponent = [
  <div className="rounded-[20px] bg-fog-4 py-10 px-6 mt-8">
    <BidInforRow className="mb-4" />
    <BidInforRow className="mb-4" />
    <BidInforRow className="mb-4" />
    <BidInforRow className="mb-4" />
    <div
      className="cursor-pointer text-center font-semibold mt-12"
      style={{ color: "rgba(0, 255, 117, 0.50)" }}
    >
      View More
    </div>
  </div>,
  <div className="rounded-[20px] bg-fog-4 py-10 px-6 mt-8">
    <BidInforRow className="mb-4" />
    <BidInforRow className="mb-4" />
    <BidInforRow className="mb-4" />
    <BidInforRow className="mb-4" />
    <div
      className="cursor-pointer text-center font-semibold mt-12"
      style={{ color: "rgba(0, 255, 117, 0.50)" }}
    >
      View More
    </div>
  </div>,
];
export default function BiddingDetails() {
  return (
    <div className="py-12">
      <div
        id="auction-details"
        className="container max-w-7xl flex justify-between"
      >
        <div id="bidding-infor" className="w-8/12">
          <div id="bidding-nft" className="overflow-hidden rounded-[20px]">
            <div id="nft-image" className="h-96 overflow-hidden bg-fog-1">
              <img src={nftImg} className="h-full w-full object-contain" />
            </div>
            <div id="nft-infor" className="py-4 px-8">
              <div
                id="nft-pre-infor"
                className="flex justify-between items-start cursor-pointer"
              >
                <div id="nft-author" className="flex items-center">
                  <div
                    id="author-img"
                    className="me-3 w-10 h-10 overflow-hidden rounded-full "
                  >
                    <img
                      src={nftImg}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div id="author-infor">
                    <div id="author-name">Creator</div>
                    <div id="author-desc" className="text-fog-2">
                      Twittana
                    </div>
                  </div>
                </div>
                <div id="nft-follow" className="flex justify-end">
                  <div id="nft-view" className="flex items-center me-4">
                    <span style={{ color: "rgba(0, 255, 117, 0.50)" }}>
                      1231&nbsp;
                    </span>
                    <MdOutlineRemoveRedEye size="1.5em" />
                  </div>
                  <div id="nft-like" className="flex items-center">
                    <span style={{ color: "rgba(0, 255, 117, 0.50)" }}>
                      1231&nbsp;
                    </span>
                    <FaRegHeart size="1.2em" />
                  </div>
                </div>
              </div>
              <div id="nft-details-infor">
                <div id="nft-name" className="text-4xl font-semibold my-6">
                  Amazing Digital Art
                </div>
                <div id="nft-desc" className="font-thin text-justify mb-3">
                  Tincidunt intellegam mel ne, an eam menandri invenire
                  euripidis. Ea quo utroque forensibus eloquentiam. Nam ad
                  option iisque verterem, sed nemore menandri ex. Pri ei solet
                  eripuit, et nam decore tacimates persequeris. Te nec duis
                  corpora persequeris, vix ubique graece intellegat ea.
                </div>
                <span
                  className="cursor-pointer"
                  style={{ color: "rgba(0, 255, 117, 0.50)" }}
                >
                  Read More
                </span>
              </div>
            </div>
          </div>
          <div id="bidding-history" className="my-12">
            <TabBox lstComponent={lstComponent} lstLabel={["Bids", "Owners"]} />
          </div>
        </div>
        <div id="bidding-action" className="ms-10 w-4/12 ">
          <div
            id="bid-action-box"
            className="top-12 mb-12 py-8 rounded-[20px] border border-fog-2 bg-fog-1 overflow-hidden flex flex-col items-center"
          >
            <div className="font-semibold">Bid Details</div>
            <div id="bid-action-status" className="my-3">
              Current Bid
            </div>
            <div id="bid-action-ada" className="font-semibold text-3xl">
              1311 ADA
            </div>
            <div
              id="bid-action-exchange-usd"
              className="my-3 font-semibold text-fog-2"
            >
              $564.36
            </div>
            <div>Auctions ends in</div>
            <div id="bid-action-time-end" className="font-semibold">
              00D 00:00:00
            </div>
            <div
              id="bid-action-btn"
              className="w-5/6 border-fog-2 border-t mt-6 pt-6"
            >
              <button className="mb-3 w-full rounded-lg bg-fog-1 py-1.5 border border-fog-2">
                Place a bid
              </button>
              <button className="w-full rounded-lg bg-fog-1 py-1.5 border border-fog-2">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="auction-other" className="mb-20">
        <div className="container max-w-7xl flex items-center mb-10">
          <span className="font-semibold text-2xl">Trending Auction</span>
        </div>
        <SlideHaft
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
    </div>
  );
}
