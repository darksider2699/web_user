import React from "react";
import SideBar from "../sidebar/Sidebar";
import "./layout.css";
import Routes from "../Routes";
import { BrowserRouter, Route } from "react-router-dom";
const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className="layout">
            <SideBar {...props} />
            <div className="layout__content">
              <div className="layout__content-main">
                <Routes />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
