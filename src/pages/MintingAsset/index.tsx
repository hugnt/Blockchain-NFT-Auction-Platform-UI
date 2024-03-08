import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

import "./MintingAsset.css";
import { CheckBox, MetadataProperty } from "~/components";
import fileNotFound from "~/assets/images/layout/uploadFile.png";
import { MetadataObject, NFTMintInfor } from "~/utils";

interface NFTPreInfor{
  title?:string;
  mediaType?:string;
  desc?:string;
}

export default function MintingAsset() {
  const [file, setFile] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MetadataObject[]>([{ key: '', value: '' }]);
  const [nftInfor, setNFTInfor] = useState<NFTPreInfor>({title:"",mediaType:"", desc:""});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileObjectUrl = URL.createObjectURL(e.target.files[0]);
      setFile(fileObjectUrl);
    }
    else {
      setFile(null);
    }
  };
  const handleInforChange = (nftInfor:NFTPreInfor) =>{
    setNFTInfor(prevInfor => {
      let updatedInfor = {...prevInfor};
      if(nftInfor.title!=null) updatedInfor.title = nftInfor.title;
      else if(nftInfor.mediaType!=null) updatedInfor.mediaType = nftInfor.mediaType;
      else if(nftInfor.desc!=null) updatedInfor.desc = nftInfor.desc;
      return updatedInfor;
    });
  }

  const handleAddField = () => {
    setMetadata(prevList => [...prevList, { key: '', value: '' }]);
  };
  const handleRemoveField = (index: number) => {
    setMetadata(prevList => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };
  const handlePropertyChange = (index: number, updatedMetadata: MetadataObject) => {
    setMetadata(prevList => {
      const updatedList = [...prevList];
      
      updatedList[index] = updatedMetadata;
      return updatedList;
    });
  };

  const handleGetNFTMintInfor = () =>{
      const nftMintInfor:NFTMintInfor ={
          fileURL:file,
          title:nftInfor.title,
          mediaType:nftInfor.mediaType,
          desc:nftInfor.desc,
          metadata: metadata
      }
      console.log(nftMintInfor);
  };  
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
              "  onChange={handleFileChange} />
          </div>
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Title</div>
          <input
            type="text"
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Title"
            onChange={(e)=>handleInforChange({title:e.target.value})}
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Media type</div>
          <input
            type="text"
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Media type"
            onChange={(e)=>handleInforChange({mediaType:e.target.value})}
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Description</div>
          <textarea
            rows={5}
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Description"
            onChange={(e)=>handleInforChange({desc:e.target.value})}
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Custom metadata</div>
          <div className="asset-list-metadata">

            {metadata.map((field, index) => (
              <MetadataProperty
                key={index}
                index={index}
                metadata={field}
                onChange={(index, updatedMetadata) => handlePropertyChange(index, updatedMetadata)}
                onRemove={() => handleRemoveField(index)}
              />
            ))}
            <div id="asset-metadata-add" className="flex items-center">
              <button className="me-3 bg-fog-1 border border-fog-1 p-2.5 
                rounded-lg font-light overflow-hidden hover:bg-green-400"
                onClick={handleAddField}>
                <FaPlus className="hover:scale-125" />
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
          <button className="font-semibold text-2xl rounded-lg
           bg-fog-1 px-14 py-2 border border-fog-2
           hover:bg-purple-3 hover:scale-110
           transition ease-in-out delay-150 
           hover:-translate-y-1
           duration-300 hover:border-green-500 hover:text-green-500"
           onClick={handleGetNFTMintInfor}>
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
          {file ? <div className={`h-72 nft-image  overflow-hidden mb-8`}>
            <img
              src={file}
              className="w-full h-full object-contain object-center relative"
            />
          </div> :
            <div className={`flex flex-col justify-end h-60 nft-image  overflow-hidden `}>
              <img
                src={fileNotFound}
                className="w-full h-52 object-contain object-center relative animate-bounce "
              />
            </div>}
          <div className="nft-pre-infor flex justify-between my-2">
            <div className="nft-name font-semibold">{nftInfor.title==''?<i className="text-fog-2">Title</i>:nftInfor.title}</div>
            <div className="nft-type font-semibold">
              {nftInfor.mediaType==''?<i className="text-fog-2">Media type</i>:nftInfor.mediaType}
            </div>
          </div>
          <div id="asset-preview-desc">
            {nftInfor.desc==''?<i className="text-fog-2">Desciption</i>:nftInfor.desc}
          </div>
        </div>
      </div>
    </div >
  );
}
