import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumBid } from "~/constants/datumbid";
import { NftItemType } from "~/types/GenericsType";
import { connectLucid } from "../cardano/lucid";
//  addr_test1wpuc5q8w60un72hvyyut6zl55eee3jvx8m0zkz2hxftvfyqy2qs98

const listAssetsBid = async function (): Promise<DatumBid[] | any> {
    try {
        const lucid=await connectLucid();
        if (lucid) {
            const validator: Script = await readValidator.readValidatorBid();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
 //           console.log(`contract bid: ${contractAddress}`)
            const scriptAssets: UTxO[] = await lucid.utxosAt(contractAddress);
            const utxosBids:UTxO[]=scriptAssets.filter((utxo:any)=>{
                try{
                    const datum=Data.from<DatumBid>(utxo.datum,DatumBid);
                    if(datum){
                        return true;

                    }
                    return false;
                }
                catch(e){
                    return false;
                }
            })
            const assets: DatumBid[] = utxosBids.map(function (asset: any, index: number) {
                const datum = Data.from<DatumBid>(asset.datum, DatumBid);
                return datum;
            });
            return assets;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default listAssetsBid;
