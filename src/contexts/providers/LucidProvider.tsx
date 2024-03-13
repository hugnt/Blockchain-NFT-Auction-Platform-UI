import React, { ReactNode, useEffect, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "~/contexts/components/LucidContext";
import { WalletItemType } from "~/types/GenericsType";

type Props = { children: ReactNode };

export const LucidProvider = function ({ children }: Props) {
    const [networkPlatform, setNetworkPlatform] = useState<string>("Preview");
    const [loadingConnectWallet, setLoadingConnectWallet] = useState<boolean>(false);
    const [lucidNeworkPlatform, setLucidNeworkPlatform] = useState<Lucid>(null!);
    const [isConnected,setIsConnected]=useState<boolean>(false);

    useEffect(() => {
        const chooseLucidNetworkPlatform = async function () {
            let lucid: Lucid;
            switch (networkPlatform) {
                case "Preview":
                    lucid = await Lucid.new(
                        new Blockfrost("https://cardano-preview.blockfrost.io/api/v0", "preview5ZEeQD8I1W8MHLEwlKy7NEmXKjSPJhRZ"),
                        networkPlatform,
                    );
                    break;
                default:
                    throw new Error("Invalid networkPlatform");
            }

            setLucidNeworkPlatform(lucid);
        };

        chooseLucidNetworkPlatform();

        // react-hooks/exhaustive-deps
    }, [networkPlatform]);

    useEffect(() => {
        setLucidWallet(lucidNeworkPlatform);

        // react-hooks/exhaustive-deps
    }, [lucidNeworkPlatform, networkPlatform]);

    const [lucidWallet, setLucidWallet] = useState<Lucid>(null!);

    const [walletItem, setWalletItem] = useState<WalletItemType>({
        walletDownloadApi: "",
        walletBalance: 0,
        walletAddress: "",
        walletName: "",
        walletImage: "",
        walletCheckApi: async function () {},
        walletApi: async function () {},
    });

    const connectWallet = async function ({  walletApi, walletName, walletImage, walletCheckApi }: WalletItemType) {
        try {
            setLoadingConnectWallet(true);
            setIsConnected(true);
            let lucid: Lucid;
            switch (networkPlatform) {

                case "Preview":
                    lucid = await Lucid.new(
                        new Blockfrost("https://cardano-preview.blockfrost.io/api/v0", "preview5ZEeQD8I1W8MHLEwlKy7NEmXKjSPJhRZ"),
                        networkPlatform,
                    );
                    break;

                default:
                    throw new Error("Invalid networkPlatform");
            }

            lucid.selectWallet(await walletApi());
            let walletAddress = await lucid.wallet.address();
            const utxos = await lucid.wallet.getUtxos();
            const walletBalance =
                Number(
                    utxos.reduce(function (balance, utxo) {
                        return balance + utxo.assets.lovelace;
                    }, BigInt(0)),
                ) / 1000000;
            setLucidWallet(lucid);
            setLucidNeworkPlatform(lucid);
            setWalletItem(function (prevous: WalletItemType) {
                return {
                    ...prevous,
                    walletAddress: walletAddress,
                    walletBalance: walletBalance,
                    walletName: walletName,
                    walletImage: walletImage,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingConnectWallet(false);
        }
    };

    const disconnectWallet = async function () {
        try {
            setIsConnected(false);
            setWalletItem({
                walletDownloadApi: "",
                walletBalance: 0,
                walletAddress: "",
                walletName: "",
                walletImage: "",
                walletCheckApi: async function () {},
                walletApi: async function () {},
            });
            setLucidWallet(null!);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LucidContext.Provider
            value={{
                networkPlatform,
                disconnectWallet,
                connectWallet,
                lucidWallet,
                walletItem,
                lucidNeworkPlatform,
                setWalletItem,
                setLucidNeworkPlatform,
                setNetworkPlatform,
                loadingConnectWallet,
                isConnected,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};
