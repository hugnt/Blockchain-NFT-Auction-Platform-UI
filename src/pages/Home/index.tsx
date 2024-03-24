import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getAllAsset, fetchAssetInformationFromUnit, fetchAssetsFromAddress } from "~/utils/fetchAssets/fetchAssetsFromAddress";

import { NFT, NFTModal, UserRow } from "~/components";
import NFTCategory from "~/components/NFTCategory";
import SlideHaft from "~/components/SlideArea";
import LucidContext from "~/contexts/components/LucidContext";
import { AssetType, NftItemType,AssetLock, AssetBidType } from "~/types/GenericsType";
import { LucidContextType } from "~/types/LucidContextType";
import convertIpfsAddressToUrl from "~/helper/convertIpfsAddressToUrl ";
import listAssetsLock from "~/apiServices/contract/listAssetsLock";
import { Lucid } from "lucid-cardano";
import { SmartContractType } from "~/types/SmartContractType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { auctionAddress } from "~/libs";
import unLock from "~/apiServices/contract/unLock";
import { toast } from "react-toastify";
import recoverVote from "~/apiServices/contract/recoverVote";
import recoverBid from "~/apiServices/contract/recoverBid";

export default function Home() {
  const {isConnected, walletItem,lucidNeworkPlatform,networkPlatform } = useContext<LucidContextType>(LucidContext);
  const [assets, setAssets] = useState<AssetType[]>([]);
  const {assetsBidFromSmartContract,assetsLockFromSmartContract,setBiddingOnGoing,votingOngoing,lockingOnGoing,inforAssetVotes,topAssetVote,biddingOnGoing,startTimeVote,endTimeVote} =useContext<SmartContractType>(SmartContractContext);
  const [assetLock,setAssetLock]=useState<AssetLock[]>([])
  const [assetBid,setAssetBid]=useState<AssetBidType[]>([])
  useEffect(() => {
    const fetchDataAsset = async () => {
        if (lucidNeworkPlatform && walletItem.walletAddress) {
            try {
                const walletAddress=walletItem.walletAddress ;
                const assetData = await getAllAsset(walletAddress);
                setAssets(assetData);
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        }
    };
    fetchDataAsset();
}, [networkPlatform, lucidNeworkPlatform, lockingOnGoing, votingOngoing, assetsLockFromSmartContract]);

// Kiểm tra điều kiện trước khi gọi setAssetLock
useEffect(() => {
    if (assetsLockFromSmartContract) {
        setAssetLock(assetsLockFromSmartContract);
    }
}, [assetsLockFromSmartContract,inforAssetVotes]);
useEffect(() => {
  if (assetsBidFromSmartContract) {
      // assetBid.forEach((e)=>{
      //   console.log(`policyId:${e.policy_id}
      //   assetName:${e.asset_name}
      //   `)
      // })
      setAssetBid(assetsBidFromSmartContract);
  }
}, [assetsBidFromSmartContract]);
 const handleChangeToBidding= async()=>{
    if(isConnected){
      if(walletItem.walletAddress===auctionAddress){
        try{
          console.log(topAssetVote)
          const txHash=await unLock({lucid:lucidNeworkPlatform,topAsset:topAssetVote})
        if (!txHash) {
          toast.error("Transaction excuted failed");
      } else {
          toast.success("Transaction excuted success");
          setBiddingOnGoing(true);
      }
      setBiddingOnGoing(false);
        }
        catch(e:any){
            console.error("An error occurred while change to Bidding", e);
            toast.error("An error occurred while change to Bidding");
        }
      }
      else{
        toast.error("Only the platform owner can do this");
      }
    }
    else{
      toast.error("You can connect wallet to excute it");
    }
 }
 const handleChangeRecoverVote=async()=>{
  if(isConnected){
    if(walletItem.walletAddress===auctionAddress){
      try{
        const txHash=await recoverVote({lucid:lucidNeworkPlatform,startTime:startTimeVote,endTime:endTimeVote})
      if (!txHash) {
        toast.error("Transaction excuted failed");
    } else {
        toast.success("Transaction excuted success");
        setBiddingOnGoing(true);
    }
    setBiddingOnGoing(false);
      }
      catch(e:any){
          console.error("An error occurred while recover vote", e);
          toast.error("An error occurred while recover vote");
      }
    }
    else{
      toast.error("Only the platform owner can do this");
    }
  }
  else{
    toast.error("You can connect wallet to excute it");
  }
 }
 const handleChangeRecoverBid=async ()=>{
  if(isConnected){
    if(walletItem.walletAddress===auctionAddress){
      try{
        const txHash=await recoverBid({lucid:lucidNeworkPlatform})
      if (!txHash) {
        toast.error("Transaction excuted failed");
    } else {
        toast.success("Transaction excuted success");
        setBiddingOnGoing(true);
    }
    setBiddingOnGoing(false);
      }
      catch(e:any){
          console.error("An error occurred while recover vote", e);
          toast.error("An error occurred while recover vote");
      }
    }
    else{
      toast.error("Only the platform owner can do this");
    }
  }
  else{
    toast.error("You can connect wallet to excute it");
  }
 }
 
  return (
    <div className="py-12">
       
      <div id="nft-category">
        <div className="text-3xl font-semibold text-center mb-12">
          NFT Category
        </div>
        List assets
     {isConnected&& <div
          id="area-bidding-list"
          className="container max-w-7xl py-12 grid grid-cols-4 gap-5"
        >
          {assets.map((asset) => (
            <NFT
              key={asset.policy_id}
              name={`${asset.onchain_metadata?.name}`}
              imgSrc={`${asset.onchain_metadata?.image}`}
              policyId={asset?.policy_id}
              assetName={asset?.asset_name}
              voteAmount={10}
              onBidding={false}
              onLocking={false}
              onVoting={false}
            />
          ))}
        </div>}
        List assets Vote
        <div
          id="area-bidding-list"
          className="container max-w-7xl py-12 grid grid-cols-4 gap-5"
        >
          {assetLock.map((asset) => (
            <NFT
              key={asset.policyId}
              name={`${asset?.assetName}`}
              imgSrc={`${asset?.image}`}
              policyId={asset?.policyId}
              assetName={asset?.assetNameHex}
              voteAmount={asset?.voteAmount}
              onBidding={false}
              onLocking={true}
              onVoting={true}
            />
          ))}
        </div>
        <div className="flex flex-col">

          <button onClick={handleChangeToBidding}
          className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          >Change Asset To Bidding</button>
        <button onClick={handleChangeRecoverVote}
          className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          >Recover Vote</button>
        <button onClick={handleChangeRecoverBid}
          className="rounded-[20px] bg-fog-1 px-3 py-1 border border-fog-2 
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500  hover:border-green-500"
          >Recover Bid</button>
        </div>
        List assets on Bidding
     <div
          id="area-bidding-list"
          className="container max-w-7xl py-12 grid grid-cols-4 gap-5"
        >
          {assetBid.map((asset) => (
            <NFT
              key={asset.policy_id}
              name={`${asset.title}`}
              imgSrc={`${asset?.image}`}
              policyId={asset?.policy_id}
              assetName={asset?.asset_name}
              voteAmount={asset.voteAmount}
              priceBidding={asset.priceBidding}
              amountConstrain={asset.amountConstraint}
              author={asset.stakeKeyAuthor}
              bidder={asset.stakeKeyBidder}
              onBidding={true}
              onLocking={true}
              onVoting={false}
            />
          ))}
        </div>
        <SlideHaft
            className ="category"
          autoPlay={false}
          lstComponent={[
            <NFTCategory label="Art" />,
            <NFTCategory label="Song" />,
            <NFTCategory label="Abstract" />,
            <NFTCategory label="Song" />,
            <NFTCategory label="Brain" />,
            <NFTCategory label="Video" />,
            <NFTCategory label="Brand" />,
            <NFTCategory label="Coca" />
          ]}
        />
      </div>

      <div id="area-onauction" className="my-12 mt-24">
        <div className="container max-w-7xl flex items-center mb-8">
          <span className="font-semibold text-3xl">NFTs on Voting</span>
        </div>
        <SlideHaft
         className ="onauction"
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
      <div id="area-onbidding" className="my-12 mt-24">
        <div className="container max-w-7xl flex items-center mb-8">
          <span className="font-semibold text-3xl">NFTs on Bidding</span>
        </div>
        <SlideHaft
         className ="onbidding"
          lstComponent={[
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
            <NFT onBidding={true} />,
          ]}
        />
      </div>
     

      <div id="area-top-user" className="my-12 mt-24 container max-w-7xl">
        <div className="flex items-center mb-8">
          <span className="font-semibold text-3xl">Top users on Auction</span>
        </div>
        <div className="rounded-[20px] bg-fog-4 py-10 px-10 mt-8 grid grid-cols-3 gap-x-28 gap-y-10">
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />
          <UserRow className="" />

        </div>
      </div>
    </div>
  );
}
