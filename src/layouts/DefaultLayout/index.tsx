import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import { Background, Loading, NFTModal, VotingCard } from '~/components'
import ReelBox from './ReelBox'
import { useLocation } from "react-router-dom";

//Lucid
import { connectLucid } from '~/apiServices/cardano/lucid';
import { handleChangeLucid } from '~/utils/store/features/lucidSlice'
import { useAppDispatch, useAppSelector } from '~/utils/store/store'
import { handle404, handleLoading } from '~/utils/store/features/uiSlice'
import { NotFound } from '~/pages'

interface DefaultLayoutProps {
  children?: ReactNode;
  isBannerActive?:Boolean;
  isBannerEmpty?:Boolean;
  pageName?:string;
}

export default function DefaultLayout(props:DefaultLayoutProps) {

  let {isBannerActive=true, isBannerEmpty=false, pageName=""} = props;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isNotFound = useAppSelector((state)=>state.ui.isNotFound);
  const loading = useAppSelector((state)=>state.ui.loading);

  if(pageName=="BiddingDetails"||pageName=="MintingAsset"||pageName=="Profile"){
    isBannerActive = false;
  }
  

  useEffect(()=>{
    if(pageName=="NotFound") dispatch(handle404({isNotFound:true}));
    else if((pageName!="NotFound")&&!(isNotFound&&pageName=="Profile")) dispatch(handle404({isNotFound:false}));
  
   
  }, [isNotFound, pageName])


  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(pathname)
  }, [pathname]);

  return (
    <Background>
        <Loading isOpen={loading} />
        {isNotFound&&<div id="main" className='bg-transparent'>
            <NotFound/>
        </div>}
        {!isNotFound&&
        <Fragment>
          <div className={`${isBannerActive&&'h-screen overflow-hidden'}`}>
              <Header />
              {isBannerActive&&<Banner isBannerEmpty={isBannerEmpty} pageName={pageName}/>}     
          </div>
           <div id="main" className='bg-transparent'>
                <div className="z-10 relative">{props.children}</div>
          </div>
          <Footer/>
          <ReelBox/>
        </Fragment>
        }
        
    </Background>
  )
}
