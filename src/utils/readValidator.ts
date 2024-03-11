import * as cbor from "cbor-x";
import auctionValidator from "~/libs";
import { SpendingValidator, fromHex, toHex } from "lucid-cardano";


const readValidatorLockAsset = async function (): Promise<SpendingValidator> {
    const validator = auctionValidator[1];
    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
};
const readValidatorBid = async function (): Promise<SpendingValidator> {
    const validator = auctionValidator[0];
    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
};
const readValidatorVote = async function (): Promise<SpendingValidator> {
    const validator = auctionValidator[2];
    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
};

const validators = {
    readValidatorLockAsset,
    readValidatorBid,
    readValidatorVote
};

export default validators;
