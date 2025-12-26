import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Overview from "../components/Overview/Overview";
import Recipe from "../components/Recipe/Recipe";
import Settings from "../components/Settings/Settings";
import Subscription from "../components/Subscription/Subscription";
import Clients from "../components/Clients/Clients";
import Workout from "../components/Workout/Workout";
import UserProfileDashboard from "../components/UserProfileDashboard UserProfileDashboard/UserProfileDashboard";
import RecipeDetails from "../components/RecipeDetails/RecipeDetails";
import SignIn from "../Pages/Auth/SignIn";
import RecipeUploadForm from "../components/Recipe/RecipeUploadForm";
import RecipeUpdate from "../components/Recipe/RecipeUpdate";
import WorkoutUploadForm from "../components/Workout/WorkoutUploadForm";
import WorkoutDetails from "../components/WorkoutDetails/WorkoutDetails";
import WorkoutUpdate from "../components/Workout/WorkoutUpdate";
import { PrivateRoute } from "./PrivetRoute";
import AddPackage from "../components/Subscription/AddPackage";
import EditPackage from "../components/Subscription/EditPackage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "/clients",
        element: (
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        ),
      },
      {
        path: "/clients/:id",
        element: (
          <PrivateRoute>
            <UserProfileDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "/recipe/upload",
        element: (
          <PrivateRoute>
            <RecipeUploadForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipe/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipe/update/:id",
        element: (
          <PrivateRoute>
            <RecipeUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: "/workout",
        element: (
          <PrivateRoute>
            <Workout />
          </PrivateRoute>
        ),
      },
      {
        path: "/workout/upload",
        element: (
          <PrivateRoute>
            <WorkoutUploadForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/workout/:id",
        element: (
          <PrivateRoute>
            <WorkoutDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/workout/update/:id",
        element: (
          <PrivateRoute>
            <WorkoutUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription/add",
        element: (
          <PrivateRoute>
            <AddPackage />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription/edit/:id",
        element: (
          <PrivateRoute>
            <EditPackage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);
