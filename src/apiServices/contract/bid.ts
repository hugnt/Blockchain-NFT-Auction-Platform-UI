import { Data, Lucid, fromText ,Credential, UTxO} from "lucid-cardano";
import { toast } from "react-toastify";
import { DatumBid } from "~/constants/datumbid";
import readValidator from "~/readValidator";
import { redeemer } from "~/constants/redeemer";
import { filterUtxoAssetByPolicyId, filterUtxoMoneyByPolicyId } from "~/helper/findUtxoOnSmartContract";
type Props={
    lucid:Lucid;
    policyId:string;
    assetName:string;
    price: bigint;
    walletBalance:number;
}
const bid=async function ({lucid,policyId,assetName,price,walletBalance}:Props) {
    try{
        const priceConStrain=100000000;
        let lastPrice:bigint=BigInt(0);
        const validator=await readValidator.readValidatorBid();
        const contractAddress = lucid.utils.validatorToAddress( validator);
        const scriptUtxos= await lucid.utxosAt(contractAddress);
       
        const utxoLastBid= filterUtxoMoneyByPolicyId(scriptUtxos,policyId);
        const utxoNFT = filterUtxoAssetByPolicyId(scriptUtxos, policyId);
        
        const datumUtxoNFT= Data.from<DatumBid>(utxoNFT[0].datum, DatumBid);
        const bidderPulicKey=datumUtxoNFT.bidder;
        const smc_addressPH=datumUtxoNFT.smc_address;
        const auctionPH=datumUtxoNFT.auction;
        const authorPH=datumUtxoNFT.author;
        const winnerPH=lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash;
        console.log(`contractBid address:${contractAddress}`)
        let datumUtxoLastBid: DatumBid|undefined;
        if(utxoLastBid.length>0){
            datumUtxoLastBid = Data.from<DatumBid>(utxoLastBid[0].datum, DatumBid);
            lastPrice=datumUtxoLastBid.price;
        }
        console.log(`assset:${scriptUtxos}`)
        const utxosMoney=scriptUtxos.filter((utxo) => {
            try {
                // Pour datum data into the temp variable of the current UTxO
                const temp = Data.from<DatumBid>(utxo.datum!, DatumBid);
                
                // Check to see if that UTxO actually contains the NFT you want to buy?
                if (temp.price !==BigInt(0)) {
                    return true; // That UTxO has been taken
                }
                return false; // That UTxO is not selected
            } catch (e) {
                return false; // That UTxO is not selected
            }
        });
        //+BigInt(1000000)
        price=price*BigInt(1000000);
        console.log(`
        Current Price:${price}
        Last price:${lastPrice}`)
        let tx:any= await lucid
            .newTx();
        if((Number(price)-Number(lastPrice))%priceConStrain===0){
                console.log(`datumbid:`)
                
                console.log({
                    policyId,
                    assetName,
                    bidderPulicKey,
                    winnerPH,
                    smc_addressPH,
                    auctionPH,
                    authorPH,
                    price,

                });
                let datumBid = Data.to<DatumBid>(
                    {
                        policyId: policyId,
                        assetName:assetName,
                        lock_until:BigInt(100000000),
                        bidder: bidderPulicKey,
                        winner: winnerPH!,
                        smc_address: smc_addressPH!,
                        auction: auctionPH!,
                        author: authorPH!,
                        price: price,
                    },
                    DatumBid
                );
                
                console.log(`number utxomoney: ${utxosMoney.length}`)
                if(utxoLastBid.length>0){
                    const winnerLast=datumUtxoLastBid?.winner;
                    const credential: Credential = lucid.utils.keyHashToCredential(winnerLast!);
                    let winnerLastAddress = lucid.utils.credentialToAddress(credential)
                    console.log(`Winner address: ${winnerLastAddress}`)
                    tx=await tx
                    .payToAddress(winnerLastAddress, { lovelace:lastPrice})
                    .payToContract(contractAddress, { inline: datumBid}, { lovelace:price})
                    .collectFrom(utxosMoney, redeemer)
                    .attachSpendingValidator(validator)
                    .addSigner(await lucid.wallet.address())
                    .complete();
                }
                else{
                    tx = await tx
                    .payToContract(contractAddress, { inline: datumBid }, { lovelace: price })
                    .complete();
                }        
        }
        else {
            toast.error(`Giá của bạn cần phải thỏa mãn điều kiện (Price-CurrentPrice)=n*${priceConStrain/1000000} ADA`)
            // sau này cần phải đua ra thông báo khi nhập input luôn
        }

       
    
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        await lucid.awaitTx(txHash);
 //           let txHash:any;
            return  {txHash};
    
    }
    catch(e){
        toast.error("Bidding to pladform faild");
        console.log(`Error ${e} when bid try again:`)
    }
    
}
export default bid;
