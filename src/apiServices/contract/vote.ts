import { Data, Lucid, fromText } from "lucid-cardano";
import { toast } from "react-toastify";
import { DatumVote } from "~/constants/datumvote";
import readValidator from"~/utils/readValidator"

type Props = {
    lucid: Lucid;
    policyId: string;
    assetName: string;
    lock_until:bigint;
    voterAddress:string;
    auctionAddress:string;
};
const vote=async function ({lucid,policyId,assetName,lock_until,voterAddress,auctionAddress}:Props) {
    try{
        const validator=await readValidator.readValidatorVote();
        const contractAddress = lucid.utils.validatorToAddress( validator);
        const voterPulicKey :any= lucid.utils.getAddressDetails(voterAddress).paymentCredential?.hash
        const auctionPulicKey :any= lucid.utils.getAddressDetails(auctionAddress).paymentCredential?.hash
        const datum = Data.to(
            {
                policyId: policyId,
                assetName: assetName,
                lock_until:BigInt(lock_until),
                voter: voterPulicKey,
                auction: auctionPulicKey,
            },
            DatumVote,
        );
        console.log(`datum: ${datum}`)
        const tx = await lucid
        .newTx()
        .payToContract(contractAddress, { inline: datum }, { [policyId+assetName]: BigInt(1)})
        .complete();
  
    // Sign transaction
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    await lucid.awaitTx(txHash);
    return  txHash;
    
    }
    catch (e) {
        toast.error(`Voting failed: ${e}`);
        console.error("Voting failed:", e); // Log chi tiết lỗi vào console
    }
}
export default vote;