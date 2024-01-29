import React from 'react'
import { IoNotifications } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import avatar from "~/assets/images/layout/ava.png"
import './Header.css'
export default function Header() {
  return (
    <div id="header-wrapper" className=' border-b border-fog-1'>
        <div id="header" className='flex justify-between items-center container max-w-7xl font-semibold cursor-pointer'>
            <div id="logo-wrapper" className='flex justify-start w-3/12'>
            <div id="logo" className=' bg-purple-3 px-16 py-6'>
                Logo
            </div>
            </div>
            <ul id="menu" className='flex justify-center '>
            <li className='mx-3 menu-item' data-hover="Home">Home</li>
            <li className='mx-3 menu-item' data-hover="Bidding">Bidding</li>
            <li className='mx-3 menu-item' data-hover="Create">Create</li>
            <li className='mx-3 menu-item' data-hover="Search">Search</li>
            <li className='mx-3 menu-item flex justify-between items-center' data-hover="More">More &nbsp; <FaCaretDown color='white'/></li>
            </ul>
            <div className='flex justify-end items-center w-3/12'>
            <div id="notification" className='rounded-full border border-white  bg-fog-1 p-1.5'>
                <IoNotifications size={"1.5em"}/>
            </div>
            <div id="user-avatar" className='w-10 mx-3'>
                <img src={avatar}></img>
            </div>
            <div id="connect-wallet" className='flex justify-between items-center rounded-[40px] bg-fog-1 px-4 py-1.5 border border-white' >
                Connect Wallet &nbsp; <FaCaretDown />
            </div> 
            </div>
        </div>
    </div>
  )
}
