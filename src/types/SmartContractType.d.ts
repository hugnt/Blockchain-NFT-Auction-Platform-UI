import React from "react";
import { AssetLock, InforAssetVoteType, NftItemType } from "./GenericsType";
export type SmartContractType ={
    inforAssetVotes:Array<InforAssetVoteType>
    setInforAssetVote: React.Dispatch<React.SetStateAction<InforAssetVoteType[]>>;
    timeVote:number;
    setTimeVote:React.Dispatch<React.SetStateAction<number>>;
    assetsLockFromSmartContract: Array<AssetLock>;
    assetsBidFromSmartContract: Array<NftItemType>;
    assetsVoteFromSmartContract: Array<NftItemType>;
    setAssetsLockFromSmartContract: React.Dispatch<React.SetStateAction<AssetLock[]>>;
    setAssetsBidFromSmartContract: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    setAssetsVoteFromSmartContract: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    loadingAssetsFromSmartContract: boolean;
    setLoadingAssetsFromSmartContract:React.Dispatch<React.SetStateAction<boolean>>;
    votingOngoing:boolean;
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

    // lockBid({}:{});
    // unlockBid({}:{});
    // vote({}:{});
    // recoverVote({}:{});
    // bid({}:{});
    // recoverBid({}:{});
    
}