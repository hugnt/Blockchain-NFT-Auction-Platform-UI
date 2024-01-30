import React from 'react'
import nftImg from "~/assets/images/nft/nft5.png";
interface PropNFTCategory{
    label?:string;
    className?: string;
}
const imgStyle = {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    background: "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 40%, rgba(66, 12, 88, 1) 100%)",
  };
export default function NFTCategory(props: PropNFTCategory) {
    let {label, className} = props;
  return (
    <div className='rounded-[20px] relative overflow-hidden'>
        <img src={nftImg} alt="" className='w-full h-full object-cover object-center'/>
        <div className="absolute inset-0" style={imgStyle}></div>
        <div className='absolute font-semibold text-2xl left-0 right-0 bottom-4 text-center'>{label}</div>
    </div>
  )
}
