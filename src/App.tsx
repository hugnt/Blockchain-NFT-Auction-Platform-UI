import React from "react";
import { ReactNode } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { DefaultLayout } from "~/layouts";
import {
  BiddingDetails,
  BiddingList,
  Home,
  VotingDetails,
  Profile,
  MintingAsset,
} from "./pages";
import { createStore } from "redux";
import { reducer } from "./utils";
//routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";

const store = createStore(reducer);
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
          {publicRoutes.map((route, i) => {
              let Layout = DefaultLayout;
              const Page  = route.component;
              var namePage = route.name;
              return <Route key={i} path={route.path} element={<Layout pageName={namePage}><Page/></Layout>}/>
            })}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
