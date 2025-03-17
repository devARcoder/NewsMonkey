import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
  const countryName = "us";
  const apiKey=process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

    return (
      <>
        <BrowserRouter>
          <LoadingBar
            height={3}
            color="#f11946"
            progress={progress}
          />

          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey} 
                  key="general"
                  pageSize={pageSize}
                  country={countryName}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey} 
                  key="business"
                  pageSize={pageSize}
                  country={countryName}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey} 
                  key="entertainment"
                  pageSize={pageSize}
                  country={countryName}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey} 
                  key="health"
                  pageSize={pageSize}
                  country={countryName}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey} 
                  key="science"
                  pageSize={pageSize}
                  country={countryName}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey} 
                  key="sports"
                  pageSize={pageSize}
                  country={countryName}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={setProgress} apiKey={apiKey} 
                  key="technology"
                  pageSize={pageSize}
                  country={countryName}
                  category="technology"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
}
export default App