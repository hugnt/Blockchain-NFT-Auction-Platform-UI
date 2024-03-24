import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumLock } from "~/constants/datumlock";
import { AssetLock } from "~/types/GenericsType";
import { connectLucid } from "../cardano/lucid";
// "addr_test1wp3edd27lcfkzpd2efc9wp9kaywmdl3p37kv3j4sqa36tnsq823m9"
type Props = {
    lucid: Lucid;
};
// address of contract lock:
const listAssetsLock = async function (): Promise<DatumLock[]> {
    try {
        const lucid=await connectLucid();
        if (!lucid) {
            throw new Error('Lucid is not provided');
        }

        const validator: Script = await readValidator.readValidatorLockAsset();
        const contractAddress: string = lucid.utils.validatorToAddress(validator);
        const scriptAssets: UTxO[] = await lucid.utxosAt(contractAddress);
        const utxosLock :UTxO[]= scriptAssets.filter((utxo:any)=>{
           try{
            const datum = Data.from<DatumLock>(utxo.datum, DatumLock);
                if(datum){
                    return true
                }
                return false; // That UTxO is not selected
            }
            catch (e) {
                return false; // That UTxO is not selected
            }
        })
        const assets: DatumLock[] = utxosLock.map(function (asset: any, index: number) {
            try{
                const datum = Data.from<DatumLock>(asset.datum, DatumLock);
                return datum
            } catch (error) {
                console.log(error);
                throw error; // Consider rethrowing the error for better error handling
            }
        });
        return assets;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}


export default listAssetsLock;
