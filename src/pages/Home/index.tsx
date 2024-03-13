import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import getAllAsset from "~/utils/fetchAssets/fetchAssetsFromAddress";
import { NFT, NFTModal, UserRow } from "~/components";
import NFTCategory from "~/components/NFTCategory";
import SlideHaft from "~/components/SlideArea";
import LucidContext from "~/contexts/components/LucidContext";
import { AssetType, NftItemType } from "~/types/GenericsType";
import { LucidContextType } from "~/types/LucidContextType";
import convertIpfsAddressToUrl from "~/helper/convertIpfsAddressToUrl ";

export default function Home() {
  const { isConnected, walletItem } = useContext<LucidContextType>(LucidContext);
  const [assets, setAssets] = useState<AssetType[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          if (walletItem && walletItem.walletAddress) { // Kiểm tra xem walletItem và walletAddress có tồn tại không
              try {
                  const assetData = await getAllAsset(walletItem.walletAddress);
                  setAssets(assetData);
                  console.log(assetData)
                 // setAssets(assetData);
              } catch (error) {
                  // Xử lý lỗi nếu cần
              }
          }
      };

      if (isConnected) {
          fetchData();
      }
  }, [isConnected, walletItem]);
  for (let i = 0; i < assets.length; i++) {
    const onchain_metadata = assets[i].onchain_metadata;
    if (onchain_metadata && onchain_metadata.image) {
      console.log(convertIpfsAddressToUrl(onchain_metadata.image));
    }
  }
  
  
  
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
              onBidding={true}
            />
          ))}
        </div>}

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
