import { Data } from "lucid-cardano";

const DatumInitial = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    lock_until:  Data.Integer(), 
    bidder: Data.Bytes(),
    winner: Data.Bytes(),
    smc_address: Data.Bytes(),
    auction: Data.Bytes(),
    author: Data.Bytes(),
    price: Data.Integer(),
 // constrainPrice:Data.Integer(),
});

export type DatumBid = Data.Static<typeof DatumInitial>;
export const DatumBid = DatumInitial as unknown as DatumBid;