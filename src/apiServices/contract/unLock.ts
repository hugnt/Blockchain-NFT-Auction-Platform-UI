import { Data, Lucid , fromText,Credential,Tx,TxComplete  } from "lucid-cardano";
import { toast } from "react-toastify";
import { DatumLock } from "~/constants/datumlock";
import readValidator from "~/readValidator";
import {redeemer} from "~/constants/redeemer"
import { DatumBid } from "~/constants/datumbid";
import { auctionAddress } from "~/libs";
import { fetchAuthorAddressAsset } from "~/utils/fetchAssets/fetchAssetsFromAddress";
import bid from "./bid";
type Props = {
    lucid: Lucid;
    topAsset:string[];
};
const unLock=async function ({lucid,topAsset}:Props) {
    try{
        
        const validatorLock=await readValidator.readValidatorLockAsset();
        const validatorBid=await readValidator.readValidatorBid();
        const contractLockAddress = lucid.utils.validatorToAddress( validatorLock);
        const contractBidAddress=lucid.utils.validatorToAddress(validatorBid);
        console.log(`bid contract:${contractBidAddress}`)
        console.log(`lock contract:${contractLockAddress}`)
        const scriptUtxos= await lucid.utxosAt(contractLockAddress);
        const utxos= scriptUtxos.filter((utxo) => {
            try {
                let datum = Data.from<DatumLock>(utxo.datum!, DatumLock);
                if(datum.assetName!==""){
                    return true
                }
                else
                    return false
                // utxos sẽ chứa các utxo thỏa mãn 2 điều kiện đó là  utxo này cho người thụ hưởng và thời gian khóa hợp đồng nhỏ hơn hoặc bằng thời gian hiện tại
            } catch (e) {
                console.error("Error deserializing Datum:", e);
                return false; // That UTxO is not selected
            }
        });
        console.log(utxos)
        let tx:any =await lucid
        .newTx();
        
        for (let i = 0; i < utxos.length; i++) {
            let datum = Data.from<DatumLock>(utxos[i].datum!, DatumLock);// không liên quan
            const utxosBids=utxos.filter((utxo)=>{
               try{
                const datum=Data.from<DatumLock>(utxo.datum!,DatumLock);
                const Asset=topAsset.find(asset=>asset===datum.assetName)
                if(Asset){
                    return true

                }
                else{
                    return false
                }
               }
               catch(e){
                console.error("Error deserializing Datum:", e);
                return false; // That UTxO is not selected
               }

            })
            if(utxosBids.find(utxosBid => {
                const datum1 = Data.from<DatumLock>(utxosBid.datum!, DatumLock);
                return datum.assetName === datum1.assetName;
            })){
                const unit=datum.policyId+datum.assetName;
                console.log(`unit:${unit}`)
                const authorAddress=await fetchAuthorAddressAsset(unit);
                const authorPH= lucid.utils.getAddressDetails(authorAddress).paymentCredential?.hash;
                const auctionPH=lucid.utils.getAddressDetails(auctionAddress).paymentCredential?.hash;
                const smc_addressPH=lucid.utils.getAddressDetails(contractBidAddress).paymentCredential?.hash;
               //console.log(`author add:${authorAddress}`)
                let updateDatumBid = Data.to<DatumBid>(
                    {
                        policyId: datum.policyId,
                        assetName:datum.assetName,
                        lock_until:BigInt(100000000),
                        bidder: datum.bidder,
                        winner: datum.bidder,
                        smc_address: smc_addressPH!,
                        auction: auctionPH!,
                        author: authorPH!,
                        price: BigInt(0),
                    },
                    DatumBid
                );
                tx = await tx
                .payToContract(contractBidAddress,{inline: updateDatumBid},{ [datum.policyId+datum.assetName] : BigInt(1)})
            }
            else {
                const credential: Credential = lucid.utils.keyHashToCredential(datum.bidder);
                let bidderAddr = lucid.utils.credentialToAddress(credential)
                console.log(`bidder address: ${bidderAddr}`)
                tx = await tx
                .payToAddress(bidderAddr,{ [datum.policyId+datum.assetName] : BigInt(1)})
                console.log(bidderAddr)
            }
        }
        tx= await tx 
        .collectFrom(utxos,redeemer)
        .attachSpendingValidator(validatorLock)
        .addSigner(await lucid.wallet.address())
        .complete();
        
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        await lucid.awaitTx(txHash);
 //       let txHash:any;
        return  {txHash};
    }
    catch(e:any){
        console.log(`Bug when change Asset to Bid `,e)
        toast.error("Transaction excuted faild",e);
    }
}
export default unLock;