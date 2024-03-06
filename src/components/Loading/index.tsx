import { Box, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import cardano from "~/assets/images/icon/cardano2.png";
import './Loading.css'
interface LoadingPros {
    children?: string;
    title?: string;
    isOpen?: boolean;
}

export default function Loading(props: LoadingPros) {
    let { children, title = "Loading...",isOpen=true } = props;

    const [open, setOpen] = useState(isOpen);
    useEffect(()=>{
        setOpen(isOpen);
    },[isOpen])

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex items-center justify-center '
            
        >
            <div className='overflow-hidden  outline-none rounded-full p-4 px-10' id="loadingContent">
                <div className='animate-spin h-36 '>
                    <img src={cardano} alt="" className="w-full h-full object-contain" />
                </div>
                <div className='text-center text-white font-bold text-2xl mt-5 animate-pulse'>{title}</div>
            </div>
        </Modal>
    )
}
