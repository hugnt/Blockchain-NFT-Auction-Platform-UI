import React from 'react';
import './App.css'

import { DefaultLayout } from '~/layouts';
import { BiddingDetails } from './pages';


function App() {
  return (
      <div className='App'>
        <DefaultLayout isBannerActive={false}>
          <BiddingDetails />
        </DefaultLayout>
      </div>
  );
}

export default App;
