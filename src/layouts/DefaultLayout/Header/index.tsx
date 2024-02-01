import React, { Component, useEffect, useRef } from 'react'
import { IoNotifications } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import avatar from "~/assets/images/nft/user.png"
import './Header.css'
//redux
import { connect } from 'react-redux';
import { StateProps, handleHeightNav } from '~/utils';
import { ArrowFunction } from 'typescript';
import { Dispatch } from 'redux';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {
    navHeight: number | undefined;
    handleHeightNav: (height: number) => void;
  }
function Header(props:HeaderProps) {
    let menuRef = useRef<HTMLDivElement>(null);
    let {navHeight,handleHeightNav } = props;
    useEffect(()=>{
        if (menuRef.current) {
            handleHeightNav(menuRef.current.offsetHeight);
        }
    },[menuRef.current]);
  return (
    <div ref={menuRef} id="header-wrapper" className=' border-b border-fog-1'>
        <div id="header" className='flex justify-between items-center container max-w-7xl font-semibold cursor-pointer'>
            <div id="logo-wrapper" className='flex justify-start w-3/12'>
            <div id="logo" className=' bg-purple-3 px-16 py-6'>
                Logo
            </div>
            </div>
            <ul id="menu" className='flex justify-center '>
            <NavLink to="/Home" className='mx-3 menu-item' data-hover="Home">Home</NavLink>
            <NavLink to="/Bidding" className='mx-3 menu-item' data-hover="Bidding">Bidding</NavLink>
            <NavLink to="/MintingAsset" className='mx-3 menu-item' data-hover="Create">Create</NavLink>
            <NavLink to="/Search" className='mx-3 menu-item' data-hover="Search">Search</NavLink>
            <NavLink to="/More" className='mx-3 menu-item flex justify-between items-center' data-hover="More">More &nbsp; <FaCaretDown color='white'/></NavLink>
            </ul>
            <div className='flex justify-end items-center w-3/12'>
            <div id="notification" className='rounded-full border border-white  bg-fog-1 p-1.5'>
                <IoNotifications size={"1.5em"}/>
            </div>
            <div id="user-avatar" className='w-10 h-10 mx-3 rounded-full overflow-hidden'>
                <img src={avatar} className="w-full h-full object-cover object-center"></img>
            </div>
            <div id="connect-wallet" className='flex justify-between items-center rounded-[40px] bg-fog-1 px-4 py-1.5 border border-white' >
                Connect Wallet &nbsp; <FaCaretDown />
            </div> 
            </div>
        </div>
    </div>
  )
}
const mapStateToProps = (state: StateProps) => ({ 
    navHeight: state.navHeight
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleHeightNav: (height: number) => dispatch(handleHeightNav(height))
  });
export default connect(mapStateToProps, mapDispatchToProps)(Header);