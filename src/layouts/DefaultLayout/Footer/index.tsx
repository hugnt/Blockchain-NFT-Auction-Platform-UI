import React from "react";
import { FaCaretRight } from "react-icons/fa6";
import logo from "~/assets/images/layout/logo-full.png";
import { FaFacebookF, FaYoutube, FaTwitter, FaTelegramPlane  } from "react-icons/fa";
export default function Footer() {
  return (
    <div id="footer-wrapper" className="bg-purple-3 text-fog-2 cursor-pointer">
      <div id="footer" className="font-semibold container max-w-7xl pt-12">
        <div id="ft-top" className="flex justify-between items-center">
          <div id="ft-logo-wrapper" className="flex justify-start">
          <div id="logo" className="py-4">
            <img src={logo} alt="" className="object-contain w-60"/>
          </div>
          </div>
          <ul>
            <li className="text-white mb-1.5">Auction Plaform</li>
            <li className="mb-1.5">Home</li>
            <li className="mb-1.5">Biding</li>
            <li className="mb-1.5">Create</li>
          </ul>
          <ul>
            <li className="text-white mb-1.5">Useful Link</li>
            <li className="mb-1.5">Guide</li>
            <li className="mb-1.5">Contact</li>
            <li className="mb-1.5">Police Temp</li>
          </ul>
          <ul>
            <li className="text-white mb-1.5">Resources</li>
            <li className="mb-1.5">Blogs</li>
            <li className="mb-1.5">Community</li>
            <li className="mb-1.5">Comming Soon</li>
          </ul>
          <ul>
            <li className="text-white mb-1.5">FeedBack</li>
            <li className="relative mb-3">
              <input
                type="text"
                name="price"
                id="price"
                className=" bg-fog-1 border border-white px-6 py-2 rounded-lg font-light text-white placeholder:text-white"
                placeholder="Your Email"
              />
              <div className="absolute  right-3 top-2">
                <FaCaretRight size={"1.5rem"} color="white" />
              </div>
            </li>
            <li className="mb-1.5">
              <ul className="flex justify-between items-center">
                <li className="border border-white p-2 rounded-lg bg-fog-1">
                  <FaFacebookF size={"1.5rem"} color="white" />
                </li>
                <li className="border border-white p-2 rounded-lg bg-fog-1">
                  <FaYoutube size={"1.5rem"} color="white" />
                </li>
                <li className="border border-white p-2 rounded-lg bg-fog-1">
                  <FaTwitter size={"1.5rem"} color="white" />
                </li>
                <li className="border border-white p-2 rounded-lg bg-fog-1">
                  <FaTelegramPlane size={"1.5rem"} color="white" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          id="ft-bottom"
          className="flex justify-between py-6 mt-8 border-t-2"
        >
          <div id="ft-bottom-left">English</div>
          <div id="ft-bottom-right" className="text-right">
            <div className="text-white">Design by: Blockalpha</div>
            <div>Contact us: bloackalpha@gmail.com </div>
          </div>
        </div>
      </div>
    </div>
  );
}
