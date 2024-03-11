import { Lucid, fromText } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    title: string;
    description: string;
    mediaType: string;
    imageUrl: string;
    customMetadata: any;
};

const mintAssetService = async function ({ lucid, title, description, imageUrl, mediaType, customMetadata }: Props): Promise<any> {
    try {
        if (lucid) {
            const { paymentCredential }: any = lucid.utils.getAddressDetails(await lucid.wallet.address());
            const mintingPolicy = lucid.utils.nativeScriptFromJson({
                type: "all",
                scripts: [
                    { type: "sig", keyHash: paymentCredential.hash },
                    { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
                ],
            });
            const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

            const assetName = fromText(title);
            const cleanedData = Object.fromEntries(Object.entries(customMetadata).filter(([key, value]) => key !== ""));
            const tx = await lucid
                .newTx()
                .mintAssets({ [policyId + assetName]: BigInt(1) })
                .attachMetadata(721, {
                    [policyId]: {
                        [assetName]: {
                            name: title,
                            description: description,
                            image: imageUrl,
                            mediaType: mediaType,
                            ...cleanedData,
                        },
                    },
                })
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            return {
                txHash,
                policyId,
                assetName,
            };
        }
    } catch (error) {
        console.log(error);
    }
};

export default mintAssetService;
