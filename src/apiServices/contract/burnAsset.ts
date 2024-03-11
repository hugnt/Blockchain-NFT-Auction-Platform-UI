import { Lucid, fromText } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    policyId: string;
    assetName: string;
};

const burnAsset = async function ({ lucid, policyId, assetName }: Props) {
    try {
        if (lucid) {
            const { paymentCredential } = lucid.utils.getAddressDetails(await lucid.wallet.address());
            const mintingPolicy = lucid.utils.nativeScriptFromJson({
                type: "all",
                scripts: [
                    { type: "sig", keyHash: paymentCredential?.hash },
                    { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
                ],
            });

            const unit = policyId + fromText(assetName);
            const tx = await lucid
                .newTx()
                .mintAssets({ [unit]: BigInt(-1) })
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            return { txHash, policyId, assetName };
        }
    } catch (error) {
        console.error(error);
    }
};

export default burnAsset;
