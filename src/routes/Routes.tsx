import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const FullLayout = lazy(() => import("layouts/full/FullLayout"));
const BlankLayout = lazy(() => import("layouts/blank/BlankLayout"));

const Login = lazy(() => import("pages/auth/Login"));
const Dashboard = lazy(() => import("pages/dashboard"));

import NotFound from "pages/404";

import PublicRoute from "./middlewares/PublicRoute";
import AuthenticatedRoute from "./middlewares/AuthenticatedRoute";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <FullLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <BlankLayout />
      </PublicRoute>
    ),
    children: [{ path: "masuk", element: <Login /> }],
    errorElement: <NotFound />,
  },
]);
