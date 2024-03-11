import auction from "./plutus.json";

const contractAddress: string = "addr_test1wpsqeugnmmtk3cdf3fsly998458eavua8rhg4jdtgcva26sqnylmx";
const auctionValidator = auction.validators;

export { contractAddress };
export default auctionValidator;