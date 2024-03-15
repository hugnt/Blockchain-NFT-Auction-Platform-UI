import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumLock } from "~/constants/datumlock";
import { AssetLock, NftItemType } from "~/types/GenericsType";
import convertHexToString from "~/helper/convertHexToString";
// "addr_test1wp3edd27lcfkzpd2efc9wp9kaywmdl3p37kv3j4sqa36tnsq823m9"
type Props = {
    lucid: Lucid;
};
// address of contract lock:
const listAssetsLock = async function ({ lucid }: Props): Promise<AssetLock[]> {
    try {
        if (!lucid) {
            throw new Error('Lucid is not provided');
        }

        const validator: Script = await readValidator.readValidatorLockAsset();
        const contractAddress: string = lucid.utils.validatorToAddress(validator);
//       console.log(`contract lock: ${contractAddress}`)
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
    //    console.log(1111)
  //      console.log(scriptAssets.length)
        const assets: DatumLock[] = utxosLock.map(function (asset: any, index: number) {
            try{
                const datum = Data.from<DatumLock>(asset.datum, DatumLock);
                return datum
            } catch (error) {
                console.log(error);
                throw error; // Consider rethrowing the error for better error handling
            }
        });
        
        // Filter out null values from the assets array
       
        
        return assets;
    } catch (error) {
        console.log(error);
        throw error; // Consider rethrowing the error for better error handling
    }
}


export default listAssetsLock;
