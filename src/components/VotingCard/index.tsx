import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { BsCopy } from 'react-icons/bs';
import nft from "~/assets/images/nft/user.png";
import './VotingCard.css'
interface NFTModalProps {
    isAppear: boolean;
    setAppear: (isAppear: boolean) => void;
}

export default function VotingCard(props: NFTModalProps) {
    let { isAppear, setAppear } = props;
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={isAppear}
            onClose={() => setAppear(false)}
            className=''>
            {/* <DialogTitle>Optional sizes</DialogTitle> */}
            <DialogContent className=' text-white'>
                <div className='relative overflow-hidden rounded-xl h-52  bg-fog-1 mb-5'>
                    <img src={nft} alt="" className='object-contain w-full h-full' />
                    <div className='font-semibold absolute left-3 top-3 drop-shadow-2xl' id="voteNumber">150 Votes</div>
                </div>
                <div className='grid grid-cols-3 gap-1'>
                    <div className='w-36 font-semibold'>Asset Name</div>
                    <div className='flex items-center col-span-2'>
                        <BsCopy className='w-4 h-4' />
                        &ensp;
                        <div className='w-full'>NGUYEN THANH HUNG</div>
                    </div>
                    <div className='w-36 font-semibold me-2'>Policy ID</div>
                    <div className='flex items-center break-all col-span-2'>
                        <BsCopy className='w-4 h-4' />
                        &ensp;
                        <div className='w-full'>fd674ecba5d7914396fce1d75f920633943123dce8a525f88e1ba6dafsdf33rws</div >
                    </div>
                    <div className='w-36 font-semibold'>Author</div>
                    <div className='flex items-center break-all col-span-2'>
                        <BsCopy className='w-4 h-4' />
                        &ensp;
                        <div className='w-full'>addr_test1qzegp84qufks983xnfczplquhz8l4elzwhylgk0ww5rq30hxh08546rlah0s3mn8ytkt7a59c5xrwwaap6utkafcu96q6ezs5c</div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className='flex justify-between bg-fog-2 text-white'>
                <button className="rounded-lg bg-green-400 py-1.5 px-6 border
                transition ease-in-out delay-150 hover:scale-110  border-white hover:bg-green-500" onClick={() => setAppear(false)}>Confirm Voting</button>
                <button className="rounded-lg bg-gray-500 py-1.5 px-6 border border-fog-2
                transition ease-in-out delay-150 hover:scale-110  border-white hover:bg-fog-3" onClick={() => setAppear(false)}>Cancel</button>
            </DialogActions>

        </Dialog>
    )
}
