import React, { Component, useContext, useEffect, useRef, useState } from "react";

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
import ConnectWallet from "~/components/ConnectWallet/ConnectWallet";
import LucidContext from "~/contexts/components/LucidContext";
import { LucidContextType } from "~/types/LucidContextType";

export default function Header() {
  const { walletItem,isConnected } =
  useContext<LucidContextType>(LucidContext);
  let [activeUser, setActiveUser] = useState(false);
  const [refreshWallet, setRefreshWallet] = useState<boolean>(false);

  let menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const accountStore = useAppSelector((state)=>state.account.account);
  const loading = useAppSelector((state)=>state.ui.loading);
  //let accountStore = useAppSelector((state)=>state.account.account);

  let [account, setAccount] = useState<Account>(null!);
  useEffect(() => {

    const fetchData = async () => {
        const walletAddress = walletItem.walletAddress;
        if(walletAddress!== undefined){
          const resAccount = await loginAccount(walletAddress);
          if(resAccount==null) throw new Error("Server is not responding");
          setAccount(resAccount as Account);
        }
        else {
          toast.error("Error when connect wallet")
        }
        // Xử lý kết quả ở đây nếu cần
    };

    fetchData();
}, [isConnected, walletItem.walletAddress]);

  useEffect(() => {
    if (menuRef.current) {
      dispatch(handleChangeUI({navHeight: menuRef.current.offsetHeight}));
    }
    
  }, [menuRef.current]);

  useEffect(() => {
    if (isConnected===true) {
      dispatch(handleChangeAccount({account: account}));
      console.log(account)
    //  setRefreshWallet(true);
    }
    else{
      dispatch(handleChangeAccount({account: null!}));
    }
    
  }, [account, dispatch, isConnected]);

  


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
          {isConnected && <div id="user-zone" className="w-10  relative font-medium z-30">
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
          <ConnectWallet/>

        </div>
      </div>
    </div>
  );
}

