import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
  
      <div className="flex font-outfit">
        <Sidebar />
        <div className="flex flex-col flex-1 font-outfit">
          <Navbar />
          <Outlet />
        </div>
      </div>
 
  );
}
