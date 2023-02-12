import React, { Component } from "react";
import { NavBar } from "./components/NavBar";
import { News } from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API
  pageSize = 20;
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />

          <Routes>
            <Route
              
              path="/"
              element={
                <News
                  key="sports"
                  setProgress={this.setProgress} apikey={this.apikey}
                  pageSize={this.pageSize}
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
                  setProgress={this.setProgress} apikey={this.apikey}
                  pageSize={this.pageSize}
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
                  setProgress={this.setProgress} apikey={this.apikey}
                  pageSize={this.pageSize}
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
                  setProgress={this.setProgress} apikey={this.apikey}
                  pageSize={this.pageSize}
                  country="us"
                  category="technology"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
