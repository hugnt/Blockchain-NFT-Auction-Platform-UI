import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumBid } from "~/constants/datumbid";
import { NftItemType } from "~/types/GenericsType";
//  addr_test1wpuc5q8w60un72hvyyut6zl55eee3jvx8m0zkz2hxftvfyqy2qs98
type Props = {
    lucid: Lucid;
};
const listAssetsBid = async function ({ lucid }: Props): Promise<NftItemType[] | any> {
    try {
        if (lucid) {
            const validator: Script = await readValidator.readValidatorBid();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
            console.log(`contract bid: ${contractAddress}`)
            const scriptAssets: UTxO[] = await lucid.utxosAt(contractAddress);
            const assets: NftItemType[] = scriptAssets.map(function (asset: any, index: number) {
                const datum = Data.from<DatumBid>(asset.datum, DatumBid);
                return datum;
            });
            return assets;
        }
    } catch (error) {
        console.log(error);
    }
};

export default listAssetsBid;
