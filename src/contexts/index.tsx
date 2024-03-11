// ContextProvider.tsx
import React, { ReactNode } from "react";
import { LucidProvider } from "./providers/LucidProvider";
import SmartContractProvider from "./providers/SmartContractProvider";
const ContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <LucidProvider>
            <SmartContractProvider>
                {children}
            </SmartContractProvider>
        </LucidProvider>
        

        );
};

export default ContextProvider;
