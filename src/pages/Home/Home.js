import React from "react";
import { Outlet } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { Navigation } from "../../components/Navigation/Navigation";
export const Home = () => {
  return (
    <>
      <div id="wrapper">
        {" "}
        <SideBar />
        <div id="content-wrapper">
          <Navigation />
          <div id="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
