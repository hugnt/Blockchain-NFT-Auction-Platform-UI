export type WalletItemType = {
    walletBalance?: number;
    walletName: string;
    walletImage: string;
    walletAddress?: string;
    walletDownloadApi?: string;
    walletApi: () => Promise<any> | any;
    walletCheckApi: () => Promise<any> | any;
};
export type NftItemType = {
    assetName: string;
    authorAddress?: string;
    currentAddress?: string;
    description?: string;
    fingerprint?: string;
    image?: string;
    mediaType?: string;
    name?: string | any;
    policyId: string;
    sellerAddress?: string;
    stakekeyAuthorAddress?: string;
    stakekeySellerAddress?: string;
    amountOfVote?:number;
    bidding?:boolean;
    voting?:boolean;
    priceBidding?: bigint;
    royalties?: bigint;
    id?: string;
    countOfTransaction?: number;
    createdAt?: string;
    status?: string;
    updatedAt?: string;
    validate?: boolean;
};
type AssetType = {
    asset?: string;
    asset_name?: string;
    fingerprint?: string;
    policy_id?:string;
    quantity?:string;
    onchain_metadata?: {
        description?: string;
        image?: string;
        mediaType?: string;
        name?: string;
    };
};

