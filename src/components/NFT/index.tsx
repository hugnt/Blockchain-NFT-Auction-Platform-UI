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
import { toast } from 'react-toastify';
import CountdownTimer from '../CountdownTimer';
import { SmartContractType } from '~/types/SmartContractType';
import SmartContractContext from '~/contexts/components/SmartContractContext';
import { AssetType } from '~/types/GenericsType';
import { getAllAsset } from '~/utils/fetchAssets/fetchAssetsFromAddress';
import bid from '~/apiServices/contract/bid';


type NFTProps= {
  policyId?:string;
  assetName?:string;
  imgSrc?: string;
  width?: number;
  className?: string;
  name?: string;
  link?: string;
  description?:string;
  bidder?:string;
  auction?:string;
  author?:string;
  amountConstrain?:bigint;
  mediType?:string;
  voteAmount?:number;
  onBidding?: boolean;
  priceBidding?:bigint;
  onVoting?:boolean;
  onLocking?:boolean;
}

export default function NFT({policyId,assetName,imgSrc,width,className,name,link,onBidding,voteAmount,onLocking,onVoting,priceBidding}: NFTProps) {
  const [activePreview, setActivePreview] = useState<boolean>(false);
  const { lucidWallet,walletItem,isConnected } = useContext<LucidContextType>(LucidContext);
  const {startTimeVote,endTimeVote,setVotingOnGoing,setLockingOnGoing,lockBid,vote,assetsLockFromSmartContract}= useContext<SmartContractType>(SmartContractContext);
  const [openInputPrice,setOpenInputPrice]=useState<boolean>(false);
  const [inputPrice,setInputPrice]=useState<number>(0);

  const navigate = useNavigate();
  const handleChangeInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setInputPrice(value); // Chỉ cập nhật inputPrice nếu giá trị là một số hợp lệ
    }
    else{
      setInputPrice(0)
    }
  };
  const handleShowInput= async()=>{
    if(openInputPrice===false){
      setOpenInputPrice(!openInputPrice)
    }
    if(inputPrice){
      if(lucidWallet&&isConnected){
        const walletBalance:any=walletItem.walletBalance;
        try{
          if(policyId&&assetName){
            
            const txHash=await bid({
              lucid:lucidWallet,
              policyId,
              assetName,
              price:BigInt(inputPrice),
              walletBalance:walletBalance
            })
            if (!txHash) {
              toast.error("Upload asset to platform failed");
          } else {
              toast.success("Upload asset to platform success");
              setOpenInputPrice(false)
          }
          }
          else{
            console.log(`policyId:${policyId}
            assetName:${assetName}`)
            console.error("policyId or assetName is undefined");
          }
        }
        catch(e:any){
          console.error("An error occurred while locking the NFT:", e);
          toast.error("An error occurred while locking the NFT");
        }
      }
      else{
        toast.error("Please connect wallet before Bid")
      }
    }
    
  }
  const handleLockNFT = async () => {
    
    const bidderAddress: any = walletItem.walletAddress;
    console.log(`Asset Name:${assetName}
    Policy:${policyId}
    `)
    if (lucidWallet && isConnected) {
        if (policyId && assetName) {
          setLockingOnGoing(true);
          const assetWithName = assetsLockFromSmartContract.find(asset => asset.assetNameHex === assetName);
          if(assetWithName){
            toast.error("NFT is Locking On platform, please choose another NFT or wait for next Bid");
          }
          else{
            try {
              const {txHash} = await lockBid({
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
              }
              setLockingOnGoing(false);
          } catch (error) {
              console.error("An error occurred while locking the NFT:", error);
              toast.error("An error occurred while locking the NFT");
          }
          }
           
        } else {
            console.error("policyId or assetName is undefined");
        }
    }
    else{
      toast.error("Please connect wallet before Vote")
    } 
}
  const handleVote= async()=>{
    

    if (lucidWallet && isConnected) {
      setVotingOnGoing(true);
      const voterAddr =await lucidWallet.wallet.address();

      const lock_until: bigint = BigInt(endTimeVote) - BigInt(1800);
      if (assetName) {
        
          const assetFromAddress :AssetType[]= await getAllAsset(voterAddr);
          
          const assetWithName = assetFromAddress.find(asset => asset.asset_name === assetName);
          const policyId=assetWithName?.policy_id!;
          console.log(`asset on voting:${assetName}`)
          console.log(`assset on wallet:${assetWithName?.asset_name}`)
      if (assetWithName) {
        try {
          const txHash = await vote({
              lucid: lucidWallet,
              policyId,
              assetName,
              lock_until,
              voterAddress: voterAddr,
              auctionAddress: auctionAddress
          });
          if (!txHash) {
              toast.error("Vote asset to platform failed");
          } else {
              toast.success("Vote asset to platform success");
             setVotingOnGoing(false); 
          }
          } catch (error) {
              toast.error("An error occurred while Vote the NFT");
          }
          } 
        else {
            // Không tìm thấy phần tử có asset_name như mong muốn
            toast.error("Asset not found on your wallet please mint asset with asset name you want to vote");
        }
      }
      else{
        toast.error("AssetName And policyId undefined");
      }
    }
    else{
      toast.error("Please connect wallet before Vote")
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
          {onBidding&&<div className="absolute inset-0 top-3 left-3 ntf-vote font-semibold">
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
          <CountdownTimer startTimeVote={startTimeVote} endTimeVote={endTimeVote} />
          </div>
          <div className="nft-ada">{Number(priceBidding)} ADA</div>
        </div>}
        {!onLocking&&<button className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          onClick={handleLockNFT}>
              Lock
          </button>}
          {onVoting&&

            <div className="nft-more-infor font-semibold flex justify-between  my-2">
            <div className="bidding-time ">
            <CountdownTimer startTimeVote={startTimeVote} endTimeVote={endTimeVote} />
            </div>
              <button className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
                onClick={handleVote}
                >
                Vote
              </button>
            </div>}
            {openInputPrice && (
                <input
                  type="text"
                  className="w-full focus:outline-none focus:border-white focus:ring-white bg-fog-1 border border-fog-1 px-6 py-3 rounded-lg font-light text-white placeholder:text-white"
                  placeholder="Price"
                  value={inputPrice.toString()}
                  onChange={handleChangeInputPrice}
                />
              )}
          {onBidding&&<button className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          onClick={handleShowInput}
          >
              Bid
          </button>}
      </div>
    </Fragment>
   
  )
}
