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
import { fetchAssetInformationFromUnit } from "~/utils/fetchAssets/fetchAssetsFromAddress";
import { AssetLock, AssetType, InforAssetVoteType, NftItemType } from "~/types/GenericsType";
import LucidContext from "../components/LucidContext";
import { LucidContextType } from "~/types/LucidContextType";
import { DatumLock } from "~/constants/datumlock";
import { Credential } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [timeVote, setTimeVote] = useState<number>(3600);
    const {networkPlatform, lucidNeworkPlatform } = useContext<LucidContextType>(LucidContext);
    const [assetsLockFromSmartContract, setAssetsLockFromSmartContract] = useState<AssetLock[]>([]);
    const [assetsBidFromSmartContract, setAssetsBidFromSmartContract] = useState<NftItemType[]>([]);
    const [assetsVoteFromSmartContract, setAssetsVoteFromSmartContract] = useState<NftItemType[]>([]);
    const [loadingAssetsFromSmartContract, setLoadingAssetsFromSmartContract] = useState<boolean>(true);
    const [inforAssetVotes,setInforAssetVote]=useState<InforAssetVoteType[]>([]);
    const [votingOngoing,setVotingOnGoing]=useState<boolean>(true);
    const fetchAssetsLockFromSmartContract = async function () {
        try {
            const assets = await listAssetsLock({ lucid: lucidNeworkPlatform });
            if (assets) {
                const assetPromises: Promise<AssetLock>[] = assets.reverse().map(async function (asset) {
                    const unit: string = asset.policyId! + asset.assetName!;
                    const response: AssetType = await fetchAssetInformationFromUnit(unit);
                    const assetName = response.onchain_metadata?.name;
                    const policyId = response.policy_id;
                    const image = response.onchain_metadata?.image;
                    const assetNameHex = response.asset;
                    const bidder = asset.bidder;
                    const auction = asset.auction;
                    const voteAmount = findVoteAmount(asset.assetName!);
                    // ép kiểu thêm url cho asset
                    return { assetNameHex, assetName, policyId, image, voteAmount, bidder, auction };
                });
                const resolvedAssets = await Promise.all(assetPromises);
                setAssetsLockFromSmartContract(resolvedAssets);
                setLoadingAssetsFromSmartContract(false);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const findVoteAmount = (assetName: string): number => {
        for (const assetVote of inforAssetVotes) {
            // Kiểm tra nếu assetVote có assetName tương ứng
            if (assetVote.assetName === assetName) {
                // Trả về voteAmount của assetVote này
                return assetVote.voteAmount!;
            }
        }
        // Trả về 0 nếu không tìm thấy hoặc không có dữ liệu
        return 0;
    }
    useEffect(
        function () {
            fetchAssetsLockFromSmartContract();
        },
        [networkPlatform, lucidNeworkPlatform,votingOngoing],
    );
    // useEffect(
    //     function () {
    //         fetchAssetsBidFromSmartContract();
    //     },
    //     [networkPlatform, lucidNeworkPlatform],
    // );
    // useEffect(
    //     function () {
    //         fetchAssetsVoteFromSmartContract();
    //     },
    //     [networkPlatform, lucidNeworkPlatform],
    // );
    return (
        <SmartContractContext.Provider
            value={{
                timeVote,
                setTimeVote,
                inforAssetVotes,
                assetsLockFromSmartContract,
                assetsBidFromSmartContract,
                assetsVoteFromSmartContract,
                setInforAssetVote,
                setAssetsLockFromSmartContract,
                setAssetsBidFromSmartContract,
                setAssetsVoteFromSmartContract,
                loadingAssetsFromSmartContract,
                setLoadingAssetsFromSmartContract,
                votingOngoing,
                setVotingOnGoing,
                burnAsset,
                mintAsset,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
