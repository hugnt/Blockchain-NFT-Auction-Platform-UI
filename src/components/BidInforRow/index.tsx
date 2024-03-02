import React from 'react'
import nftImg from "~/assets/images/nft/nft4.png";

interface PropsBid{
  className?: string;
  isInCart?:Boolean;
}
export default function BidInforRow(props: PropsBid) {
  let {className, isInCart=false} = props;
  return (
    <div className={`flex justify-between items-center cursor-pointer ${className}`}>
        <div id="bid-nft-infor" className={`flex ${!isInCart&&'items-center'}  justify-start`}>
            <div className='me-4 flex flex-col justify-center'>1</div>
            <div id="bid-nft-image" className='me-3 h-20 w-20 rounded-lg overflow-hidden'>
              <img src={nftImg} alt="" className='w-full h-full object-cover object-center'/>
            </div>
            <div id="bid-nft-desc">
                <div id="bid-nft-name" className='font-medium'>Lorem</div>
                <div id="bid-nft-more" className='text-fog-1'>{!isInCart?"View infor":""}</div>
            </div>
        </div>
        <div id="bid-status" className={`text-right`}>
            <div id="bid-ada" className='font-semibold'>9512.21 ADA</div>
            <div id="bid-time" style={{ color: "rgba(0, 255, 117, 0.50)" }} className='font-medium'>16/10/2023  10:01:35</div>
        </div>
    </div>
  )
}
