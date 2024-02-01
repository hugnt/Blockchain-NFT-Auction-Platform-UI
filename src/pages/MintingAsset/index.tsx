import React from "react";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import "./MintingAsset.css";
import { CheckBox } from "~/components";
import nftImg from "~/assets/images/nft/nft4.png";
export default function MintingAsset() {
  return (
    <div
      id="mint-details"
      className="container max-w-7xl flex justify-between py-12"
    >
      <div id="asset-infor" className="w-8/12">
        <div className="text-4xl font-semibold mb-8">Mint your asset</div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Upload file</div>
          <div className=" bg-fog-1 border border-fog-1 p-12 rounded-lg  text-white flex flex-col items-center">
            <i id="asset-upload-desc" className="mb-3 text-fog-2">PNG, Video, Music, GIF, MP4 or MP3. Max 100mb</i>
            <input type="file" className="block text-sm text-white 
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border file:border-fog-1
                file:bg-fog-1 file:text-white
                file:text-sm file:font-semibold
                hover:file:bg-white
                hover:file:text-purple-800
              "/>
          </div>
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Title</div>
          <input
            type="text"
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Title"
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Media type</div>
          <input
            type="text"
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Media type"
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Description</div>
          <textarea
            rows={5}
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Description"
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Custom metadata</div>
          <div className="asset-list-metadata">
            <div id="metadata-box" className="mb-6">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  className="w-1/3 focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
                  placeholder="Property name"
                />
                <input
                  type="text"
                  className="mx-3 w-2/3 focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
                  placeholder="Property value"
                />
                <div className="asset-btn-remove cursor-pointer" title="Remove">
                  <GoTrash size={"2.2em"} />
                </div>
              </div>
            </div>
            <div id="asset-metadata-add" className="flex items-center">
              <button className="me-3 bg-fog-1 border border-fog-1 p-2.5 rounded-lg font-light">
                <FaPlus />
              </button>
              <i className="">Add field</i>
            </div>
          </div>
        </div>
        <div
          id="asset-calc-fee"
          className=" bg-purple-3 border-2 border-white py-6 px-8 rounded-lg"
        >
          <div className="text-2xl font-semibold mb-4">Total Fees</div>
          <div id="lst-fee-box" className="text-xl">
            <div className="flex justify-between mb-3 items-center">
              <div className="fee-name">Platform fee</div>
              <div className="fee-amount font-semibold text-3xl">0.2</div>
            </div>
            <div className="flex justify-between mb-3 items-center">
              <div className="fee-name">Transaction fee</div>
              <div className="fee-amount font-semibold text-3xl">0.3</div>
            </div>
          </div>
          <div className="text-xl items-center flex justify-between border-t-2 border-fog-1 mt-5 pt-5">
            <div>Estimated gas fee</div>
            <div className="fee-amount font-semibold text-3xl text-green-400">
              0.5
            </div>
          </div>
        </div>
        <div className="mt-5">
          <i>
            <CheckBox
              label="Do you want to mint?"
              labelClassName="text-white"
            />
          </i>
        </div>
        <div id="btn-create-asset" className="text-center mt-8">
          <button className="font-semibold text-2xl rounded-lg bg-fog-1 px-14 py-2 border border-fog-2">
            Create
          </button>
        </div>
      </div>
      <div id="asset-preview" className="ms-10 w-4/12 ">
        <div className="text-4xl font-semibold mb-14">Preview</div>
        <div
          id="asset-preview-box"
          className="top-12 mb-28 p-8 rounded-[20px] border border-fog-2 bg-fog-1 overflow-hidden "
        >
          <div className={`h-72 nft-image  overflow-hidden mb-8`}>
            <img
              src={nftImg}
              className="w-full h-full object-contain object-center relative"
            />
          </div>
          <div className="nft-pre-infor flex justify-between my-2">
            <div className="nft-name font-semibold">3D Art</div>
            <div className="nft-type font-semibold">
             Media type
            </div> 
          </div>
          <div id="asset-preview-desc">
              Description
          </div>
        </div>
      </div>
    </div>
  );
}
