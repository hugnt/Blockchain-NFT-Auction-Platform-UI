import React from 'react';
import './App.css'
import { IoNotifications } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import avatar from "./assets/images/layout/ava.png"
import { FaCaretRight } from "react-icons/fa6";
import { FaFacebookF, FaYoutube, FaTwitter, FaTelegramPlane  } from "react-icons/fa";

//banner
import banner from "./assets/images/nft/nft3.png"
const bannerStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backgroundPosition: "50%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 59.67%, #A259FF 100%)",
};
function App() {
  return (
      <div className=''>
        <div className='h-screen overflow-hidden'>
          <div id="header-wrapper" className=''>
            <div id="header" className='flex justify-between items-center container max-w-7xl font-semibold cursor-pointer'>
              <div id="logo-wrapper" className='flex justify-start w-3/12'>
                <div id="logo" className=' bg-purple-3 px-16 py-6'>
                  Logo
                </div>
              </div>
              <ul id="menu" className='flex justify-center '>
                <li className='mx-3'>Home</li>
                <li className='mx-3'>Bidding</li>
                <li className='mx-3'>Create</li>
                <li className='mx-3'>Search</li>
                <li className='mx-3 flex justify-between items-center'>More &nbsp; <FaCaretDown /></li>
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
          <div id="banner" className='h-full relative'>
            <img src={banner} className='w-full h-full object-cover object-center relative'/>
            <div className='absolute inset-0 z-10' style={bannerStyle}></div>
            <div className='absolute right-0 z-20 left-0 bottom-0 top-3/4 container max-w-7xl'>
              <div className='flex justify-between items-center'>
                <div className='text-3xl'>
                  <p>Explore NFT on Auction, bid, buy, sell</p>
                  <p>Create your own NFTs</p>
                </div>
                <div>
                  <button className='rounded-[40px] bg-fog-1 px-16 py-4 border border-white'>Explore now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="main">
          
        </div>
        <div id="footer-wrapper" className=' text-fog-2 cursor-pointer'>
          <div id="footer" className='font-semibold container max-w-7xl pt-12'>
            <div id="ft-top" className='flex justify-between items-center'>
                  <div id="ft-logo-wrapper" className='flex justify-start'>
                    <div id="ft-logo" className='text-white bg-purple-3 px-16 py-6'>
                      Logo
                    </div>
                  </div>
                  <ul>
                    <li className='text-white mb-1.5'>Auction Plaform</li>
                    <li className='mb-1.5'>Home</li>
                    <li className='mb-1.5'>Biding</li>
                    <li className='mb-1.5'>Create</li>
                  </ul>
                  <ul>
                    <li className='text-white mb-1.5'>Useful Link</li>
                    <li className='mb-1.5'>Guide</li>
                    <li className='mb-1.5'>Contact</li>
                    <li className='mb-1.5'>Police Temp</li>
                  </ul>
                  <ul>
                    <li className='text-white mb-1.5'>Resources</li>
                    <li className='mb-1.5'>Blogs</li>
                    <li className='mb-1.5'>Community</li>
                    <li className='mb-1.5'>Comming Soon</li>
                  </ul>
                  <ul>
                    <li className='text-white mb-1.5'>FeedBack</li>
                    <li className='relative mb-3'>
                      <input
                          type="text"
                          name="price"
                          id="price"
                          className=" bg-fog-1 border border-white px-6 py-2 rounded-lg font-light text-white placeholder:text-white"
                          placeholder="Your Email"
                        />
                        <div className='absolute  right-3 top-2'>
                            <FaCaretRight size={"1.5rem"} color='white'/>
                        </div>
                    </li>
                    <li className='mb-1.5'>
                      <ul className='flex justify-between items-center'>
                        <li className='border border-white p-2 rounded-lg bg-fog-1'>
                          <FaFacebookF size={"1.5rem"} color='white'/>
                        </li>
                        <li className='border border-white p-2 rounded-lg bg-fog-1'>
                          <FaYoutube  size={"1.5rem"} color='white'/>
                        </li>
                        <li className='border border-white p-2 rounded-lg bg-fog-1'>
                          <FaTwitter size={"1.5rem"} color='white'/>
                        </li>
                        <li className='border border-white p-2 rounded-lg bg-fog-1'>
                          <FaTelegramPlane  size={"1.5rem"} color='white'/>
                        </li>
                      </ul>
                    </li>
                  </ul>
            </div>
            <div id="ft-bottom" className='flex justify-between py-6 mt-8 border-t-2'>
                <div id="ft-bottom-left">English</div>
                <div id="ft-bottom-right" className='text-right'>
                    <div className='text-white'>Design by: Blockalpha</div>
                    <div>Contact us: bloackalpha@gmail.com </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
