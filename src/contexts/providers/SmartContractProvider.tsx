import React, { ReactNode, useContext, useEffect, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";

import burnAsset from "~/apiServices/contract/burnAsset";
import mintAsset from "~/apiServices/contract/mintAsset";
import listAssetsLock from "~/apiServices/contract/listAssetsLock";
import listAssetsBid from "~/apiServices/contract/listAssetsBid";
import listAssetsVote from "~/apiServices/contract/listAssetsVote";
import findAssetsBid from "~/apiServices/contract/findAssetsBid"
import findAssetsLock from "~/apiServices/contract/findAssetsLock"
import findAssetsVote from "~/apiServices/contract/findAssetsVote"
import fetchInformationAsset from "~/utils/fetchInformationAsset";
import { NftItemType } from "~/types/GenericsType";
import LucidContext from "../components/LucidContext";
import { LucidContextType } from "~/types/LucidContextType";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const {networkPlatform, lucidNeworkPlatform } = useContext<LucidContextType>(LucidContext);
    const [assetsLockFromSmartContract, setAssetsLockFromSmartContract] = useState<NftItemType[]>([]);
    const [assetsBidFromSmartContract, setAssetsBidFromSmartContract] = useState<NftItemType[]>([]);
    const [assetsVoteFromSmartContract, setAssetsVoteFromSmartContract] = useState<NftItemType[]>([]);
    const [loadingAssetsFromSmartContract, setLoadingAssetsFromSmartContract] = useState<boolean>(true);
    const fetchAssetsLockFromSmartContract = async function () {
        try {
            const assets: NftItemType[] = await listAssetsLock({ lucid: lucidNeworkPlatform });
            if (assets) {
                const assetPromises = assets.reverse().map(async function (asset: NftItemType) {
                    const response: NftItemType = await fetchInformationAsset({
                        policyId: asset.policyId,
                        assetName: asset.assetName,
                    });
                    return { ...response, royalties: asset.royalties };
                });

                const convertedAssets: NftItemType[] = await Promise.all(assetPromises);

                setAssetsLockFromSmartContract((previousAssets: NftItemType[]) => {
                    const updatedAssets: NftItemType[] = previousAssets.map((existingAsset: NftItemType) => {
                        const matchingAsset = convertedAssets.find(function (newAsset: NftItemType) {
                            return existingAsset.policyId === newAsset.policyId;
                        });

                        if (matchingAsset) {
                            return { ...existingAsset, ...matchingAsset };
                        }

                        return existingAsset;
                    });
                    const newAssets: NftItemType[] = convertedAssets.filter(
                        (newAsset: NftItemType) => !previousAssets.some((existingAsset: any) => existingAsset.policyId === newAsset.policyId),
                    );

                    return [...updatedAssets, ...newAssets];
                });
                setLoadingAssetsFromSmartContract(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchAssetsVoteFromSmartContract = async function () {
        try {
            const assets: NftItemType[] = await listAssetsVote({ lucid: lucidNeworkPlatform });
            if (assets) {
                const assetPromises = assets.reverse().map(async function (asset: NftItemType) {
                    const response: NftItemType = await fetchInformationAsset({
                        policyId: asset.policyId,
                        assetName: asset.assetName,
                    });
                    return { ...response, royalties: asset.royalties };
                });

                const convertedAssets: NftItemType[] = await Promise.all(assetPromises);

                setAssetsVoteFromSmartContract((previousAssets: NftItemType[]) => {
                    const updatedAssets: NftItemType[] = previousAssets.map((existingAsset: NftItemType) => {
                        const matchingAsset = convertedAssets.find(function (newAsset: NftItemType) {
                            return existingAsset.policyId === newAsset.policyId;
                        });

                        if (matchingAsset) {
                            return { ...existingAsset, ...matchingAsset };
                        }

                        return existingAsset;
                    });
                    const newAssets: NftItemType[] = convertedAssets.filter(
                        (newAsset: NftItemType) => !previousAssets.some((existingAsset: any) => existingAsset.policyId === newAsset.policyId),
                    );

                    return [...updatedAssets, ...newAssets];
                });
                setLoadingAssetsFromSmartContract(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchAssetsBidFromSmartContract = async function () {
        try {
            const assets: NftItemType[] = await listAssetsBid({ lucid: lucidNeworkPlatform });
            if (assets) {
                const assetPromises = assets.reverse().map(async function (asset: NftItemType) {
                    const response: NftItemType = await fetchInformationAsset({
                        policyId: asset.policyId,
                        assetName: asset.assetName,
                    });
                    return { ...response, royalties: asset.royalties };
                });

                const convertedAssets: NftItemType[] = await Promise.all(assetPromises);

                setAssetsBidFromSmartContract((previousAssets: NftItemType[]) => {
                    const updatedAssets: NftItemType[] = previousAssets.map((existingAsset: NftItemType) => {
                        const matchingAsset = convertedAssets.find(function (newAsset: NftItemType) {
                            return existingAsset.policyId === newAsset.policyId;
                        });

                        if (matchingAsset) {
                            return { ...existingAsset, ...matchingAsset };
                        }

                        return existingAsset;
                    });
                    const newAssets: NftItemType[] = convertedAssets.filter(
                        (newAsset: NftItemType) => !previousAssets.some((existingAsset: any) => existingAsset.policyId === newAsset.policyId),
                    );

                    return [...updatedAssets, ...newAssets];
                });
                setLoadingAssetsFromSmartContract(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(
        function () {
            fetchAssetsLockFromSmartContract();
        },
        [networkPlatform, lucidNeworkPlatform],
    );
    useEffect(
        function () {
            fetchAssetsBidFromSmartContract();
        },
        [networkPlatform, lucidNeworkPlatform],
    );
    useEffect(
        function () {
            fetchAssetsVoteFromSmartContract();
        },
        [networkPlatform, lucidNeworkPlatform],
    );
    return (
        <SmartContractContext.Provider
            value={{
                assetsLockFromSmartContract,
                assetsBidFromSmartContract,
                assetsVoteFromSmartContract,
                setAssetsLockFromSmartContract,
                setAssetsBidFromSmartContract,
                setAssetsVoteFromSmartContract,
                loadingAssetsFromSmartContract,
                burnAsset,
                mintAsset,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
