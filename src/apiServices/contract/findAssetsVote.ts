import { Data, Script, UTxO } from "lucid-cardano";
import { connectLucid } from "../cardano/lucid";
import readValidator from "~/utils/readValidator";
import { DatumVote } from "~/constants/datumvote";

type Props = {
    policyId: string;
    assetName: string;
};

const findAssetService = async function ({ policyId, assetName }: Props) {
    let existAsset: any;
    const lucid = await connectLucid();
    const validator: Script = await readValidator.readValidatorVote();
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress);
    const utxos: UTxO[] = scriptUtxos.filter((utxo: any, index: number) => {
        const checkAsset: DatumVote = Data.from<DatumVote>(utxo.datum, DatumVote);
        if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
            existAsset = Data.from<DatumVote>(utxo.datum, DatumVote);
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
