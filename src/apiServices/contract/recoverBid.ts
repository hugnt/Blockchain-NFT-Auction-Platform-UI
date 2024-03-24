import { Data, Lucid, UTxO, fromText,Credential } from "lucid-cardano";
import { toast } from "react-toastify";
import { DatumBid } from "~/constants/datumbid";
import { redeemer } from "~/constants/redeemer";
import { auctionAddress } from "~/libs";
import readValidator from "~/readValidator";
import { fetchAuthorAddressAsset } from "~/utils/fetchAssets/fetchAssetsFromAddress";
type Props={
    lucid:Lucid;
}
const recoverBid=async function ({lucid}:Props) {
    try{
        
        const validator=await readValidator.readValidatorBid();
        const contractAddress = lucid.utils.validatorToAddress(validator);
        console.log(`bid contract:${contractAddress}`)
        const scriptUtxos= await lucid.utxosAt(contractAddress);
        const utxosMoney:UTxO[]=scriptUtxos.filter((utxo) => {
            try {
                let datum = Data.from<DatumBid>(utxo.datum!, DatumBid);
                if(datum.assetName!==""&&datum.price>0){
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
        const utxosAsset:UTxO[]=scriptUtxos.filter((utxo)=>{
            try {
                let datum = Data.from<DatumBid>(utxo.datum!, DatumBid);
                if(datum.assetName!==""&&datum.price===BigInt(0)){
                    return true
                }
                else
                    return false
                // utxos sẽ chứa các utxo thỏa mãn 2 điều kiện đó là  utxo này cho người thụ hưởng và thời gian khóa hợp đồng nhỏ hơn hoặc bằng thời gian hiện tại
            } catch (e) {
                console.error("Error deserializing Datum:", e);
                return false; // That UTxO is not selected
            }
        })
        console.log(`utxosMoney ${utxosMoney}`);
        let tx:any =await lucid
        .newTx();
        
        for (let i = 0; i < utxosAsset.length; i++) {
            let datumAsset = Data.from<DatumBid>(utxosAsset[i].datum!, DatumBid);// không liên quan
            let datumMoney:any;
            const unit=datumAsset.policyId+datumAsset.assetName;
            const credentialBidder: Credential = lucid.utils.keyHashToCredential(datumAsset.bidder);
            const bidderAddr = lucid.utils.credentialToAddress(credentialBidder)
            const utxosBids=utxosMoney.filter((utxo)=>{
               try{
                const datumMoney1=Data.from<DatumBid>(utxo.datum!,DatumBid);
                console.log(datumMoney1)
                if(datumAsset.policyId===datumMoney1.policyId){
                    datumMoney=datumMoney1;
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
            if(utxosBids.length>0&& datumMoney!==undefined){
                const priceBidding=datumMoney.price;
                const priceRoyalty=(priceBidding/BigInt(100))*BigInt(5);
                const priceWinnr=(priceBidding/BigInt(100))*BigInt(80);
                const priceFeePlatform=(priceBidding/BigInt(100))*BigInt(15);
                const credentialWinner: Credential = lucid.utils.keyHashToCredential(datumAsset.winner);
                const winnerAddr=lucid.utils.credentialToAddress(credentialWinner)
                const credentialAuthor: Credential = lucid.utils.keyHashToCredential(datumAsset.author);
                const authorAddr=lucid.utils.credentialToAddress(credentialAuthor) 
                console.log(`asset was bid with price:${priceBidding} by winner ${winnerAddr}`)
                tx = await tx
                .payToAddress(auctionAddress,{lovelace:priceFeePlatform})
                .payToAddress(authorAddr,{lovelace:priceRoyalty})
                .payToAddress(bidderAddr,{lovelace:priceWinnr})
                .payToAddress(winnerAddr,{[unit]:BigInt(1)})
            }
            else {
                console.log(`asset was not Bidded on platform`)
                tx = await tx
                .payToAddress(bidderAddr,{ [unit] : BigInt(1)})
            }
        }
        tx= await tx 
        .collectFrom(scriptUtxos,redeemer)
        .attachSpendingValidator(validator)
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
export default recoverBid;