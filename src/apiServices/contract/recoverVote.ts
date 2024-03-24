import { Data, Lucid, fromText, Credential } from "lucid-cardano";
import { toast } from "react-toastify";
import { DatumVote } from "~/constants/datumvote";
import { redeemer } from "~/constants/redeemer";
import readValidator from "~/readValidator";
type Props={
    lucid:Lucid;
    startTime:number;
    endTime:number;
}
const recoverVote=async function ({lucid,startTime,endTime}:Props) {
    try{
        const currentTime=new Date().getTime();
     const startTimeExcute=new Date(currentTime - 2 * 60 * 60 * 1000).getTime();
     const endTimeExcute=new Date(currentTime + 2 * 60 * 60 * 1000).getTime();
        const validator=await readValidator.readValidatorVote();
        const contractAddress = lucid.utils.validatorToAddress( validator);
        //addr_test1wzagvcgcwah7qfev9xk9m7vd6x9qgttgq9kfxhk3zkztztqr4ndm9
        console.log(`contract vote address:${contractAddress}`)
        const scriptUtxos= await lucid.utxosAt(contractAddress);
        let lock_until:bigint;
        const auctionAddress=await lucid.wallet.address();
        const auctionkeyHash=lucid.utils.getAddressDetails(auctionAddress).paymentCredential?.hash;
        console.log(`get auction keyhash:${auctionkeyHash}`)
        const utxos= scriptUtxos.filter((utxo) => {
            try {
                let datum = Data.from<DatumVote>(utxo.datum!, DatumVote);
                lock_until=datum.lock_until;
                console.log(`lock_until:${lock_until}`)
                console.log(`keyhash auction:${datum.auction}`)
                if(datum.assetName!==""&&datum.lock_until<=endTime){
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
        console.log(`startTime:${startTimeExcute}
                    endTime:${endTimeExcute}
        `)
        console.log(`utxos on time:${utxos}`)
        let tx:any =await lucid
        .newTx();
        
        for (let i = 0; i < utxos.length; i++) {
            let datum = Data.from<DatumVote>(utxos[i].datum!, DatumVote);// không liên quan
          

                const credential: Credential = lucid.utils.keyHashToCredential(datum.voter);
                let voterAddr = lucid.utils.credentialToAddress(credential)
                console.log(`voter address: ${voterAddr}`)
                tx = await tx
                .payToAddress(voterAddr,{ [datum.policyId+datum.assetName] : BigInt(1)})
                console.log(voterAddr)
            }
            tx= await tx 
            .collectFrom(utxos,redeemer)// lock_until phải trước validfrom
            .validFrom(startTimeExcute)// thời gian giao dịch phải sau time
            .validTo(endTimeExcute)// thời gian giao dịch phải trước time này
            .attachSpendingValidator(validator)
            .addSigner(await lucid.wallet.address())
            .complete();
            
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            await lucid.awaitTx(txHash);
            return  {txHash};
        }
        catch(e){
            console.log(`Bug when recover Asset Vote `,e)
            toast.error("Transaction excuted faild");
        }
        
    }
export default recoverVote;