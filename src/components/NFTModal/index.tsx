import React from 'react'
import { Box, Grow, Modal } from '@mui/material';
import cardano from "~/assets/images/nft/nft2.png";
import { CiCircleRemove } from "react-icons/ci";
import { BsCopy } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import './NFTModal.css'

interface NFTModalProps {
    isAppear: boolean;
    setAppear: (isAppear: boolean) => void;
}
export default function NFTModal(props: NFTModalProps) {
    let { isAppear, setAppear } = props;


    return (
        <Modal
            open={isAppear}
            onClose={() => setAppear(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex items-center justify-center '
            closeAfterTransition
            disableScrollLock ={true}
            disableEnforceFocus 
        >
            <Grow in={isAppear} timeout={300}>
                <div className='overflow-hidden pb-5 outline-none rounded-2xl w-2/3 border-2 border-fog-2 leading-7 text-sm bg-fog-5' id="nftModal" >
                    <div id='modal-top'>
                        <div className='flex justify-between px-10 py-3' >
                            <div className='font-bold text-2xl'>NFT Name</div>
                            <div className="asset-btn-remove cursor-pointer" title="Close" onClick={() => setAppear(false)}>
                                <CiCircleRemove size={"2.2em"} color="#e74f4e" className="hover:scale-125" />
                            </div>
                        </div>
                    </div>
                    <div className='flex my-10 px-10'>
                        <div className='relative overflow-hidden rounded-xl h-72 w-1/3 me-10 bg-fog-1'>
                            <img src={cardano} alt="" className='object-contain w-full h-full' />
                            <div className='font-semibold absolute left-3 top-3 drop-shadow-2xl' id="voteNumber">150 Votes</div>
                        </div>
                        <div className='cursor-pointer'>
                            <div>
                                <div className='text-lg mb-2 font-bold'>Blockchan Data</div>
                                <div className='flex'>
                                    <div className='w-36 font-semibold'>Fingerprint</div>
                                    <div className='flex items-center'>
                                        <BsCopy />
                                        &ensp;
                                        <div>asset182508nlfcug0k6z869js7w4enm57lnh5gnn034</div>
                                        &ensp;
                                        <FaLink />
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='w-36 font-semibold'>Policy ID</div>
                                    <div className='flex items-center'>
                                        <BsCopy />
                                        &ensp;
                                        <div>fd674ecba5d7914396fce1d75f920633943123dce8a525f88e1ba6da</div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='w-36 font-semibold'>Asset Name</div>
                                    <div className='flex items-center'>
                                        <BsCopy />
                                        &ensp;
                                        <div>43533233434c4530303834</div>
                                    </div>
                                </div>
                            </div>
                            <div className='border-b border-white my-6'></div>
                            <div>
                                <div className='text-lg mb-2 font-bold'>Metadata</div>
                                <div className='flex'>
                                    <div className='w-36 font-semibold'>Media type</div>
                                    <div>image/png</div>
                                </div>
                                <div className='flex'>
                                    <div className='w-36 font-semibold'>Name</div>
                                    <div>Cardano Summit 2023 CLE Hanoi #0084</div>
                                </div>
                                <div className='flex'>
                                    <div className='w-36 font-semibold'>Source</div>
                                    <div>ipfs://Qmd8Ueby5SS8y5s9wB36HjjxbUWPub1CZgBqk9sDn9nkVf</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 grid gap-2 grid-cols-4 px-10'>
                        <button className="rounded-lg bg-fog-1 py-1.5 border border-fog-2">Vote</button>
                        <button className="rounded-lg bg-fog-1 py-1.5 border border-fog-2">Set Background</button>
                        <button className="rounded-lg bg-fog-1 py-1.5 border border-fog-2">Download Image</button>
                        <button className="rounded-lg bg-fog-1 py-1.5 border border-fog-2">Follow</button>
                    </div>
                </div>
            </Grow>
        </Modal>
    )
}
