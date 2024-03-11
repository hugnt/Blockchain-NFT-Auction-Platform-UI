import React, { useContext, useState } from "react";
import { LucidContextType } from "~/types/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import wallets from "~/constants/wallets";

import walletIcon from "~/assets/images/icon/wallet.png"
import ada from "~/assets/images/icon/ada.png"

import { WalletItemType } from "~/types/GenericsType";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Transition from "../Transition";
import { MdLogout, MdOutlineRemoveRedEye, MdRefresh } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { handleLoading } from "~/utils/store/features/uiSlice";
import { useAppDispatch, useAppSelector } from "~/utils/store/store";

type Props = {};

const ConnectWallet = function ({}: Props) {
    const { connectWallet, disconnectWallet, walletItem, setWalletItem, loadingConnectWallet,isConnected } =
        useContext<LucidContextType>(LucidContext);
    const [activeWallet, setActiveWallet] = useState(false);
    const [isShowWallet,setIsShowWallet]= useState(false);
    const loading = useAppSelector((state)=>state.ui.loading);
    const dispatch = useAppDispatch();
    const handleShowSellectWallet = () => {
      setActiveWallet((prevState) => !prevState);
    };
    const handleShowInforWallet = () => {
      setIsShowWallet((prevState) => !prevState);
    };
    const handleConnectWallet = async function (wallet: WalletItemType) {
      
        try {
            setActiveWallet(false)
            
            if (!(await wallet.walletCheckApi())) {
                setWalletItem(function (walletPrevious: WalletItemType) {
                    return {
                        ...walletPrevious,
                        walletDownloadApi: wallet.walletDownloadApi,
                        walletName: wallet.walletName,
                    };
                });
                return;
            }
            dispatch(handleLoading({loading:true}));
            connectWallet({
                walletApi: wallet.walletApi,
                walletCheckApi: wallet.walletCheckApi,
                walletName: wallet.walletName,
                walletImage: wallet.walletImage,
            });
            
            toast.success("Connected wallet!", {
              position: "top-right",
              
            });
        } catch (error) {
          console.log(error);
          toast.error("Connecting wallet failed!", {
            position: "top-right"
          });
        }finally {
          dispatch(handleLoading({loading:false}));
        }
    };

    const handleDisconnecWallet = async function () {
        try {
            setIsShowWallet(false)
            await disconnectWallet();
            toast.success("Disconnected wallet!", {
              position: "top-right",
              
            });
        } catch (error) {
            console.log(error);
            toast.error("Disconnecting failed!", {
              position: "top-right"
            });
        }finally {
          dispatch(handleLoading({loading:false}));
        }
    };


    return (
        <div className="relative z-30" >
            {!isConnected?(
                 <div
                 className=" flex justify-between items-center rounded-[40px] bg-fog-1 px-4 py-1.5 border border-white  hover:bg-purple-3"
                 onClick={handleShowSellectWallet}
               >
                 Connect Wallet &nbsp;{" "}
                 {activeWallet ? <FaCaretUp /> : <FaCaretDown />}
               </div>
            )
            :(<div
                className=" flex justify-between items-center rounded-[40px] bg-fog-1 px-4 py-1.5 border border-white  hover:bg-purple-3"
                onClick={handleShowInforWallet}
              >
                  <div className="flex items-center">
                    {loadingConnectWallet ? (
                      <>
                     {/* <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                      </svg> */}
                          <span className="visually-hidden">Connecting...</span>
                      </>
                    ) : (
                      <>
                        <div className="h-5 w-5 overflow-hidden me-3">
                          <img src={walletItem.walletImage} alt="" className="w-full h-full object-contain" />
                        </div>
                        <span>{walletItem.walletBalance}&nbsp;₳</span>
                        {activeWallet ? <FaCaretUp /> : <FaCaretDown />}
                      </>
                    )}
                  </div>
              </div>)}
            <Transition animation={"fadeMove"} isAppear={activeWallet} timeout={400} direction="down" className="">
              <div className="dropdown-zone absolute mt-4 right-0 bg-white text-purple-1 w-40 rounded-md">
                <ul className="py-3 ">
                  
                  {wallets.slice(0, 5).map(function (wallet, index) {
                        return (
                            <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6" key={index} onClick={() => handleConnectWallet(wallet)}>
                            <div className="h-5 w-5 overflow-hidden me-3">
                              <img src={wallet.walletImage} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div id="user-name">{wallet.walletName}</div>
                          </li>
                        );
                    })}
                  <li className="border-t my-2"></li>
                  <li className="flex items-center px-3 hover:text-purple-6">
                    <MdOutlineRemoveRedEye size="1.2em" className="me-3" />
                    <div id="user-name">View All</div>
                  </li>
                </ul>
              </div>
            </Transition>
            <Transition animation={"fadeMove"} isAppear={isShowWallet} timeout={400} direction="down" className="">
              <div className="dropdown-zone absolute mt-4 right-0 bg-white text-purple-1 w-48 rounded-md">
                <ul className="py-3 ">
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3 hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                      <img src={walletIcon} alt="" className="w-full h-full object-contain" />
                    </div>
                    <Tooltip title={walletItem.walletAddress} placement="left">
                      <div className="text-ellipsis overflow-hidden  w-full">{walletItem.walletAddress}</div>
                    </Tooltip>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6" >
                    <div className="h-5 w-5 me-3 overflow-hidden">
                      <img src={ada} alt="" className="w-full h-full object-contain" />
                    </div>
                    <Tooltip title={walletItem.walletBalance?.toString()+ " lovelace"} placement="left">
                      <div className="overflow-hidden">{walletItem.walletBalance} ADA</div>
                    </Tooltip>
                  </li>
                  <li className="border-t my-2"></li>
                  <li className="flex items-center px-3 hover:text-green-600 mb-3">
                    <MdRefresh  size="1.2em" className="me-3" />
                    <div>Refresh</div>
                  </li>
                  <li className="flex items-center px-3 hover:text-red-500" onClick={handleDisconnecWallet}>
                    <MdLogout size="1.2em" className="me-3" />
                    <div>Disconnect</div>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
    );
};

export default ConnectWallet;


