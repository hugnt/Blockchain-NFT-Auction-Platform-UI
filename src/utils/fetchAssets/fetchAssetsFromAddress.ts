import axios from "axios";
import { AssetType } from "~/types/GenericsType";

const PROJECT_ID = 'previewrgw8sG7JRnGN4N1MAXSe8pcm8da7KjVq';
const headers = {
    'project_id': PROJECT_ID
  };
  const fetchAssetsFromAddress = async (address: string) => {
    try {
        const url = `https://cardano-preview.blockfrost.io/api/v0/addresses/${address}`;
        const response = await axios.get(url, { headers });
       // console.log(response.data); // Hiển thị dữ liệu tài sản
        const amountList = response.data.amount.map((item: any) => item.unit);
       // console.log("Unit List:", amountList); // Hiển thị danh sách các giá trị unit
        return amountList; // Trả về danh sách các giá trị unit
    } catch (error: any) { // chỉ định kiểu dữ liệu của error là any
        console.error('Error:', error.response.data);
        throw error; // Ném lại lỗi để nó có thể được xử lý bên ngoài nếu cần
    }
}

const getAllAsset = async (address: string): Promise<AssetType[]> => {
    try {
        const units = await fetchAssetsFromAddress(address);
      //  console.log("Units:", units); // Hiển thị các unit
        const assetPromises = units
            .filter((unit: string) => unit !== "lovelace") // Lọc ra các unit không phải là "lovelace"
            .map((unit: string) => fetchAssetInformationFromUnit(unit)); // Gọi fetchAssetInformationFromUnit cho từng unit thỏa mãn điều kiện
        const assets = await Promise.all(assetPromises);
        //console.log("Assets:", assets); // Hiển thị thông tin của các asset
        return assets;
    } catch (error) {
        console.error('Error:', error);
        // Xử lý lỗi nếu cần
        throw error;
    }
}

const fetchAssetInformationFromUnit = async (unit: string) => {
    console.log(`unit token:${unit}`)
    try {
        const url = `https://cardano-preview.blockfrost.io/api/v0/assets/${unit}`;
        const response = await axios.get(url, { headers });
        const { asset_name, fingerprint, onchain_metadata, policy_id, quantity } = response.data;
       // console.log(response.data); // Hiển thị thông tin của asset
        return { asset_name, fingerprint, onchain_metadata, policy_id, quantity };
    } catch (error: any) {
        console.error('Error:', error.response.data);
        throw error;
    }
}
export { getAllAsset, fetchAssetInformationFromUnit, fetchAssetsFromAddress };