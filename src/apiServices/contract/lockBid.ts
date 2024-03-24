import { Data, Lucid, fromText } from "lucid-cardano";
import { totalmem } from "os";
import { toast } from "react-toastify";
import { DatumLock } from "~/constants/datumlock";

import readValidator from"~/utils/readValidator"
type Props = {
    lucid: Lucid;
    policyId: string;
    assetName: string;
    addressBidder:string;
    addressAuction:string;
};


const lockBid=async function ( {lucid,policyId,assetName,addressBidder,addressAuction}:Props) {
   
    try{
        const validator=await readValidator.readValidatorLockAsset();
        const contractAddress = lucid.utils.validatorToAddress( validator);
        const bidderPulicKey :any= lucid.utils.getAddressDetails(addressBidder).paymentCredential?.hash
        const auctionPulicKey :any= lucid.utils.getAddressDetails(addressAuction).paymentCredential?.hash
        const datum = Data.to(
            {
                policyId: policyId,
                assetName: assetName,
                bidder: bidderPulicKey,
                auction: auctionPulicKey,
            },
            DatumLock,
        );
        const tx = await lucid
        .newTx()
        .payToContract(contractAddress, { inline: datum }, { [policyId+assetName]: BigInt(1)})
        .complete();
  
    // Sign transaction
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    await lucid.awaitTx(txHash);
    return  {txHash};
    
    }
    catch(e){
        toast.error("Up load asset to pladform faild");
    }

    
}
export default lockBid;