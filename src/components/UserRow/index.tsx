import React from 'react'
import nftImg from "~/assets/images/nft/user.png";

interface PropsBid{
  className?: string;
}
export default function UserRow(props: PropsBid) {
  let {className} = props;
  return (
    <div className={`flex justify-between items-center cursor-pointer ${className}`}>
        <div id="bid-nft-infor" className='flex items-center justify-start'>
            <div className='me-4'>1</div>
            <div id="bid-nft-image" className='me-3 h-20 w-20 rounded-lg overflow-hidden'>
              <img src={nftImg} alt="" className='w-full h-full object-cover object-center'/>
            </div>
            <div id="bid-nft-desc">
                <div id="bid-nft-name" className='mb-3'>Lorem</div>
                <div id="bid-nft-more" className='text-fog-1'>View infor</div>
            </div>
        </div>
        <div id="bid-status" className="text-right">
            <div id="bid-ada" className='font-semibold mb-3'>9512.21 ADA</div>
            <div id="bid-time" style={{ color: "rgba(0, 255, 117, 0.50)" }}>3.99%</div>
        </div>
    </div>
  )
}
