import React, { Fragment, useContext, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import nftImg from "~/assets/images/nft/nft4.png";
import NFTModal from '../NFTModal';
import { useNavigate } from 'react-router-dom';
import convertIpfsAddressToUrl from '~/helper/convertIpfsAddressToUrl ';
import LucidContext from '~/contexts/components/LucidContext';
import { LucidContextType } from '~/types/LucidContextType';
import { auctionAddress } from '~/libs';
import lockBid from '~/apiServices/contract/lockBid';
import { toast } from 'react-toastify';
import CountdownTimer from '../CountdownTimer';
import { SmartContractType } from '~/types/SmartContractType';
import SmartContractContext from '~/contexts/components/SmartContractContext';


type NFTProps= {
  policyId?:string;
  assetName?:string;
  imgSrc?: string;
  width?: number;
  className?: string;
  name?: string;
  link?: string;
  voteAmount?:number;
  onBidding?: boolean;
  onVoting?:boolean;
  onLocking?:boolean;
}


export default function NFT({policyId,assetName,imgSrc,width,className,name,link,onBidding,voteAmount,onLocking,onVoting}: NFTProps) {
  const [activePreview, setActivePreview] = useState<boolean>(false);
  const { lucidWallet,walletItem } = useContext<LucidContextType>(LucidContext);
  const {timeVote,setVotingOnGoing,votingOngoing}= useContext<SmartContractType>(SmartContractContext);
  const navigate = useNavigate();
  const [isLocking,setIsLocking]=useState<boolean>(false);
  const handleLockNFT = async () => {
    
    const bidderAddress: any = walletItem.walletAddress;
    console.log(`Asset Name:${assetName}
    Policy:${policyId}
    `)
    if (lucidWallet) {
        if (policyId && assetName) {
            try {
                const txHash = await lockBid({
                    lucid: lucidWallet,
                    policyId,
                    assetName,
                    addressBidder: bidderAddress,
                    addressAuction: auctionAddress
                });
                if (!txHash) {
                    toast.error("Upload asset to platform failed");
                } else {
                    toast.success("Upload asset to platform success");
                    setVotingOnGoing(!votingOngoing)
                }
            } catch (error) {
                console.error("An error occurred while locking the NFT:", error);
                toast.error("An error occurred while locking the NFT");
            }
        } else {
            console.error("policyId or assetName is undefined");
        }
    }
}

  return (
    <Fragment>
      <NFTModal isAppear={activePreview} setAppear={setActivePreview} />
      <div className={`rounded-[20px] border p-3.5 bg-fog-1 ${className}`}>
        <div className={`h-72 w-30 nft-image rounded-[20px] relative overflow-hidden `}
          onClick={() => {!onBidding?setActivePreview(true):navigate('/Bidding/1')}}>
          <img
            src={imgSrc ? convertIpfsAddressToUrl(imgSrc) || '' : ''}
            alt={imgSrc || ''}         
            className="w-full h-full object-cover object-center relative"
          />
          {onVoting&&<div className="absolute inset-0 top-3 left-3 ntf-vote font-semibold">
            {voteAmount} Votes
          </div>}
          
        </div>
  
        <div className="nft-pre-infor flex justify-between my-2">
          <div className="nft-name font-semibold">{name}</div>
          <div className="nft-like flex items-center ">
            <FaRegHeart color="red" />
            &nbsp;300
          </div>
        </div>
        {onBidding && <div className="nft-desc text-fog-2  my-2">Descriptions</div>}
        {onBidding && <div className="nft-more-infor font-semibold flex justify-between  my-2">
          <div className="bidding-time ">
          <CountdownTimer initialSeconds={timeVote} />
          </div>
          <div className="nft-ada">1600 ADA</div>
        </div>}
        {!onLocking&&<button className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          onClick={handleLockNFT}>
              Lock
          </button>}
          {onVoting&&<button className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          >
              Vote
          </button>}
          {onBidding&&<button className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          >
              Bid
          </button>}
      </div>
    </Fragment>
   
  )
}
