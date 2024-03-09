import React, { Fragment, useState } from "react";
import voteBoxIMG from "~/assets/images/icon/vote2.png";
import { TbPhotoHeart } from "react-icons/tb";
import { GiVote } from "react-icons/gi";
import { RiAuctionLine } from "react-icons/ri";
import "./ReelBox.css";
import { BidInforRow, NFTOnVoting, TabBox, Transition } from "~/components";

import Slide from '@mui/material/Slide';
import { Box } from "@mui/material";
import { useAppSelector } from "~/utils/store/store";

var lstComponent = [
  <div className="mt-4 text-purple-6 pe-4 overflow-y-auto h-[30rem] ">
    <BidInforRow
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <BidInforRow
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <BidInforRow
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <BidInforRow
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <BidInforRow
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
  </div>,
  <div className="mt-4 text-purple-6">
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
  </div>,
  <div className="mt-4 text-purple-6">
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
    <NFTOnVoting
      isInCart={true}
      className="mb-4 hover:bg-purple-300 rounded-md p-3"
    />
  </div>,
];

export default function ReelBox() {
  const [displayReel, setDisplayReel] = useState(false);
  const [tabActive, setTabActive] = useState(0);
  const handleClickReel = (tabIndex: number) => {
    tabIndex == tabActive ? setDisplayReel(!displayReel) : setDisplayReel(true);
    setTabActive(tabIndex);
  };
  const accountStore = useAppSelector((state)=>state.account.account);
  return (
    <div className="">
      {accountStore&&<Fragment>
        <div id="reelTab" className={`${displayReel&&'z-10'}`}>
          <Transition animation={"fadeMove"} isAppear={displayReel} timeout={400} direction="up" className="">
            <Box>
              <TabBox
                tabActive={tabActive}
                handleClickReel={handleClickReel}
                whiteBG={true}
                className="w-[25rem] drop-shadow-xl bottom-2 bg-white rounded-lg px-6 pb-4 pt-2"
                lstComponent={lstComponent}
                lstLabel={["Bidding", "Voted", "Likes"]}
              />
            </Box>
          </Transition>
        </div>
        <div id="reelbox" className="flex flex-col justify-end ms-4">
          <div
            className="w-14 h-14 border-2 border-white rounded-full p-2.5 bg-fog-3 hover:bg-purple-3 *:hover:scale-125 overflow-hidden"
            id="bidBox"
            onClick={() => handleClickReel(0)}
          >
            <RiAuctionLine
              size={"2em"}
              className="transition duration-300 ease-in-out"
            />
          </div>
          <div
            className="mt-3 w-14 h-14 border-2 border-white rounded-full p-2.5 bg-fog-3 hover:bg-purple-3 *:hover:scale-125 overflow-hidden"
            id="voteBox"
            onClick={() => handleClickReel(1)}
          >
            <GiVote
              size={"2em"}
              className="transition duration-300 ease-in-out"
            />
          </div>
          <div
            className="mt-3 w-14 h-14 border-2 border-white rounded-full p-2.5 bg-fog-3 hover:bg-purple-3 *:hover:scale-125 overflow-hidden"
            id="likeBox"
            onClick={() => handleClickReel(2)}
          >
            <TbPhotoHeart
              size={"2em"}
              className="transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </Fragment>}
    </div>
  );
}
