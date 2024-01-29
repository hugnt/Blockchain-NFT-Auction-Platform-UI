import React, { Fragment, ReactNode } from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import { Background } from '~/components'
interface DefaultLayoutProps {
  children: ReactNode;
  isBannerActive?:Boolean;
}
export default function DefaultLayout(props:DefaultLayoutProps) {
  let {isBannerActive=true} = props;
  return (
    <Background>
        {isBannerActive&&<div className='h-screen overflow-hidden'>
            <Header />
            <Banner />     
        </div>}
        {!isBannerActive&&<Header />}
        <div id="main" className='bg-transparent'>
            {<div className="">{props.children}</div>}
        </div>
        <Footer/>
    </Background>
  )
}
