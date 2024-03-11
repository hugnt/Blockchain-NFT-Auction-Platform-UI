import { NftItemType } from "./GenericsType";
export type SmartContractType ={
    assetsLockFromSmartContract: Array<NftItemType>;
    assetsBidFromSmartContract: Array<NftItemType>;
    assetsVoteFromSmartContract: Array<NftItemType>;
    setAssetsLockFromSmartContract: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    setAssetsBidFromSmartContract: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    setAssetsVoteFromSmartContract: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    loadingAssetsFromSmartContract: boolean;
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