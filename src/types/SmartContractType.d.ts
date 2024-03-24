import React from "react";
import { AssetLock, InforAssetVoteType, NftItemType } from "./GenericsType";
import { Lucid } from "lucid-cardano";
export type SmartContractType ={
    startTimeVote:number,
    endTimeVote:number,
    setStartTimeVote:React.Dispatch<React.SetStateAction<number>>;
    setEndTimeVote:React.Dispatch<React.SetStateAction<number>>;
    inforAssetVotes:Array<InforAssetVoteType>
    setInforAssetVote: React.Dispatch<React.SetStateAction<InforAssetVoteType[]>>;
    assetsLockFromSmartContract: Array<AssetLock>;
    assetsBidFromSmartContract: Array<AssetType>;
    assetsVoteFromSmartContract: Array<AssetType>;
    setAssetsLockFromSmartContract: React.Dispatch<React.SetStateAction<AssetLock[]>>;
    setAssetsBidFromSmartContract: React.Dispatch<React.SetStateAction<AssetType[]>>;
    setAssetsVoteFromSmartContract: React.Dispatch<React.SetStateAction<AssetType[]>>;
    loadingAssetsFromSmartContract: boolean;
    setLoadingAssetsFromSmartContract:React.Dispatch<React.SetStateAction<boolean>>;
    votingOngoing:boolean;
    lockingOnGoing:boolean;
    topAssetVote:Array<string>;
    biddingOnGoing:boolean;
    setBiddingOnGoing:React.Dispatch<React.SetStateAction<boolean>>;
    setTopAssetVote:React.Dispatch<React.SetStateAction<string[]>>;
    setLockingOnGoing:React.Dispatch<React.SetStateAction<boolean>>;
    setVotingOnGoing:React.Dispatch<React.SetStateAction<boolean>>;
    mintAsset: ({
        lucid,
        title,
        description,
        imageUrl,
        mediaType,
        customMetadata,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        mediaType: string;
        imageUrl: string;
        customMetadata: any;
    }) => Promise<any>;

    burnAsset: ({ lucid, policyId, assetName }: { lucid: Lucid; policyId: string; assetName: string }) => Promise<any>;

    lockBid:({
        lucid,
        policyId,
        assetName,
        addressBidder,
        addressAuction
    }:{
        lucid:Lucid;
        policyId:string;
        assetName:string;
        addressBidder:string;
        addressAuction:string;
    }) =>Promise<any>;
     unLock({
        lucid,
        topAsset
     }:{
        lucid:Lucid;
        topAsset:Array<string>;
     });
     vote:({
        lucid,
        policyId,
        assetName,
        lock_until,
        voterAddress,
        auctionAddress,
     }:{
        lucid:Lucid;
        policyId:string;
        assetName:string;
        lock_until:bigint;
        voterAddress:string;
        auctionAddress:string;
     })=>Promise<any>;
     bid:({
        lucid,
        policyId,
        assetName,
        price,
        walletBalance,
//        lock_until,

    }:{
        lucid:Lucid;
        policyId:string;
        assetName:string;
        price: bigint;
        walletBalance:number;
    })=>Promise<any>;
    // recoverVote({}:{});
    // recoverBid({}:{});
    
}