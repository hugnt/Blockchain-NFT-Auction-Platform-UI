import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumVote } from "~/constants/datumvote";
import { NftItemType } from "~/types/GenericsType";
// addr_test1wzagvcgcwah7qfev9xk9m7vd6x9qgttgq9kfxhk3zkztztqr4ndm9
type Props = {
    lucid: Lucid;
};
const listAssetsVote = async function ({ lucid }: Props): Promise<NftItemType[] | any> {
    try {
        if (lucid) {
            const validator: Script = await readValidator.readValidatorVote();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
            console.log(`contract vote: ${contractAddress}`)
            const scriptAssets: UTxO[] = await lucid.utxosAt(contractAddress);
            const assets: NftItemType[] = scriptAssets.map(function (asset: any, index: number) {
                const datum = Data.from<DatumVote>(asset.datum, DatumVote);
                return datum;
            });
            return assets;
        }
    } catch (error) {
        console.log(error);
    }
};

export default listAssetsVote;
