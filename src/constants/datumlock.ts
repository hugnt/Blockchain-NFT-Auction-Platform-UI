import { Data } from "lucid-cardano";

const DatumInitial = Data.Object({
    policyId:  Data.Bytes(),
    assetName:  Data.Bytes(),
    bidder:  Data.Bytes(), 
    auction:  Data.Bytes(), 
});

export type DatumLock = Data.Static<typeof DatumInitial>;
export const DatumLock = DatumInitial as unknown as DatumLock;
