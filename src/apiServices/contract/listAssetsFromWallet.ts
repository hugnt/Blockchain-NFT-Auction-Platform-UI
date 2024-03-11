import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumLock } from "~/constants/datumlock";
import { NftItemType } from "~/types/GenericsType";
import wallets from "~/configs/wallets";
import axios from "axios";
import fetchInformationAsset from "~/utils/fetchInformationAsset";
// "addr_test1wp3edd27lcfkzpd2efc9wp9kaywmdl3p37kv3j4sqa36tnsq823m9"
type Props = {
    lucid: Lucid;
};
// address of contract lock:
const listAssetsFromAddress = async function ({ lucid }: Props): Promise<NftItemType[] | any> {
    try {
        if (lucid){
            const address= lucid.utils.getAddressDetails(await lucid.wallet.address());
            
            const paginatedData = await axios.post(
                `/koios/assets/address-assets`,
                { address: address },
            );
            const assetsFromAddress = await Promise.all(
                paginatedData.data.map(async ({ policy_id, asset_name }: any) => {
                    const data = await fetchInformationAsset({ policyId: policy_id, assetName: asset_name });
                    if (data) return { ...data };
                    return null;
                }),
            );
            return assetsFromAddress;
        }
    } catch (error) {
        console.log(error);
    }
};

export default listAssetsFromAddress;