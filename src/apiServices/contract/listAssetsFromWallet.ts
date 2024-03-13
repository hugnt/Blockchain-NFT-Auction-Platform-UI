import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "~/utils/readValidator";
import { DatumLock } from "~/constants/datumlock";
import { NftItemType } from "~/types/GenericsType";
import wallets from "~/configs/wallets";
import axios from "axios";
import fetchInformationAsset from "~/utils/fetchInformationAsset";
// "addr_test1wp3edd27lcfkzpd2efc9wp9kaywmdl3p37kv3j4sqa36tnsq823m9"
type Props = {
    address: String;
};
// address of contract lock:
const listAssetsFromAddress = async function ({ address }: Props): Promise<NftItemType[] | any> {
    try {
        if (address){
            console.log(1111);
            console.log(`Wallet Address: ${address}`)
            const paginatedData = await axios.post(
                `https://preview.koios.rest/api/v1/address_assets`,
                { address: address },
            );
            console.log(paginatedData)
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