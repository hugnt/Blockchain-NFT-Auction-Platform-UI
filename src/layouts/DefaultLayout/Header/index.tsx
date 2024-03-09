import React, { Component, useEffect, useRef, useState } from "react";

import { IoNotifications } from "react-icons/io5";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { BiHelpCircle } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";

import logo from "~/assets/images/layout/logo12.png";
import nami from "~/assets/images/layout/nami.svg";
import eternl from "~/assets/images/layout/eternl.png";
import flint from "~/assets/images/layout/flint.svg";
import lace from "~/assets/images/layout/lace.webp";
import ada from "~/assets/images/icon/ada.png";
import wallet from "~/assets/images/icon/wallet.png";

import "./Header.css";
//redux
import { Account,  } from "~/utils";
import { Link, NavLink } from "react-router-dom";

//Toast 
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//api
import { Tooltip } from "@mui/material";
import { Loading, Transition } from "~/components";
import { UTxO } from "lucid-cardano";

//be
import { loginAccount } from "~/apiServices/backend";
import { GET_IMAGE } from "~/apiServices/utils/request";
import { useAppDispatch, useAppSelector } from "~/utils/store/store";
import { handleChangeAccount } from "~/utils/store/features/accountSlice";
import { handleChangeUI, handleLoading } from "~/utils/store/features/uiSlice";

export default function Header() {

  let [activeUser, setActiveUser] = useState(false);
  let [activeWallet, setActiveWallet] = useState(false);
  let [isConnectWallet, setIsConnectWallet] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [utxos, setUTxOs] = useState<UTxO[]>([]);
  const [refreshWallet, setRefreshWallet] = useState<boolean>(false);

  let menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const accountStore = useAppSelector((state)=>state.account.account);
  const lucid = useAppSelector((state)=>state.lucid.lucid);
  const loading = useAppSelector((state)=>state.ui.loading);
  //let accountStore = useAppSelector((state)=>state.account.account);

  let [account, setAccount] = useState<Account>(null!);
  const handleConnectWallet = async () => {
    try {
      setActiveWallet(false);
      dispatch(handleLoading({loading:true}));

      const api = await window.cardano.nami.enable();
      lucid.selectWallet(api);
      
      const walletAddress = await lucid.wallet.address();
      const resAccount = await loginAccount(walletAddress);
      
      if(resAccount==null) throw new Error("Server is not responding");
      setAccount(resAccount as Account);

      setIsConnectWallet(true);
      toast.success("Connected wallet!", {
        position: "top-right",
        
      });
    } catch (error) {
        toast.error("Connecting wallet failed!", {
        position: "top-right"
      });
    } finally {
      dispatch(handleLoading({loading:false}));
    }

  }

  const handleDisconnectWallet = async () => {
    try {
      dispatch(handleLoading({loading:true}));
      setActiveWallet(false);
      lucid.selectWallet(null!);
      
      setIsConnectWallet(false);
      toast.success("Disconnected wallet!", {
        position: "top-right",
        
      });
    } catch (error) {
        toast.error("Disconnecting failed!", {
        position: "top-right"
      });
    } finally {
      dispatch(handleLoading({loading:false}));
    }

  }

  //USE EFFECT
  useEffect(() => {
    async function checkAlreadyConnectWallet(){
      setActiveWallet(false);
      dispatch(handleLoading({loading:true}));

      const isNamiConnected = await window.cardano.nami.isEnabled();
      if(lucid==null||!isNamiConnected) return;
      const api = await window.cardano.nami.enable();
      lucid.selectWallet(api);
    
      const walletAddress = await lucid.wallet.address();
      const resAccount = await loginAccount(walletAddress);
      if(resAccount==null) throw new Error("Server is not responding");
      setAccount(resAccount as Account);

      setIsConnectWallet(true);
      toast.success("Reconnected wallet!", {
        position: "top-right",
        
      });
    }
    try {
      if(accountStore&&lucid){
        checkAlreadyConnectWallet();
      }
    } catch (error) {
        toast.error("Connecting Server failed", {
        position: "top-right"
      });
    } finally {
      dispatch(handleLoading({loading:false}));
    }

    
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      dispatch(handleChangeUI({navHeight: menuRef.current.offsetHeight}));
    }
    
  }, [menuRef.current]);

  useEffect(() => {
    if (isConnectWallet) {
      dispatch(handleChangeAccount({account: account}));
      setRefreshWallet(true);
    }
    else{
      dispatch(handleChangeAccount({account: null!}));
    }
    
  }, [isConnectWallet]);

  

  useEffect(() => {
    const getAddress = async () => {
      const walletAddress = await lucid.wallet.address();
      setAddress(walletAddress);
    };
    const getUtxos = async () => {
        const UTXOS = await lucid.wallet.getUtxos();
        setUTxOs(UTXOS);
        //console.log(UTXOS);
    }

    if(lucid&&refreshWallet){getAddress();getUtxos();}
  }, [refreshWallet]);


  return (
    <div ref={menuRef} id="header-wrapper" className=" border-b border-fog-1">
      <ToastContainer autoClose={2000}/>
      <div
        id="header"
        className=" flex justify-between items-center container max-w-7xl font-semibold cursor-pointer"
      >
        <div id="logo-wrapper" className="flex justify-start w-3/12">
          <div id="logo" className="py-4">
            <img src={logo} alt="" className="object-contain w-40"/>
          </div>
        </div>
        <ul id="menu" className="flex justify-center ">
          <NavLink to="/Home" className="mx-3 menu-item" data-hover="Home">
            Home
          </NavLink>
          <NavLink
            to="/Bidding"
            className="mx-3 menu-item"
            data-hover="Bidding"
          >
            Bidding
          </NavLink>
          <NavLink to="/Voting" className="mx-3 menu-item" data-hover="Voting">
            Voting
          </NavLink>
          <NavLink
            to="/MintingAsset"
            className="mx-3 menu-item"
            data-hover="Create"
          >
            Create
          </NavLink>
          <NavLink
            to="/More"
            className="mx-3 menu-item flex justify-between items-center"
            data-hover="More"
          >
            More &nbsp; <FaCaretDown color="white" />
          </NavLink>
        </ul>
        <div className="flex justify-end items-center w-3/12">
          <div
            id="notification"
            className="rounded-full border border-white  bg-fog-1 p-1.5 me-1.5"
          >
            <IoNotifications size={"1.5em"} />
          </div>
          {isConnectWallet && <div id="user-zone" className="w-10  relative font-medium z-30">
            <div
              id="user-avatar"
              className=" h-10 rounded-full overflow-hidden border-2"
              onClick={() => setActiveUser(!activeUser)}
            >
              <img
                src={account.avatar&&GET_IMAGE(account.avatar)}
                className="w-full h-full object-cover object-center hover:scale-125"
              />
            </div>
            <Transition animation={"fadeMove"} isAppear={activeUser} timeout={400} direction="down" className="">
              <div className="dropdown-zone absolute  mt-4 right-0 bg-white text-purple-1 w-48 rounded-md">
                <ul className="py-3 ">
                  <Link to={`/Profile/${account.id}`} className="p-2 ps-4 flex items-center hover:bg-purple-3  hover:text-purple-6" >
                    <FaRegUser size="1.2em" className="me-3" />
                    <div className="text-ellipsis overflow-hidden w-full">{account&&account.name}</div>
                  </Link>
                  <li className="p-2 ps-4 flex items-center  hover:bg-purple-3  hover:text-purple-6">
                    <FaEdit size="1.2em" className="me-3" />
                    <div>Edit profile</div>
                  </li>
                  <li className="p-2 ps-4 flex items-center  hover:bg-purple-3  hover:text-purple-6">
                    <BiHelpCircle size="1.2em" className="me-3" />
                    <div>Help</div>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>}

          <div className="relative z-30 ms-1.5" >
            <div
              className=" flex justify-between items-center rounded-[40px] bg-fog-1 px-4 py-1.5 border border-white  hover:bg-purple-3"
              onClick={() => setActiveWallet(!activeWallet)}
            >
              {isConnectWallet ? <li className="flex items-center">
                <div className="h-5 w-5 overflow-hidden me-3">
                  <img src={nami} alt="" className="w-full h-full object-contain" />
                </div>
                <div id="user-name">Nami</div>
              </li> : "Connect Wallet"}

              &nbsp;{" "}
              {activeWallet ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {!isConnectWallet && <Transition animation={"fadeMove"} isAppear={activeWallet} timeout={400} direction="down" className="">
              <div className="dropdown-zone absolute mt-4 right-0 bg-white text-purple-1 w-40 rounded-md">
                <ul className="py-3 ">
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6" onClick={async () => handleConnectWallet()}>
                    <div className="h-5 w-5 overflow-hidden me-3">
                      <img src={nami} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div id="user-name">Nami</div>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                      <img src={eternl} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div id="user-name">Eternl</div>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                      <img src={flint} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div id="user-name">Flint</div>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                      <img src={lace} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div id="user-name">Lace</div>
                  </li>
                  <li className="border-t my-2"></li>
                  <li className="flex items-center px-3 hover:text-purple-6">
                    <MdOutlineRemoveRedEye size="1.2em" className="me-3" />
                    <div id="user-name">View All</div>
                  </li>
                </ul>
              </div>
            </Transition>}

            {isConnectWallet && <Transition animation={"fadeMove"} isAppear={activeWallet} timeout={400} direction="down" className="">
              <div className="dropdown-zone absolute mt-4 right-0 bg-white text-purple-1 w-48 rounded-md">
                <ul className="py-3 ">
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3 hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                      <img src={wallet} alt="" className="w-full h-full object-contain" />
                    </div>
                    <Tooltip title={address} placement="left">
                      <div className="text-ellipsis overflow-hidden  w-full">{address}</div>
                    </Tooltip>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6" >
                    <div className="h-5 w-5 me-3 overflow-hidden">
                      <img src={ada} alt="" className="w-full h-full object-contain" />
                    </div>
                    <Tooltip title={utxos[utxos.length - 1]&&(utxos[utxos.length - 1].assets.lovelace) + " lovelace"} placement="left">
                      <div className="overflow-hidden">{utxos[utxos.length - 1]&&((utxos[utxos.length - 1].assets.lovelace)/BigInt(1000000)).toString()} ADA</div>
                    </Tooltip>
                  </li>
                  <li className="border-t my-2"></li>
                  <li className="flex items-center px-3 hover:text-green-600 mb-3" onClick={() => setRefreshWallet(true)}>
                    <MdRefresh  size="1.2em" className="me-3" />
                    <div>Refresh</div>
                  </li>
                  <li className="flex items-center px-3 hover:text-red-500" onClick={async () => handleDisconnectWallet()}>
                    <MdLogout size="1.2em" className="me-3" />
                    <div>Disconnect</div>
                  </li>
                </ul>
              </div>
            </Transition>}
          </div>
        </div>
      </div>
    </div>
  );
}

