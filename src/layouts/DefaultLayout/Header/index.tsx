import React, { Component, useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { BiHelpCircle } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import avatar from "~/assets/images/nft/user.png";
import nami from "~/assets/images/layout/nami.svg";
import eternl from "~/assets/images/layout/eternl.png";
import flint from "~/assets/images/layout/flint.svg";
import lace from "~/assets/images/layout/lace.webp";
import ada from "~/assets/images/icon/ada.png";
import wallet from "~/assets/images/icon/wallet.png";

import "./Header.css";
//redux
import { connect } from "react-redux";
import { StateProps, handleHeightNav } from "~/utils";
import { ArrowFunction } from "typescript";
import { Dispatch } from "redux";
import { Link, NavLink } from "react-router-dom";

//Toast 
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//api
import { Box, Collapse, Fade, Slide, adaptV4Theme } from "@mui/material";
import { Loading, Transition } from "~/components";
import zIndex from "@mui/material/styles/zIndex";
import { Lucid } from "lucid-cardano";
interface HeaderProps {
  navHeight: number | undefined;
  handleHeightNav: (height: number) => void;
  lucid: Lucid;
}

function Header(props: HeaderProps) {
  let { lucid, navHeight, handleHeightNav } = props;

  let [activeUser, setActiveUser] = useState(false);
  let [activeWallet, setActiveWallet] = useState(false);
  let [isConnectWallet, setIsConnectWallet] = useState(false);
  let [loading, setLoading] = useState(false);


  let menuRef = useRef<HTMLDivElement>(null);
 
  const handleConnectWallet = async () => {
    try {
      setActiveWallet(false);
      setLoading(true);
      // if(await window.cardano.nami.isEnabled()) alert("DMM");
      const api = await window.cardano.nami.enable();
      
      lucid.selectWallet(api);
      console.log(lucid.wallet.address())
      const address = await lucid.wallet.address();
      console.log(address);
      setIsConnectWallet(true);
      toast.success("Connected wallet!", {
        position: "top-right",
        
      });
    } catch (error) {
        toast.error("Connecting wallet failed!", {
        position: "top-right"
      });
    } finally {
      setLoading(false); 
    }

    

  }

  const handleDisconnectWallet = async () => {
    try {
      setLoading(true);
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
      setLoading(false); 
    }

  }

  useEffect(() => {
    if (menuRef.current) {
      handleHeightNav(menuRef.current.offsetHeight);
    }
  }, [menuRef.current]);
  return (
    <div ref={menuRef} id="header-wrapper" className=" border-b border-fog-1">
      <Loading isOpen={loading} />
      <ToastContainer autoClose={2000}/>
      <div
        id="header"
        className=" flex justify-between items-center container max-w-7xl font-semibold cursor-pointer"
      >
        <div id="logo-wrapper" className="flex justify-start w-3/12">
          <div id="logo" className=" bg-purple-3 px-16 py-6">
            Logo
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
          <NavLink
            to="/MintingAsset"
            className="mx-3 menu-item"
            data-hover="Create"
          >
            Create
          </NavLink>
          <NavLink to="/Search" className="mx-3 menu-item" data-hover="Search">
            Search
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
              className=" h-10 rounded-full overflow-hidden"
              onClick={() => setActiveUser(!activeUser)}
            >
              <img
                src={avatar}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <Transition animation={"fadeMove"} isAppear={activeUser} timeout={400} direction="down" className="">
              <div className="dropdown-zone absolute  mt-4 right-0 bg-white text-purple-1 w-48 rounded-md">
                <ul className="py-3 px-3">
                  <li className="flex items-center mb-3">
                    <FaRegUser size="1.2em" className="me-3" />
                    <div id="user-name">hugnt</div>
                  </li>
                  <li className="flex items-center mb-3">
                    <FaEdit size="1.2em" className="me-3" />
                    <div id="user-name">Edit profile</div>
                  </li>
                  <li className="flex items-center">
                    <BiHelpCircle size="1.2em" className="me-3" />
                    <div id="user-name">Help</div>
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
              <div className="dropdown-zone absolute mt-4 right-0 bg-white text-purple-1 w-40 rounded-md">
                <ul className="py-3 ">
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3 hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                      <img src={wallet} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-ellipsis overflow-hidden">addr_231232131</div>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6" >
                    <div className="h-5 w-5 me-3 overflow-hidden">
                      <img src={ada} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="overflow-hidden">100.000 ADA</div>
                  </li>
                  <li className="border-t my-2"></li>
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
const mapStateToProps = (state: StateProps) => ({
  navHeight: state.navHeight,
  lucid: state.lucid
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleHeightNav: (height: number) => dispatch(handleHeightNav(height)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
