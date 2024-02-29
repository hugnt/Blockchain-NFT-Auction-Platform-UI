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
import avatar from "~/assets/images/nft/user.png";
import nami from "~/assets/images/layout/nami.svg";
import eternl from "~/assets/images/layout/eternl.png";
import flint from "~/assets/images/layout/flint.svg";
import lace from "~/assets/images/layout/lace.webp";
import "./Header.css";
//redux
import { connect } from "react-redux";
import { StateProps, handleHeightNav } from "~/utils";
import { ArrowFunction } from "typescript";
import { Dispatch } from "redux";
import { Link, NavLink } from "react-router-dom";

//api
import { lucid } from "~/apiServices/cardano/lucid";
interface HeaderProps {
  navHeight: number | undefined;
  handleHeightNav: (height: number) => void;
}
function Header(props: HeaderProps) {
  let [activeUser, setActiveUser] = useState(false);
  let [activeWallet, setActiveWallet] = useState(false);

  let menuRef = useRef<HTMLDivElement>(null);
  let { navHeight, handleHeightNav } = props;

  const  handleConnectWallet = async () =>{
      const api = await window.cardano.nami.enable();
      lucid.selectWallet(api);
      const address = await lucid.wallet.address();
      console.log(address);
  }

  useEffect(() => {
    if (menuRef.current) {
      handleHeightNav(menuRef.current.offsetHeight);
    }
  }, [menuRef.current]);
  return (
    <div ref={menuRef} id="header-wrapper" className=" border-b border-fog-1">
      <div
        id="header"
        className="flex justify-between items-center container max-w-7xl font-semibold cursor-pointer"
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
            className="rounded-full border border-white  bg-fog-1 p-1.5"
          >
            <IoNotifications size={"1.5em"} />
          </div>
          <div id="user-zone" className="w-10 mx-3 relative font-medium">
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
            {activeUser && (
              <div className="dropdown-zone absolute z-30 top-[57px] right-0 bg-white text-purple-1 w-48 rounded-md">
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
                  <li className="border-t my-4"></li>
                  <li className="flex items-center">
                    <MdLogout size="1.2em" className="me-3" />
                    <div id="user-name">Logout</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className="flex justify-between items-center rounded-[40px] bg-fog-1 px-4 py-1.5 border border-white  hover:bg-purple-3"
              onClick={() => setActiveWallet(!activeWallet)}
            >
              Connect Wallet &nbsp;{" "}
              {activeWallet ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {activeWallet && (
              <div className="dropdown-zone  absolute z-30 top-[56px] right-0 bg-white text-purple-1 w-40 rounded-md">
                <ul className="py-3 ">
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6" onClick={async () => handleConnectWallet()}>
                    <div className="h-5 w-5 overflow-hidden me-3">
                        <img src={nami} alt="" className="w-full h-full object-contain"/>
                    </div>
                    <div id="user-name">Nami</div>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                        <img src={eternl} alt="" className="w-full h-full object-contain"/>
                    </div>
                    <div id="user-name">Eternl</div>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                        <img src={flint} alt="" className="w-full h-full object-contain"/>
                    </div>
                    <div id="user-name">Flint</div>
                  </li>
                  <li className="flex items-center px-3 py-2 hover:bg-purple-3  hover:text-purple-6">
                    <div className="h-5 w-5 overflow-hidden me-3">
                        <img src={lace} alt="" className="w-full h-full object-contain"/>
                    </div>
                    <div id="user-name">Lace</div>
                  </li>
                  <li className="border-t my-2"></li>
                  <li className="flex items-center px-3 hover:text-purple-6">
                    <MdOutlineRemoveRedEye  size="1.2em" className="me-3" />
                    <div id="user-name">View All</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state: StateProps) => ({
  navHeight: state.navHeight,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleHeightNav: (height: number) => dispatch(handleHeightNav(height)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
