import React from 'react';
import './App.css'

import { DefaultLayout } from '~/layouts';
import { BiddingDetails, BiddingList, VotingDetails } from './pages';


function App() {
  return (
      <div className='App'>
        <DefaultLayout isBannerActive={true}>
          <VotingDetails />
        </DefaultLayout>
      </div>
  );
}

export default App;
