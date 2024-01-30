import React from 'react';
import './App.css'

import { DefaultLayout } from '~/layouts';
import { BiddingDetails, BiddingList, Home, VotingDetails } from './pages';


function App() {
  return (
      <div className='App'>
        <DefaultLayout isBannerActive={true}>
          <Home />
        </DefaultLayout>
      </div>
  );
}

export default App;
