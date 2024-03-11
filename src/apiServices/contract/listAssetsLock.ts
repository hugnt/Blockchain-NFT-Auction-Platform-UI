import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumLock } from "~/constants/datumlock";
import { NftItemType } from "~/types/GenericsType";
// "addr_test1wp3edd27lcfkzpd2efc9wp9kaywmdl3p37kv3j4sqa36tnsq823m9"
type Props = {
    lucid: Lucid;
};
// address of contract lock:
const listAssetsLock = async function ({ lucid }: Props): Promise<NftItemType[] | any> {
    try {
        if (lucid) {
            const validator: Script = await readValidator.readValidatorLockAsset();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
            console.log(`contract lock: ${contractAddress}`)
            const scriptAssets: UTxO[] = await lucid.utxosAt(contractAddress);
            const assets: NftItemType[] = scriptAssets.map(function (asset: any, index: number) {
                const datum = Data.from<DatumLock>(asset.datum, DatumLock);
                return datum;
            });
            return assets;
        }
    } catch (error) {
        console.log(error);
    }
};

export default listAssetsLock;
