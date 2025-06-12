import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
