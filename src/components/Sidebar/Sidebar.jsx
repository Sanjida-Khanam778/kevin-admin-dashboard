import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  PiChartPieSliceFill,
  PiForkKnifeBold,
  PiShoppingBagOpenBold,
} from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuDumbbell, LuSettings } from "react-icons/lu";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <div className=" bg-sidebar h-screen sticky left-0 z-20 flex flex-col justify-between">
      <h1 className="uppercase p-8 text-xl font-bold font-inter leading-loose tracking-[0.3em] text-primary mb-6">
        <span className="text-3xl">K</span>
        <span className="">evin </span>
        <span className="text-3xl">O</span>
        <span className="">rellana</span>
      </h1>

      <nav className="flex-1 font-outfit">
        <ul className="space-y-2">
          <li>
            <NavLink
              to={"/"}
              className="flex items-center px-8 py-4 hover:bg-primary hover:text-white  "
            >
              <PiChartPieSliceFill className="mr-3 text-xl" />
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/clients"}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith("/clients")
                  ? "flex items-center px-8 py-4 bg-primary text-white"
                  : "flex items-center px-8 py-4 hover:bg-primary hover:text-white"
              }
            >
              <HiOutlineUserGroup className="mr-3 text-xl" />
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/recipe"}
              className="flex items-center px-8 py-4 hover:bg-primary hover:text-white  "
            >
              <PiForkKnifeBold className="mr-3 text-xl" />
              Recipe Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/workout"}
              className="flex items-center px-8 py-4 hover:bg-primary hover:text-white  "
            >
              <LuDumbbell className="text-xl mr-3 -rotate-45" />
              Workout Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/subscription"}
              className="flex items-center px-8 py-4 hover:bg-primary hover:text-white  "
            >
              <PiShoppingBagOpenBold className="mr-3 text-xl" />
              Subscription
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/settings"}
              className="flex items-center px-8 py-4 hover:bg-primary hover:text-white  "
            >
              <LuSettings className="mr-3 text-xl" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to={"/login"}>
        <button className="flex items-center px-8 py-8 text-xl w-full mx-auto text-red-500">
          <LogOut className="mr-3" />
          Logout
        </button>
      </Link>
    </div>
  );
}
