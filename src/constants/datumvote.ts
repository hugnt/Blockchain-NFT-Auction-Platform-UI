import { Data } from "lucid-cardano";

const DatumInitial = Data.Object({
    policyId:  Data.Bytes(),
    assetName:  Data.Bytes(),
    lock_until:  Data.Integer(), 
    voter:  Data.Bytes(), 
    auction:  Data.Bytes(), 
});

export type DatumVote= Data.Static<typeof DatumInitial>;
export const DatumVote = DatumInitial as unknown as DatumVote;
