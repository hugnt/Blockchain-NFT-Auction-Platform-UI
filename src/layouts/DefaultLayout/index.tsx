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

interface DefaultLayoutProps {
  children?: ReactNode;
  isBannerActive?:Boolean;
  isBannerEmpty?:Boolean;
  pageName?:string;
  handleLucid: (lucid: Lucid) => void;
}

var isNotFound = false;
function DefaultLayout(props:DefaultLayoutProps) {
  const [loading, setLoading] = useState(false);
  let {handleLucid,  isBannerActive=true, isBannerEmpty=false, pageName=""} = props;
  if(pageName=="BiddingDetails"||pageName=="MintingAsset"||pageName=="Profile"){
    isBannerActive = false;
  }
  if(pageName=="NotFound") isNotFound=true;
  else isNotFound=false;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const lucidInstance = await connectLucid();
        handleLucid(lucidInstance);
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
const mapStateToProps = (state: StateProps) => ({
  lucid: state.lucid
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleLucid: (lucid: Lucid) => dispatch(handleLucid(lucid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);