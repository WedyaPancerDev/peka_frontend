import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Event from "pages/event";
import Module from "pages/modul";
import Dashboard from "pages/dashboard";
import Discussion from "pages/discussion";
import Announcement from "pages/announcement";

import NotFound from "pages/404";

const Login = lazy(() => import("pages/auth/Login"));

const FullLayout = lazy(() => import("layouts/full/FullLayout"));
const BlankLayout = lazy(() => import("layouts/blank/BlankLayout"));

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
      { path: "/informasi-event", element: <Event /> },
      { path: "/berita-dan-pengumuman", element: <Announcement /> },
      { path: "/modul-materi", element: <Module /> },
      { path: "/buka-diskusi", element: <Discussion /> },
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
