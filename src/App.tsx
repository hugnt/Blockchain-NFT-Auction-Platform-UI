import React, { useEffect } from "react";
import { ReactNode } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { DefaultLayout } from "~/layouts";
import ContextProvider from "./contexts";

import {
  BiddingDetails,
  BiddingList,
  Home,
  VotingDetails,
  Profile,
  MintingAsset,
} from "./pages";
import { store, useAppDispatch } from "./utils/store/store"; 
//routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { Loading } from "./components";
import { handleLoading } from "./utils/store/features/uiSlice";
import { handleChangeLucid } from "./utils/store/features/lucidSlice";
import { connectLucid } from "./apiServices/cardano/lucid";



function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(handleLoading({loading: true}));
      try {
        const lucidInstance = await connectLucid();
        //console.log(lucidInstance)
        dispatch(handleChangeLucid({lucid: lucidInstance}));
        
      } catch (error) {
    
        console.error('Lỗi khi fetch dữ liệu:', error);
      } finally {
        dispatch(handleLoading({loading: false}));
      }
    };
    fetchData();
  }, []);

  return (
    <ContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, i) => {
              let Layout = DefaultLayout;
              const Page = route.component;
              var namePage = route.name;
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    <Layout pageName={namePage}>
                      <Page />
                    </Layout>
                  }
                  errorElement={
                    <Layout pageName={namePage}>
                      <Home />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
