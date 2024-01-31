import React, { Fragment } from 'react'
import { IoFilter } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

import * as Icon from "react-icons/fi";

import { NFT, Pagination, CheckBox } from "~/components";
export default function Profile_Bids() {
  return (
    <Fragment>
    <div
      id="area-filter"
      className="flex justify-between container max-w-7xl pt-12"
    >
      <div id="left-filter" className="flex justify-start w-1/2">
        <select className="w-1/2 me-3 bg-fog-1 border border-white px-6 py-2 rounded-lg font-light text-white placeholder:text-white">
          <option>Sort by</option>
        </select>
        <button className=" bg-fog-1 border border-white p-2 rounded-lg">
          <IoFilter size={"1.5em"} />
        </button>
      </div>
      <div id="right-filter" className="relative w-1/3">
        <input
          type="text"
          name="price"
          id="price"
          className="w-full  bg-fog-1 border border-white px-6 ps-11 py-2 rounded-lg font-light text-white placeholder:text-white"
          placeholder="Search"
        />
        <div className="absolute left-3 top-2">
          <CiSearch size={"1.5rem"} color="white" />
        </div>
      </div>
    </div>
    <div id="area-filter-box" className="bg-fog-1 my-12 py-12">
      <div className="container max-w-7xl flex justify-between ">
        <ul>
          <li className="text-white mb-3 font-semibold">Category</li>
          <li className="mb-3">
            <CheckBox label="Art"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Game"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Music"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Video"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Design"/>
          </li>
        </ul>
        <ul>
          <li className="text-white mb-3 font-semibold">Category</li>
          <li className="mb-3">
            <CheckBox label="Art"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Game"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Music"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Video"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Design"/>
          </li>
        </ul>
        <ul>
          <li className="text-white mb-3 font-semibold">Category</li>
          <li className="mb-3">
            <CheckBox label="Art"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Game"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Music"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Video"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Design"/>
          </li>
        </ul>
        <ul>
          <li className="text-white mb-3 font-semibold">Category</li>
          <li className="mb-3">
            <CheckBox label="Art"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Game"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Music"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Video"/>
          </li>
          <li className="mb-3">
            <CheckBox  label="Design"/>
          </li>
        </ul>
      </div>
    </div>
    <div
      id="area-bidding-list"
      className="container max-w-7xl py-12 grid grid-cols-4 gap-5"
    >
      <NFT />
      <NFT />
      <NFT />
      <NFT />
      <NFT />
      <NFT />
      <NFT />
      <NFT />
    </div>
    <div
      id="area-pagination"
      className="flex justify-center container max-w-7xl py-3 pb-14"
    >
      <Pagination />
    </div>
  </Fragment>
  )
}
