import React from 'react';
import './App.css'
import { Provider } from 'react-redux';
import { DefaultLayout } from '~/layouts';
import { BiddingDetails, BiddingList, Home, VotingDetails, Profile } from './pages';
import { createStore } from 'redux';
import { reducer } from './utils';

const store = createStore(reducer);
function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <DefaultLayout isBannerActive={false}>
          <Profile />
        </DefaultLayout>
      </div>
    </Provider>
  );
}

export default App;
