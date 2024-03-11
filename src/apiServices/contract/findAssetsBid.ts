import { Data, Script, UTxO } from "lucid-cardano";
import { connectLucid } from "../cardano/lucid";
import readValidator from "~/utils/readValidator";
import { DatumBid } from "~/constants/datumbid";

type Props = {
    policyId: string;
    assetName: string;
};

const findAssetService = async function ({ policyId, assetName }: Props) {
    let existAsset: any;
    const lucid = await connectLucid();
    const validator: Script = await readValidator.readValidatorBid();
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress);
    const utxos: UTxO[] = scriptUtxos.filter((utxo: any, index: number) => {
        const checkAsset: DatumBid = Data.from<DatumBid>(utxo.datum, DatumBid);
        if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
            existAsset = Data.from<DatumBid>(utxo.datum, DatumBid);
            return true;
        }
        return false;
    });

    if (utxos.length === 0) {
        console.log("utxo found");
        return null;
    }

    return existAsset;
};

export default findAssetService;
