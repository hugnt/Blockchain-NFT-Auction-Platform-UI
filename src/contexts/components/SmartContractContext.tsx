import { createContext } from "react";
import { SmartContractType } from "~/types/SmartContractType";

const SmartContractContext = createContext<SmartContractType>(null!);

export default SmartContractContext;
