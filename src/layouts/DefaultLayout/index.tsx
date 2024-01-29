import React, { Fragment, ReactNode } from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import { Background } from '~/components'
interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout(props:DefaultLayoutProps) {
  return (
    <Background>
        <div className='h-screen overflow-hidden'>
            <Header />
            <Banner />     
        </div>
        <div id="main" className='bg-transparent'>
            {<div className="">{props.children}</div>}
        </div>
        <Footer/>
    </Background>
  )
}
