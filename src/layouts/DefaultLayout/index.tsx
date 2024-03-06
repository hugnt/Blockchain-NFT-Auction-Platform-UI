import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import { Background, Loading } from '~/components'
import ReelBox from './ReelBox'
//redux
import { connect } from "react-redux";
import { StateProps, handleLucid } from "~/utils";
import { Dispatch } from "redux";

//Lucid
import { connectLucid } from '~/apiServices/cardano/lucid';
import { Lucid } from 'lucid-cardano'
import { handleChangeLucid } from '~/utils/store/features/lucidSlice'
import { useAppDispatch, useAppSelector } from '~/utils/store/store'
import { handle404 } from '~/utils/store/features/uiSlice'
import { NotFound } from '~/pages'

interface DefaultLayoutProps {
  children?: ReactNode;
  isBannerActive?:Boolean;
  isBannerEmpty?:Boolean;
  pageName?:string;
}

//var isNotFound = false;
export default function DefaultLayout(props:DefaultLayoutProps) {
  const [loading, setLoading] = useState(false);
  let {isBannerActive=true, isBannerEmpty=false, pageName=""} = props;
  if(pageName=="BiddingDetails"||pageName=="MintingAsset"||pageName=="Profile"){
    isBannerActive = false;
  }

  const dispatch = useAppDispatch();
  const isNotFound = useAppSelector((state)=>state.ui.isNotFound);

  //dispatch(handle404({isNotFound:false}));
  if(pageName=="NotFound") dispatch(handle404({isNotFound:true}));
  else if((pageName!="NotFound")&&!(isNotFound&&pageName=="Profile")) dispatch(handle404({isNotFound:false}));

 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const lucidInstance = await connectLucid();
        //console.log(lucidInstance)
        dispatch(handleChangeLucid({lucid: lucidInstance}));
        
      } catch (error) {
    
        console.error('Lỗi khi fetch dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Background>
        <Loading isOpen={loading} />

        {!isNotFound&&<div className={`${isBannerActive&&'h-screen overflow-hidden'}`}>
            <Header />
            {isBannerActive&&<Banner isBannerEmpty={isBannerEmpty} pageName={pageName}/>}     
        </div>}
        <div id="main" className='bg-transparent'>
            {!isNotFound?<div className="">{props.children}</div>:<NotFound/>}
        </div>

        {!isNotFound&&<Footer/>}
        {!isNotFound&&<ReelBox/>}
    </Background>
  )
}
