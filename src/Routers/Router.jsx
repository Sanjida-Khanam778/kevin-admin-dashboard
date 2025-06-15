import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Overview from "../components/Overview/Overview";
import Recipe from "../components/Recipe/Recipe";
import Settings from "../components/Settings/Settings";
import Subscription from "../components/Subscription/Subscription";
import Clients from "../components/Clients/Clients";
import Workout from "../components/Workout/Workout";
import UserProfileDashboard from "../components/UserProfileDashboard UserProfileDashboard/UserProfileDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/client/:id",
        element: <UserProfileDashboard />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "/workout",
        element: <Workout />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <h1>Login</h1>,
  },
]);
