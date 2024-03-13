import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

import "./MintingAsset.css";
import { CheckBox, MetadataProperty } from "~/components";
import fileNotFound from "~/assets/images/layout/uploadFile.png";
import { MetadataObject, NFTMintInfor } from "~/utils";
import LucidContext from "~/contexts/components/LucidContext";
import { LucidContextType } from "~/types/LucidContextType";
import axios from "axios";
import mintAsset from "~/apiServices/contract/mintAsset";
import { toast } from "react-toastify";

interface NFTPreInfor{
  title?:string;
  mediaType?:string;
  desc?:string;
}
function convertMetadataToObj(metadataArray: any) {
  const resultObj: any = {};
  for (const item of metadataArray) {
      if (item.hasOwnProperty("property") && item.hasOwnProperty("value")) {
          resultObj[item.property] = item.value;
      }
  }
  return resultObj;
}
export default function MintingAsset() {
  const { lucidWallet } = useContext<LucidContextType>(LucidContext);
  const [isActionCreate, setIsActionCreate] = useState(false);
  const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [mediaType, setMediaType] = useState<string>("Media type asset");
    const [imagePath, setImagePath] = useState<string>("");
    const [image, setImage] = useState<File>(null!);
    const [fileName, setFileName] = useState<string>("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");
    const [metadatas, setMetadatas] = useState<MetadataObject[]>([{ key: '', value: '' }]);

  useEffect(() => {
    return function () {
      imagePath && URL.revokeObjectURL(imagePath);
    };
}, [imagePath]);
const handleChangeFile = function (event: ChangeEvent<HTMLInputElement>) {
  event.preventDefault();
  if (event.target.files !== null) {
      setImage(event.target.files[0]);
      setImagePath(URL.createObjectURL(event.target.files[0]));
      setFileName(event.target.files[0].name);
      setMediaType(event.target.files[0].type);
      event.target.value = "";
  }
};
const handleChooseFile = function () {
  const fileImageElement: any = document.querySelector(".file__input");
  fileImageElement?.click();
};

const handleChangeTitle = function (event: ChangeEvent<HTMLInputElement>) {
  setTitle(event.target.value);
};

const handleChangeDescription = function (event: ChangeEvent<HTMLTextAreaElement>) {
  setDescription(event.target.value);
};

const handleAddField = () => {
  setMetadatas(prevList => [...prevList, { key: '', value: '' }]);
};
const handleRemoveField = (index: number) => {
  setMetadatas(prevList => {
    const updatedList = [...prevList];
    updatedList.splice(index, 1);
    return updatedList;
  });
};
const handlePropertyChange = (index: number, updatedMetadata: MetadataObject) => {
  setMetadatas(prevList => {
    const updatedList = [...prevList];
    
    updatedList[index] = updatedMetadata;
    return updatedList;
  });
};

  const handleGetNFTMintInfor =async () =>{
    const nftMintInfor : NFTMintInfor ={
      fileURL:imagePath,
      title:title,
      mediaType:mediaType,
      desc:description,
      metadata: metadatas
  }  
  try {
    setIsActionCreate(true);
    if (lucidWallet) {
        const formData = new FormData();
        formData.append("file", image);
        const metadata = JSON.stringify({ name: title });
        const customMetadata = convertMetadataToObj(metadatas);
        formData.append("pinataMetadata", metadata);
        const options = JSON.stringify({ cidVersion: 0 });
        formData.append("pinataOptions", options);
        // const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        //     headers: {
        //         "Content-Type": `multipart/form-data; boundary=${formData}`,
        //         Authorization: `Bearer ${process.env.VITE_PINATA_JWT}`,
        //     },
        //     body: formData,
        // });

        const response = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYzEyMGUwYS1iMmZhLTQ1MTUtOWNlMS02OTA5YmJjOTE5NTkiLCJlbWFpbCI6InRpZW50dW5nMDMubnR0dm5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImRjN2M4MGVjNjE5N2VlMTExNDM4Iiwic2NvcGVkS2V5U2VjcmV0IjoiNmEzNjhiNzlkNGQ1NGVjOTFiYzUwYjRjY2Y5MWMzNjEwMjA5M2I2M2Y0ZWEwYjg0YWQ1ZjYyNmVhOTQ3NTA5NSIsImlhdCI6MTcwNzA1ODMzM30.99D9gyTrJRpnbdX_b5vf9u3nHDlXRfyabzKeHKG53bw`,
            },
            body: formData,
          }
        );
        const resData = await response.json();
        const { txHash, policyId, assetName } = await mintAsset({
            lucid: lucidWallet,
            customMetadata,
            description,
            imageUrl: "ipfs://" + resData.IpfsHash,
            mediaType,
            title,
        });

        if (!txHash) {
            toast.warning("Mint asset faild");
            return;
        }

        toast.success("Mint asset successfully");
        setTitle("");
        setDescription("");
        setImagePath("");
        setMetadatas([]);
        setMediaType("");
       
    } else {
        toast.error("Please connect wallet")
    }
} catch (error) {
    toast.warning("Mint asset faild");
    console.log(error);
} finally {
    setIsActionCreate(false);
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
              "  onChange={handleChangeFile} 
                onClick={handleChooseFile}
              />
          </div>
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Title</div>
          <input
            type="text"
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Title"
            onChange={handleChangeTitle}
            
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Media type</div>
          <input
            type="text"
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Media type"
            value={mediaType}
            readOnly
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Description</div>
          <textarea
            rows={5}
            className="w-full focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
            placeholder="Description"
            onChange={handleChangeDescription}
          />
        </div>
        <div className="asset-input-box mb-6">
          <div className="asset-label mb-2">Custom metadata</div>
          <div className="asset-list-metadata">

            {metadatas.map((field, index) => (
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
          {imagePath ? <div className={`h-72 nft-image  overflow-hidden mb-8`}>
            <img
              src={imagePath}
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
            <div className="nft-name font-semibold">{title==''?<i className="text-fog-2">Title</i>:title}</div>
            <div className="nft-type font-semibold">
              {mediaType==''?<i className="text-fog-2">Media type</i>:mediaType}
            </div>
          </div>
          <div id="asset-preview-desc">
            {description==''?<i className="text-fog-2">Desciption</i>:description}
          </div>
        </div>
      </div>
    </div >
  );
}