import { Lucid } from "lucid-cardano";

export interface StateProps{
    navHeight?:number,
    lucid:Lucid,
    account: Account
}
export interface MetadataObject{
    key?:string;
    value?:string;
}

export interface NFTMintInfor{
    fileURL?: string | null;
    title?:string;
    mediaType?:string;
    desc?:string;
    metadata?:MetadataObject[];
};

export interface Account {
    id:number;
    walletAddress: string;
    name?: string;
    email?: string;
    address?: string;
    description?: string;
    avatar?: string;
    cover?: string;
    followers?: number;
    following?: number;
    facebook?: string;
    youtube?: string;
    twitter?: string;
    telegram?: string;
}