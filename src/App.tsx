import React from 'react';
import './App.css'

import { DefaultLayout } from '~/layouts';
import BiddingList from './pages/BiddingList';

function App() {
  return (
      <div className='App'>
        <DefaultLayout>
          <BiddingList />
        </DefaultLayout>
      </div>
  );
}

export default App;
