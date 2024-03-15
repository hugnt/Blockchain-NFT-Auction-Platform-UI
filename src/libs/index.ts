import auction from "./plutus.json";

const contractAddress: string = "addr_test1wpsqeugnmmtk3cdf3fsly998458eavua8rhg4jdtgcva26sqnylmx";
const auctionValidator = auction.validators;
const auctionAddress:string= "addr_test1qqja25tffmwywjufeycgn86zj7slfj9w4wh5a7ft4png47ue0r2q9x4995mt5xscmehf5swm6qx4flkg98euf3rk45usuerp08";
export { contractAddress,auctionAddress };
export default auctionValidator;