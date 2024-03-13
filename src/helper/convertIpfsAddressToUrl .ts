const convertIpfsAddressToUrl = function (ipfsAddress: string) {
    if (ipfsAddress.startsWith("ipfs://")) {
        const ipfsHash = ipfsAddress.slice("ipfs://".length);
        const ipfsURL = `https://ivory-deaf-guineafowl-894.mypinata.cloud/ipfs/${ipfsHash}`;
        return ipfsURL;
    } else {
        return null;
    }
};
export default convertIpfsAddressToUrl;