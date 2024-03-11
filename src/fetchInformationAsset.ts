import axios from 'axios';
type Props = {
    policyId: string;
    assetName: string;
};

const fetchCurrentAddressAsset = async function ({ policyId, assetName }: { policyId: string; assetName: string }) {
    try {
        const respone = await axios.post("/koios/assets/nft-address", { policyId: policyId, assetName: assetName });
        return respone.data.address;
    } catch (error) {
        console.error(error);
    }
};

const fetchAddressFromTxHash = async function (transactionHash: string) {
    const respone = await axios.post("/blockfrost/transaction/utxos", { transactionHash: transactionHash });
    return respone.data.inputs[0].address;
};

const fetchStakeKeyFromAddress = async function (address: string) {
    try {
        const respone = await axios.post("/emurgo/stakekey/address", { address: address });

        return respone.data.stakeKey;
    } catch (error) {
        console.error(error);
    }
};

const fetchAuthorAddressAndSellerAddress = async function ({ policyId, assetName }: Props) {
    const respone = await axios.post("/blockfrost/transaction/asset", { policyId: policyId, assetName: assetName });
    const authorAddress = await fetchAddressFromTxHash(respone.data.firstTransaction.tx_hash);
    const sellerAddress = await fetchAddressFromTxHash(respone.data.currentTransaction.tx_hash);
    const stakekeyAuthorAddress = await fetchStakeKeyFromAddress(authorAddress);
    const stakekeySellerAddress = await fetchStakeKeyFromAddress(sellerAddress);

    return { authorAddress, sellerAddress, stakekeyAuthorAddress, stakekeySellerAddress };
};

const fetchMetadataFromPolicyIdAndAssetName = async function ({ policyId, assetName }: Props) {
    const respone = await axios.post("/blockfrost/assets/information", { policyId: policyId, assetName: assetName });
    return { fingerprint: respone.data.metadata.fingerprint, metadata: respone.data.metadata.onchain_metadata };
};



const fetchInformationAsset = async function ({ policyId, assetName }: Props) {
    const currentAddress = await fetchCurrentAddressAsset({ policyId, assetName });
    const { authorAddress, sellerAddress, stakekeyAuthorAddress, stakekeySellerAddress } =
        await fetchAuthorAddressAndSellerAddress({ policyId, assetName });
    const { fingerprint, metadata } = await fetchMetadataFromPolicyIdAndAssetName({ policyId, assetName });
    return {
        policyId,
        assetName,
        currentAddress,
        authorAddress,
        sellerAddress,
        stakekeyAuthorAddress,
        stakekeySellerAddress,
        fingerprint,
        ...metadata,
    };
};

export default fetchInformationAsset;
