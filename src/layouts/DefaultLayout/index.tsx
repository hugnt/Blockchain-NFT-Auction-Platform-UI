import React, { Fragment, ReactNode } from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import { Background } from '~/components'
import ReelBox from './ReelBox'
interface DefaultLayoutProps {
  children?: ReactNode;
  isBannerActive?:Boolean;
  isBannerEmpty?:Boolean;
  pageName?:string;
}

var isNotFound = false;
export default function DefaultLayout(props:DefaultLayoutProps) {
  let {isBannerActive=true, isBannerEmpty=false, pageName=""} = props;
  if(pageName=="BiddingDetails"||pageName=="MintingAsset"||pageName=="Profile"){
    isBannerActive = false;
  }
  if(pageName=="NotFound") isNotFound=true;
  else isNotFound=false;
  return (
    <Background>
        {!isNotFound&&isBannerActive&&<div className='h-screen overflow-hidden'>
            <Header />
            <Banner isBannerEmpty={isBannerEmpty} pageName={pageName}/>     
        </div>}
        {!isNotFound&&!isBannerActive&&<Header />}
        <div id="main" className='bg-transparent'>
            {<div className="">{props.children}</div>}
        </div>

        {!isNotFound&&<Footer/>}
        {!isNotFound&&<ReelBox/>}
    </Background>
  )
}
