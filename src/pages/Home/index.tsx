import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getAllAsset, fetchAssetInformationFromUnit, fetchAssetsFromAddress } from "~/utils/fetchAssets/fetchAssetsFromAddress";

import { NFT, NFTModal, UserRow } from "~/components";
import NFTCategory from "~/components/NFTCategory";
import SlideHaft from "~/components/SlideArea";
import LucidContext from "~/contexts/components/LucidContext";
import { AssetType, NftItemType,AssetLock } from "~/types/GenericsType";
import { LucidContextType } from "~/types/LucidContextType";
import convertIpfsAddressToUrl from "~/helper/convertIpfsAddressToUrl ";
import listAssetsLock from "~/apiServices/contract/listAssetsLock";
import { Lucid } from "lucid-cardano";
import { SmartContractType } from "~/types/SmartContractType";
import SmartContractContext from "~/contexts/components/SmartContractContext";

export default function Home() {
  const { isConnected, walletItem,lucidWallet,lucidNeworkPlatform } = useContext<LucidContextType>(LucidContext);
  const [assets, setAssets] = useState<AssetType[]>([]);
  const {assetsLockFromSmartContract,votingOngoing} =useContext<SmartContractType>(SmartContractContext);
  const [assetLock,setAssetLock]=useState<AssetLock[]>([])
  useEffect(() => {
      const fetchDataAsset = async () => {
          if (walletItem && walletItem.walletAddress) { // Kiểm tra xem walletItem và walletAddress có tồn tại không
              try {
                  const assetData = await getAllAsset(walletItem.walletAddress);
                  setAssets(assetData);
              } catch (error) {
                  // Xử lý lỗi nếu cần
              }
          }
      };

      if (isConnected) {
        fetchDataAsset();
      }
  }, [isConnected, walletItem,votingOngoing]);
  
  useEffect(() => {
       setAssetLock(assetsLockFromSmartContract);
}, [lucidNeworkPlatform,assetsLockFromSmartContract,votingOngoing]);
  return (
    <div className="py-12">
       
      <div id="nft-category">
        <div className="text-3xl font-semibold text-center mb-12">
          NFT Category
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
              assetName={asset?.assetName}
              voteAmount={asset?.voteAmount}
              onBidding={false}
              onLocking={true}
              onVoting={true}
            />
          ))}
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
