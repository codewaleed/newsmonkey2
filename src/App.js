import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { News } from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const pageSize = 20;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <Routes>
          <Route
            path="/"
            element={
              <News
                key="sports"
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="us"
                category="sports"
              />
            }
          />

          <Route
            path="business"
            element={
              <News
                key="business"
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="us"
                category="business"
              />
            }
          />

          <Route
            path="entertainment"
            element={
              <News
                key="entertainment"
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="us"
                category="entertainment"
              />
            }
          />
          <Route
            path="technology"
            element={
              <News
                key="technology"
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="us"
                category="technology"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
