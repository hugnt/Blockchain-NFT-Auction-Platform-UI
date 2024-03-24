import { Data, UTxO } from "lucid-cardano";
import { DatumBid } from "~/constants/datumbid";

function filterUtxoMoneyByPolicyId(utxos:any,policyId:any) {
    return utxos.filter((utxo:any) => {
        try {
            // Pour datum data into the temp variable of the current UTxO
            const temp = Data.from<DatumBid>(utxo.datum, DatumBid);
            // Check to see if that UTxO actually contains the NFT you want to buy?
            if (temp.policyId === policyId&& temp.price>0) {
                return true; // That UTxO has been taken
            }
            return false; // That UTxO is not selected
        } catch (e) {
            return false; // That UTxO is not selected
        }
    });
}
function filterUtxoAssetByPolicyId(utxos:any,policyId:any) {
    return utxos.filter((utxo:any) => {
        try {
            // Pour datum data into the temp variable of the current UTxO
            const temp = Data.from<DatumBid>(utxo.datum, DatumBid);
            // Check to see if that UTxO actually contains the NFT you want to buy?
            if (temp.policyId === policyId&& temp.price===BigInt(0)) {
                return true; // That UTxO has been taken
            }
            return false; // That UTxO is not selected
        } catch (e) {
            return false; // That UTxO is not selected
        }
    });
}
function filterDatumFromPolicyId(assets:DatumBid[],policyId:string){
    return assets.filter((e)=>{
        if(e.policyId===policyId &&e.price>BigInt(0)){
            return true;
        }
        else{
            return false;
        }
    })


}
function filterAssetNftOnBing(assets:DatumBid[]){
    return assets.filter((e)=>{
if(e.price===BigInt(0)){
    return true
}
else{
    return false;
}
    })
}
export {filterUtxoAssetByPolicyId,filterUtxoMoneyByPolicyId,filterDatumFromPolicyId,filterAssetNftOnBing};